"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { loginCredentials } from "@/lib/data/playground";
import { PlaygroundDemoShell } from "../playground-demo-shell";
import type { PlaygroundDemo } from "@/lib/data/playground";

interface LoginDemoProps {
  demo: PlaygroundDemo;
}

export function LoginDemo({ demo }: LoginDemoProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setError("");
    setSuccess(false);

    if (!username.trim() || !password.trim()) {
      setError("Username and password are required.");
      return;
    }

    if (
      username === loginCredentials.username &&
      password === loginCredentials.password
    ) {
      setSuccess(true);
      return;
    }

    setError("Invalid credentials. Try demo / password123.");
  };

  return (
    <PlaygroundDemoShell demo={demo}>
      <form onSubmit={handleSubmit} className="mx-auto max-w-sm space-y-4" data-testid="login-form">
        <div className="space-y-1">
          <label htmlFor="login-username" className="text-sm font-medium">
            Username
          </label>
          <input
            id="login-username"
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            data-testid="login-username"
          />
        </div>
        <div className="space-y-1">
          <label htmlFor="login-password" className="text-sm font-medium">
            Password
          </label>
          <input
            id="login-password"
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
            data-testid="login-password"
          />
        </div>
        {error ? (
          <p className="text-sm text-destructive" data-testid="login-error">
            {error}
          </p>
        ) : null}
        {success ? (
          <p className="text-sm text-green-600 dark:text-green-400" data-testid="login-success">
            Welcome back, {loginCredentials.username}!
          </p>
        ) : null}
        <Button type="submit" data-testid="login-submit">
          Sign in
        </Button>
      </form>
    </PlaygroundDemoShell>
  );
}
