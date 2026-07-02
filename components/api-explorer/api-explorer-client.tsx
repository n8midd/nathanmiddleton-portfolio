"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  apiEndpoints,
  apiExplorerIntro,
  defaultEndpointId,
  getEndpointById,
  type ApiEndpoint,
} from "@/lib/data/api-explorer";

interface ApiResponseState {
  status: number;
  statusText: string;
  timingMs: number;
  headers: Record<string, string>;
  body: string;
}

export function ApiExplorerClient() {
  const [selectedId, setSelectedId] = useState(defaultEndpointId);
  const [requestBody, setRequestBody] = useState(
    getEndpointById(defaultEndpointId)?.sampleBody ?? "",
  );
  const [response, setResponse] = useState<ApiResponseState | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const selectedEndpoint = getEndpointById(selectedId);

  const handleEndpointSelect = (endpoint: ApiEndpoint) => {
    setSelectedId(endpoint.id);
    setRequestBody(endpoint.sampleBody ?? "");
    setResponse(null);
    setErrorMessage("");
  };

  const handleSend = async () => {
    if (!selectedEndpoint) return;

    setErrorMessage("");
    const start = performance.now();

    try {
      const options: RequestInit = {
        method: selectedEndpoint.method,
        headers: selectedEndpoint.method === "POST" ? { "Content-Type": "application/json" } : undefined,
      };

      if (selectedEndpoint.method === "POST") {
        options.body = requestBody;
      }

      const result = await fetch(selectedEndpoint.path, options);
      const timingMs = Math.round(performance.now() - start);
      const text = await result.text();
      let formattedBody = text;

      try {
        formattedBody = JSON.stringify(JSON.parse(text), null, 2);
      } catch {
        formattedBody = text;
      }

      const headers: Record<string, string> = {};
      result.headers.forEach((value, key) => {
        headers[key] = value;
      });

      setResponse({
        status: result.status,
        statusText: result.statusText,
        timingMs,
        headers,
        body: formattedBody,
      });
    } catch {
      setErrorMessage("Request failed. Check the network connection and try again.");
      setResponse(null);
    }
  };

  return (
    <section className="space-y-6" data-testid="api-explorer-client">
      <p className="text-sm text-muted-foreground">{apiExplorerIntro}</p>

      <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Endpoints</h2>
          <div className="grid gap-3">
            {apiEndpoints.map((endpoint) => {
              const isSelected = selectedId === endpoint.id;

              return (
                <button
                  key={endpoint.id}
                  type="button"
                  data-testid="endpoint-card"
                  data-endpoint-id={endpoint.id}
                  aria-pressed={isSelected}
                  onClick={() => handleEndpointSelect(endpoint)}
                  className={cn(
                    "rounded-xl text-left ring-1 ring-foreground/10 transition-colors",
                    isSelected ? "ring-[var(--status-pass)]/50" : "hover:bg-accent/30",
                  )}
                >
                  <Card className="h-full border-0 bg-card/80 shadow-none">
                    <CardHeader className="gap-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className="font-mono text-xs">
                          {endpoint.method}
                        </Badge>
                        <CardTitle className="text-base leading-snug">{endpoint.label}</CardTitle>
                      </div>
                      <p className="font-mono text-xs text-muted-foreground">{endpoint.path}</p>
                      <p className="text-sm text-muted-foreground">{endpoint.description}</p>
                    </CardHeader>
                  </Card>
                </button>
              );
            })}
          </div>
        </div>

        {selectedEndpoint ? (
          <div className="space-y-4 lg:sticky lg:top-6">
            <Card className="border-border/60 bg-muted/20">
              <CardHeader>
                <CardTitle className="text-base">Request</CardTitle>
                <p className="font-mono text-sm" data-testid="request-path">
                  {selectedEndpoint.method} {selectedEndpoint.path}
                </p>
              </CardHeader>
              <CardContent className="space-y-4">
                {selectedEndpoint.method === "POST" ? (
                  <div className="space-y-1">
                    <label htmlFor="request-body" className="text-sm font-medium">
                      JSON body
                    </label>
                    <textarea
                      id="request-body"
                      value={requestBody}
                      onChange={(event) => setRequestBody(event.target.value)}
                      rows={6}
                      className="w-full rounded-md border border-border bg-background px-3 py-2 font-mono text-xs"
                      data-testid="request-body"
                    />
                  </div>
                ) : null}
                <Button type="button" onClick={handleSend} data-testid="send-request-button">
                  Send request
                </Button>
                {errorMessage ? (
                  <p className="text-sm text-destructive" role="alert">
                    {errorMessage}
                  </p>
                ) : null}
              </CardContent>
            </Card>

            {response ? (
              <Card className="border-border/60 bg-card/80" data-testid="response-panel">
                <CardHeader>
                  <CardTitle className="text-base">Response</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <p data-testid="response-status">
                    <span className="font-medium text-foreground">Status:</span>{" "}
                    {response.status} {response.statusText}
                  </p>
                  <p data-testid="response-timing">
                    <span className="font-medium text-foreground">Timing:</span> {response.timingMs}
                    ms
                  </p>
                  <div data-testid="response-headers">
                    <p className="mb-2 font-medium text-foreground">Headers</p>
                    <ul className="space-y-1 font-mono text-xs text-muted-foreground">
                      {Object.entries(response.headers).map(([key, value]) => (
                        <li key={key}>
                          {key}: {value}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <p className="mb-2 font-medium text-foreground">JSON</p>
                    <pre
                      className="overflow-x-auto rounded-md border border-border bg-background p-3 font-mono text-xs text-muted-foreground"
                      data-testid="response-body"
                    >
                      {response.body}
                    </pre>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card
                className="border-dashed border-border/60 bg-card/40"
                data-testid="response-placeholder"
              >
                <CardContent className="py-8 text-center text-sm text-muted-foreground">
                  Send a request to inspect status, timing, headers, and JSON here.
                </CardContent>
              </Card>
            )}
          </div>
        ) : null}
      </div>
    </section>
  );
}
