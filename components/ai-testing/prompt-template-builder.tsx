"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  assemblePrompt,
  promptTemplates,
} from "@/lib/data/ai-testing";

interface PromptTemplateBuilderProps {
  defaultTemplateId?: string;
}

export function PromptTemplateBuilder({ defaultTemplateId }: PromptTemplateBuilderProps) {
  const initialTemplate =
    promptTemplates.find((template) => template.id === defaultTemplateId) ?? promptTemplates[0];
  const [selectedId, setSelectedId] = useState(initialTemplate.id);
  const [fieldValues, setFieldValues] = useState<Record<string, string>>({});
  const [generatedPrompt, setGeneratedPrompt] = useState("");

  const selectedTemplate =
    promptTemplates.find((template) => template.id === selectedId) ?? promptTemplates[0];

  const handleTemplateChange = (templateId: string) => {
    setSelectedId(templateId);
    setFieldValues({});
    setGeneratedPrompt("");
  };

  const handleGenerate = () => {
    setGeneratedPrompt(assemblePrompt(selectedTemplate, fieldValues));
  };

  const handleCopy = async () => {
    if (!generatedPrompt) return;
    await navigator.clipboard.writeText(generatedPrompt);
  };

  return (
    <div className="space-y-4 rounded-lg border border-border/60 bg-muted/20 p-4" data-testid="prompt-template-builder">
      <h3 className="text-sm font-semibold">Prompt template builder</h3>

      <div className="space-y-1">
        <label htmlFor="prompt-template-select" className="text-sm font-medium">
          Use case
        </label>
        <select
          id="prompt-template-select"
          value={selectedId}
          onChange={(event) => handleTemplateChange(event.target.value)}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          data-testid="prompt-template-select"
        >
          {promptTemplates.map((template) => (
            <option key={template.id} value={template.id}>
              {template.label}
            </option>
          ))}
        </select>
      </div>

      {selectedTemplate.fields.map((field) => (
        <div key={field.id} className="space-y-1">
          <label htmlFor={`prompt-field-${field.id}`} className="text-sm font-medium">
            {field.label}
          </label>
          <input
            id={`prompt-field-${field.id}`}
            type="text"
            value={fieldValues[field.id] ?? ""}
            onChange={(event) =>
              setFieldValues((prev) => ({ ...prev, [field.id]: event.target.value }))
            }
            placeholder={field.placeholder}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            data-testid={`prompt-field-${field.id}`}
          />
        </div>
      ))}

      <Button type="button" onClick={handleGenerate} data-testid="generate-prompt-button">
        Generate prompt
      </Button>

      {generatedPrompt ? (
        <div className="space-y-2">
          <textarea
            readOnly
            value={generatedPrompt}
            rows={8}
            className="w-full rounded-md border border-border bg-background px-3 py-2 font-mono text-xs"
            data-testid="generated-prompt"
          />
          <Button type="button" variant="outline" size="sm" onClick={handleCopy} data-testid="copy-prompt-button">
            Copy to clipboard
          </Button>
        </div>
      ) : null}
    </div>
  );
}
