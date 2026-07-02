"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  assemblePrompt,
  promptLabHumanReviewNotice,
  promptLabIntro,
  promptLabSystemPrompt,
  promptTemplates,
} from "@/lib/data/ai-testing";
import { PromptOutputRater } from "./prompt-output-rater";

const STORAGE_KEY = "qe-lab-saved-prompts";

interface SavedPrompt {
  id: string;
  name: string;
  prompt: string;
}

type PromptSource = "template" | "custom";

export function PromptLab() {
  const [source, setSource] = useState<PromptSource>("template");
  const [selectedTemplateId, setSelectedTemplateId] = useState(promptTemplates[0]?.id ?? "");
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [customPrompt, setCustomPrompt] = useState("");
  const [savedPrompts, setSavedPrompts] = useState<SavedPrompt[]>([]);
  const [saveName, setSaveName] = useState("");
  const [response, setResponse] = useState("");
  const [baselineResponse, setBaselineResponse] = useState("");
  const [compareResponse, setCompareResponse] = useState("");
  const [error, setError] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [unavailable, setUnavailable] = useState(false);

  const selectedTemplate =
    promptTemplates.find((template) => template.id === selectedTemplateId) ?? promptTemplates[0];

  const assembledTemplatePrompt = useMemo(() => {
    if (!selectedTemplate) {
      return "";
    }
    return assemblePrompt(selectedTemplate, fieldValues);
  }, [selectedTemplate, fieldValues]);

  const activePrompt = source === "template" ? assembledTemplatePrompt : customPrompt;

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setSavedPrompts(JSON.parse(raw) as SavedPrompt[]);
      }
    } catch {
      setSavedPrompts([]);
    }
  }, []);

  const persistSavedPrompts = (prompts: SavedPrompt[]) => {
    setSavedPrompts(prompts);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prompts));
  };

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplateId(templateId);
    setFieldValues({});
    setResponse("");
    setBaselineResponse("");
    setCompareResponse("");
    setError("");
  };

  const loadTemplateIntoEditor = () => {
    setSource("custom");
    setCustomPrompt(assembledTemplatePrompt);
  };

  const saveCustomPrompt = () => {
    const prompt = customPrompt.trim();
    const name = saveName.trim() || `Prompt ${savedPrompts.length + 1}`;
    if (!prompt) {
      return;
    }

    const entry: SavedPrompt = {
      id: `saved-${Date.now()}`,
      name,
      prompt,
    };
    persistSavedPrompts([entry, ...savedPrompts].slice(0, 10));
    setSaveName("");
  };

  const runPrompt = async (prompt: string, target: "main" | "baseline" | "compare") => {
    setIsRunning(true);
    setError("");

    try {
      const result = await fetch("/api/ai-testing/complete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, mode: source }),
      });

      const data = (await result.json()) as { content?: string; error?: string; mock?: boolean };

      if (!result.ok) {
        if (result.status === 429) {
          throw new Error(data.error ?? "Rate limit exceeded.");
        }
        throw new Error(data.error ?? "Failed to run prompt.");
      }

      if (!data.content) {
        throw new Error("No response content returned.");
      }

      if (target === "main") {
        setResponse(data.content);
        setUnavailable(Boolean(data.mock));
      } else if (target === "baseline") {
        setBaselineResponse(data.content);
      } else {
        setCompareResponse(data.content);
      }
    } catch (runError) {
      setError(runError instanceof Error ? runError.message : "Failed to run prompt.");
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <section className="space-y-6" data-testid="prompt-lab">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Prompt Lab</h2>
        <p className="text-sm text-muted-foreground" data-testid="prompt-lab-intro">
          {promptLabIntro}
        </p>
        <p
          className="rounded-md border border-[var(--status-pass)]/30 bg-[var(--status-pass)]/5 px-3 py-2 text-sm text-muted-foreground"
          data-testid="prompt-lab-human-review"
        >
          {promptLabHumanReviewNotice}
        </p>
      </div>

      <details className="rounded-lg border border-border/60 bg-card/40 p-4 text-sm">
        <summary className="cursor-pointer font-medium">Server system prompt (transparency)</summary>
        <p className="mt-2 whitespace-pre-wrap text-muted-foreground">{promptLabSystemPrompt}</p>
      </details>

      <div className="space-y-4 rounded-lg border border-border/60 bg-muted/20 p-4">
        <div className="flex flex-wrap gap-2" data-testid="prompt-source-tabs">
          <Button
            type="button"
            size="sm"
            variant={source === "template" ? "default" : "outline"}
            onClick={() => setSource("template")}
            data-testid="prompt-source-template"
          >
            Template
          </Button>
          <Button
            type="button"
            size="sm"
            variant={source === "custom" ? "default" : "outline"}
            onClick={() => setSource("custom")}
            data-testid="prompt-source-custom"
          >
            Custom prompt
          </Button>
        </div>

        {source === "template" ? (
          <div className="space-y-3">
            <div className="space-y-1">
              <label htmlFor="prompt-lab-template" className="text-sm font-medium">
                Use case
              </label>
              <select
                id="prompt-lab-template"
                value={selectedTemplateId}
                onChange={(event) => handleTemplateChange(event.target.value)}
                className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                data-testid="prompt-lab-template-select"
              >
                {promptTemplates.map((template) => (
                  <option key={template.id} value={template.id}>
                    {template.label}
                  </option>
                ))}
              </select>
            </div>

            {selectedTemplate?.fields.map((field) => (
              <div key={field.id} className="space-y-1">
                <label htmlFor={`prompt-lab-field-${field.id}`} className="text-sm font-medium">
                  {field.label}
                </label>
                <input
                  id={`prompt-lab-field-${field.id}`}
                  type="text"
                  value={fieldValues[field.id] ?? ""}
                  onChange={(event) =>
                    setFieldValues((current) => ({ ...current, [field.id]: event.target.value }))
                  }
                  placeholder={field.placeholder}
                  className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
                  data-testid={`prompt-lab-field-${field.id}`}
                />
              </div>
            ))}

            <textarea
              readOnly
              value={assembledTemplatePrompt}
              rows={6}
              className="w-full rounded-md border border-border bg-background px-3 py-2 font-mono text-xs"
              data-testid="prompt-lab-assembled-prompt"
            />

            <Button type="button" variant="outline" size="sm" onClick={loadTemplateIntoEditor}>
              Load template into custom editor
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <textarea
              value={customPrompt}
              onChange={(event) => setCustomPrompt(event.target.value)}
              rows={8}
              placeholder="Write your own SDET prompt..."
              className="w-full rounded-md border border-border bg-background px-3 py-2 font-mono text-xs"
              data-testid="prompt-lab-custom-prompt"
            />
            <div className="flex flex-wrap items-end gap-2">
              <div className="space-y-1">
                <label htmlFor="prompt-lab-save-name" className="text-sm font-medium">
                  Save as
                </label>
                <input
                  id="prompt-lab-save-name"
                  type="text"
                  value={saveName}
                  onChange={(event) => setSaveName(event.target.value)}
                  placeholder="My checkout prompt"
                  className="rounded-md border border-border bg-background px-3 py-2 text-sm"
                  data-testid="prompt-lab-save-name"
                />
              </div>
              <Button type="button" size="sm" variant="outline" onClick={saveCustomPrompt}>
                Save prompt
              </Button>
            </div>
            {savedPrompts.length > 0 ? (
              <ul className="space-y-2" data-testid="prompt-lab-saved-list">
                {savedPrompts.map((saved) => (
                  <li key={saved.id}>
                    <button
                      type="button"
                      className="text-sm text-[var(--status-pass)] underline-offset-4 hover:underline"
                      onClick={() => setCustomPrompt(saved.prompt)}
                      data-testid="prompt-lab-saved-item"
                    >
                      {saved.name}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        )}

        <div className="flex flex-wrap gap-2">
          <Button
            type="button"
            onClick={() => runPrompt(activePrompt, "main")}
            disabled={isRunning || !activePrompt.trim()}
            data-testid="prompt-lab-run"
          >
            {isRunning ? "Running..." : "Run prompt"}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => runPrompt(assembledTemplatePrompt, "baseline")}
            disabled={isRunning || !assembledTemplatePrompt.trim()}
            data-testid="prompt-lab-run-baseline"
          >
            Run baseline (template)
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => runPrompt(activePrompt, "compare")}
            disabled={isRunning || !activePrompt.trim()}
            data-testid="prompt-lab-run-compare"
          >
            Run compare (current)
          </Button>
        </div>

        {unavailable ? (
          <p className="text-xs text-muted-foreground" data-testid="prompt-lab-mock-notice">
            Running in mock mode — set OPENAI_API_KEY on the server for live responses.
          </p>
        ) : null}

        {error ? (
          <p className="text-sm text-[var(--status-fail)]" data-testid="prompt-lab-error">
            {error}
          </p>
        ) : null}
      </div>

      {response ? (
        <div className="space-y-3">
          <h3 className="text-sm font-semibold">Rate the output</h3>
          <PromptOutputRater response={response} />
        </div>
      ) : null}

      {baselineResponse || compareResponse ? (
        <div className="grid gap-4 lg:grid-cols-2" data-testid="prompt-lab-compare">
          <div className="space-y-2 rounded-lg border border-border/60 p-4">
            <h3 className="text-sm font-semibold">Baseline (template)</h3>
            {baselineResponse ? (
              <p className="whitespace-pre-wrap text-sm text-muted-foreground">{baselineResponse}</p>
            ) : (
              <p className="text-sm text-muted-foreground">Run baseline to compare.</p>
            )}
          </div>
          <div className="space-y-2 rounded-lg border border-border/60 p-4">
            <h3 className="text-sm font-semibold">Your prompt</h3>
            {compareResponse ? (
              <p className="whitespace-pre-wrap text-sm text-muted-foreground">{compareResponse}</p>
            ) : (
              <p className="text-sm text-muted-foreground">Run compare to see your version.</p>
            )}
          </div>
        </div>
      ) : null}
    </section>
  );
}
