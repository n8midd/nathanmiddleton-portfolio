"use client";

import { useState } from "react";
import { PlaygroundDemoShell } from "../playground-demo-shell";
import type { PlaygroundDemo } from "@/lib/data/playground";

interface UploadsDemoProps {
  demo: PlaygroundDemo;
}

export function UploadsDemo({ demo }: UploadsDemoProps) {
  const [fileNames, setFileNames] = useState<string[]>([]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) {
      setFileNames([]);
      return;
    }
    setFileNames(Array.from(files).map((file) => file.name));
  };

  return (
    <PlaygroundDemoShell demo={demo}>
      <div className="space-y-4">
        <input
          type="file"
          multiple
          onChange={handleChange}
          className="text-sm"
          data-testid="file-upload-input"
        />
        {fileNames.length > 0 ? (
          <ul className="space-y-1 text-sm" data-testid="upload-file-list">
            {fileNames.map((name) => (
              <li key={name}>{name}</li>
            ))}
          </ul>
        ) : (
          <p className="text-sm text-muted-foreground" data-testid="upload-empty">
            No files selected.
          </p>
        )}
      </div>
    </PlaygroundDemoShell>
  );
}
