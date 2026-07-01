"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { PlaygroundDemoShell } from "../playground-demo-shell";
import type { PlaygroundDemo } from "@/lib/data/playground";

interface FormsDemoProps {
  demo: PlaygroundDemo;
}

export function FormsDemo({ demo }: FormsDemoProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [newsletter, setNewsletter] = useState(false);
  const [experience, setExperience] = useState("junior");
  const [errors, setErrors] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const nextErrors: string[] = [];

    if (!name.trim()) nextErrors.push("Name is required.");
    if (!email.trim()) nextErrors.push("Email is required.");
    if (!age.trim()) nextErrors.push("Age is required.");

    setErrors(nextErrors);
    setSubmitted(nextErrors.length === 0);
  };

  return (
    <PlaygroundDemoShell demo={demo}>
      <form onSubmit={handleSubmit} className="mx-auto max-w-md space-y-4" data-testid="forms-demo-form">
        <div className="space-y-1">
          <label htmlFor="form-name" className="text-sm font-medium">
            Name
          </label>
          <input
            id="form-name"
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            data-testid="form-name"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="form-email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="form-email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            data-testid="form-email"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="form-age" className="text-sm font-medium">
            Age
          </label>
          <input
            id="form-age"
            type="number"
            value={age}
            onChange={(event) => setAge(event.target.value)}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            data-testid="form-age"
          />
        </div>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={newsletter}
            onChange={(event) => setNewsletter(event.target.checked)}
            data-testid="form-newsletter"
          />
          Subscribe to newsletter
        </label>
        <fieldset className="space-y-2">
          <legend className="text-sm font-medium">Experience level</legend>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="experience"
              value="junior"
              checked={experience === "junior"}
              onChange={() => setExperience("junior")}
              data-testid="form-experience-junior"
            />
            Junior
          </label>
          <label className="flex items-center gap-2 text-sm">
            <input
              type="radio"
              name="experience"
              value="senior"
              checked={experience === "senior"}
              onChange={() => setExperience("senior")}
              data-testid="form-experience-senior"
            />
            Senior
          </label>
        </fieldset>
        {errors.length > 0 ? (
          <ul className="space-y-1 text-sm text-destructive" data-testid="form-errors">
            {errors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        ) : null}
        {submitted ? (
          <p className="text-sm text-green-600 dark:text-green-400" data-testid="form-success">
            Form submitted successfully!
          </p>
        ) : null}
        <Button type="submit" data-testid="form-submit">
          Submit
        </Button>
      </form>
    </PlaygroundDemoShell>
  );
}
