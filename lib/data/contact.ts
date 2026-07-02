export interface ContactOffering {
  id: string;
  label: string;
  description?: string;
}

export const contactOfferings: ContactOffering[] = [
  {
    id: "build-frameworks",
    label: "Build automation frameworks",
    description: "Design scalable Playwright or hybrid stacks with maintainable patterns and CI integration.",
  },
  {
    id: "lead-teams",
    label: "Lead QA teams",
    description: "Hire, mentor, and align quality engineering with product and engineering goals.",
  },
  {
    id: "release-confidence",
    label: "Improve release confidence",
    description: "Reduce flakes, clarify quality gates, and make pipelines signal developers trust.",
  },
  {
    id: "modernize-testing",
    label: "Modernize testing",
    description: "Migrate legacy Selenium suites, adopt shift-left practices, and right-size automation.",
  },
  {
    id: "coach-engineers",
    label: "Coach engineers",
    description: "Level up SDETs and developers on test design, triage, and framework ownership.",
  },
  {
    id: "cicd-testing",
    label: "Implement CI/CD testing",
    description: "Parallel pipelines, smart test selection, and actionable reporting from commit to deploy.",
  },
];

export const contactCta = {
  headline: "Let's talk.",
  subtext: "Open to senior SDET, QA leadership, and consulting conversations.",
};
