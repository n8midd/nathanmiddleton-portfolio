"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { dropdownOptions } from "@/lib/data/playground";
import { PlaygroundDemoShell } from "../playground-demo-shell";
import type { PlaygroundDemo } from "@/lib/data/playground";

interface DropdownsDemoProps {
  demo: PlaygroundDemo;
}

export function DropdownsDemo({ demo }: DropdownsDemoProps) {
  const [nativeValue, setNativeValue] = useState<string>(dropdownOptions[0].value);
  const [customOpen, setCustomOpen] = useState(false);
  const [customValue, setCustomValue] = useState<string>(dropdownOptions[0].value);

  const customLabel =
    dropdownOptions.find((option) => option.value === customValue)?.label ??
    dropdownOptions[0].label;

  return (
    <PlaygroundDemoShell demo={demo}>
      <div className="mx-auto max-w-md space-y-8">
        <div className="space-y-2">
          <label htmlFor="native-select" className="text-sm font-medium">
            Native select
          </label>
          <select
            id="native-select"
            value={nativeValue}
            onChange={(event) => setNativeValue(event.target.value)}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            data-testid="native-select"
          >
            {dropdownOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          <p className="text-sm text-muted-foreground" data-testid="native-select-value">
            Selected: {dropdownOptions.find((o) => o.value === nativeValue)?.label}
          </p>
        </div>

        <div className="space-y-2">
          <span className="text-sm font-medium">Custom combobox</span>
          <div className="relative">
            <Button
              type="button"
              variant="outline"
              className="w-full justify-between"
              onClick={() => setCustomOpen((open) => !open)}
              data-testid="custom-combobox-trigger"
            >
              {customLabel}
            </Button>
            {customOpen ? (
              <ul
                role="listbox"
                className="absolute z-10 mt-1 w-full rounded-md border border-border bg-popover py-1 shadow-md"
                data-testid="custom-combobox-listbox"
              >
                {dropdownOptions.map((option) => (
                  <li key={option.value}>
                    <button
                      type="button"
                      role="option"
                      className="w-full px-3 py-2 text-left text-sm hover:bg-muted"
                      onClick={() => {
                        setCustomValue(option.value);
                        setCustomOpen(false);
                      }}
                      data-testid={`custom-option-${option.value}`}
                    >
                      {option.label}
                    </button>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
          <p className="text-sm text-muted-foreground" data-testid="custom-combobox-value">
            Selected: {customLabel}
          </p>
        </div>
      </div>
    </PlaygroundDemoShell>
  );
}
