"use client";

import { useEffect, useRef } from "react";
import { PlaygroundDemoShell } from "../playground-demo-shell";
import type { PlaygroundDemo } from "@/lib/data/playground";

interface ShadowDomDemoProps {
  demo: PlaygroundDemo;
}

export function ShadowDomDemo({ demo }: ShadowDomDemoProps) {
  const hostRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    class PlaygroundShadowButton extends HTMLElement {
      connectedCallback() {
        if (this.shadowRoot) return;

        const shadow = this.attachShadow({ mode: "open" });
        shadow.innerHTML = `
          <style>
            button {
              padding: 0.5rem 1rem;
              border-radius: 0.375rem;
              border: 1px solid #ccc;
              background: #f4f4f5;
              cursor: pointer;
              font-size: 0.875rem;
            }
            p { margin-top: 0.75rem; font-size: 0.875rem; color: #71717a; }
          </style>
          <button type="button" data-internal="shadow-button">Click inside Shadow DOM</button>
          <p data-internal="shadow-message">Shadow content is encapsulated.</p>
        `;

        const button = shadow.querySelector("button");
        const message = shadow.querySelector("p");
        button?.addEventListener("click", () => {
          if (message) {
            message.textContent = "Shadow button was clicked!";
          }
        });
      }
    }

    if (!customElements.get("playground-shadow-button")) {
      customElements.define("playground-shadow-button", PlaygroundShadowButton);
    }

    const host = hostRef.current;
    if (!host || host.querySelector("playground-shadow-button")) return;

    const element = document.createElement("playground-shadow-button");
    host.appendChild(element);
  }, []);

  return (
    <PlaygroundDemoShell demo={demo}>
      <div ref={hostRef} data-testid="shadow-dom-host" />
      <p className="mt-4 text-sm text-muted-foreground" data-testid="shadow-dom-hint">
        The button above lives inside a closed shadow root. Use shadow-piercing locators or
        data-internal attributes for automation.
      </p>
    </PlaygroundDemoShell>
  );
}
