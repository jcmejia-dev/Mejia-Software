import { describe, expect, it } from "vitest";
import { projects } from "../lib/projects";

describe("project catalog", () => {
  it("uses unique slugs", () => {
    const slugs = projects.map((project) => project.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("links every open-source entry to a GitHub repository", () => {
    for (const project of projects.filter((entry) => entry.openSource)) {
      expect(project.repoUrl).toMatch(/^https:\/\/github\.com\//);
    }
  });

  it("does not expose a live action for unreleased prototypes", () => {
    for (const project of projects.filter((entry) => entry.status === "Prototype")) {
      expect(project.liveUrl).toBeUndefined();
    }
  });
});
