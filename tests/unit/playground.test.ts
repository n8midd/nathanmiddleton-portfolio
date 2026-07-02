import { describe, expect, it } from "vitest";
import {
  getAllDemoSlugs,
  getDemoBySlug,
  loginCredentials,
  playgroundDemos,
} from "@/lib/data/playground";

describe("playground data", () => {
  it("defines multiple interactive demos", () => {
    expect(playgroundDemos.length).toBeGreaterThan(0);
    expect(getAllDemoSlugs().length).toBe(playgroundDemos.length);
  });

  it("looks up demos by slug", () => {
    expect(getDemoBySlug("login")?.label).toBe("Login");
    expect(getDemoBySlug("missing")).toBeUndefined();
  });

  it("exposes login credentials for the login demo", () => {
    expect(loginCredentials.username).toBe("demo");
    expect(loginCredentials.password.length).toBeGreaterThan(0);
  });
});
