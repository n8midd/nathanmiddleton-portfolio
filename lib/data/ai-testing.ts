export const ALL_CATEGORIES_ID = "all" as const;

export interface AiTestingCategory {
  id: string;
  label: string;
  description: string;
}

export interface AiTestingTopic {
  id: string;
  categoryId: string;
  title: string;
  summary: string;
  content: string[];
  examplePrompt?: string;
  pitfalls: string[];
  /** Show prompt template builder on detail panel */
  showPromptBuilder?: boolean;
  /** Show RAG evaluation demo on detail panel */
  showRagDemo?: boolean;
}

export interface PromptTemplateField {
  id: string;
  label: string;
  placeholder: string;
}

export interface PromptTemplate {
  id: string;
  label: string;
  template: string;
  fields: PromptTemplateField[];
}

export interface RagEvaluationCriterion {
  id: string;
  label: string;
  description: string;
}

export const aiTestingCategories: AiTestingCategory[] = [
  {
    id: "generation",
    label: "Generation",
    description: "Using LLMs to draft and expand test cases.",
  },
  {
    id: "exploration",
    label: "Exploration",
    description: "AI-assisted exploratory testing and session notes.",
  },
  {
    id: "prompts",
    label: "Prompt Engineering",
    description: "Structuring prompts that produce reliable QA output.",
  },
  {
    id: "rag-eval",
    label: "RAG Evaluation",
    description: "Evaluating retrieval-augmented answers for quality and safety.",
  },
  {
    id: "triage",
    label: "Bug Triage",
    description: "Summarizing, clustering, and prioritizing defect reports.",
  },
  {
    id: "synthetic-data",
    label: "Synthetic Data",
    description: "Generating safe, realistic test data at scale.",
  },
];

export const aiTestingTopics: AiTestingTopic[] = [
  {
    id: "llm-test-case-generation",
    categoryId: "generation",
    title: "LLM test case generation",
    summary: "Turn feature descriptions into structured test ideas with human review.",
    content: [
      "Start with a clear feature brief: user role, goal, constraints, and out-of-scope behavior. Ask the model for positive, negative, and boundary cases separately so output stays organized.",
      "Require output in a fixed format (ID, steps, expected result, priority) so you can paste into your test management tool without reformatting.",
      "Always review generated cases for missing auth paths, data isolation, and async timing—models often skip non-happy-path flows.",
    ],
    examplePrompt:
      "You are a senior QA engineer. Given the feature below, produce 5 test cases in a table: ID, Title, Steps, Expected Result, Priority.\n\nFeature: {{featureDescription}}\n\nInclude at least one negative and one boundary case.",
    pitfalls: [
      "Treating LLM output as complete coverage without risk-based review.",
      "Skipping security and permission scenarios the model omitted.",
    ],
    showPromptBuilder: true,
  },
  {
    id: "boundary-security-prompts",
    categoryId: "generation",
    title: "Boundary and security case prompts",
    summary: "Prompt patterns for edge cases, injection, and abuse scenarios.",
    content: [
      "Explicitly ask for OWASP-aligned scenarios: injection, broken auth, sensitive data exposure, and rate limiting.",
      "Provide input field types and validation rules so the model generates realistic boundary values—not generic placeholders.",
      "Cross-check generated security tests against your threat model; LLMs miss domain-specific abuse cases.",
    ],
    examplePrompt:
      "List negative and security test ideas for a {{fieldType}} field named '{{fieldName}}' with rules: {{validationRules}}.\n\nInclude SQL injection, XSS, length boundaries, and unicode edge cases.",
    pitfalls: [
      "Assuming the model knows your auth model without documenting it.",
      "Running generated attack payloads against production environments.",
    ],
    showPromptBuilder: true,
  },
  {
    id: "ai-exploratory-chartering",
    categoryId: "exploration",
    title: "AI-assisted exploratory chartering",
    summary: "Draft session charters and time-boxed missions before hands-on exploration.",
    content: [
      "Feed the model your mission, scope, risks, and time box. Ask for charters with clear oracles (what would indicate a problem).",
      "Use AI to suggest heuristics (SFDPOT, RCRCRC) applied to your specific feature—not generic testing theory.",
      "Charters are starting points; adjust based on what you learn in the first 15 minutes of the session.",
    ],
    pitfalls: [
      "Replacing actual exploration with reading AI-generated charters.",
      "Charters that are too broad to finish in the allotted time box.",
    ],
  },
  {
    id: "session-note-synthesis",
    categoryId: "exploration",
    title: "Session note synthesis",
    summary: "Consolidate raw notes into actionable bug reports and follow-ups.",
    content: [
      "Paste anonymized session notes and ask for: bugs found, suspected risks, areas not covered, and recommended regression tests.",
      "Strip customer names, internal URLs, and credentials before sending notes to any external model.",
      "Validate synthesized bugs against your reproduction steps—models may infer issues you did not actually observe.",
    ],
    examplePrompt:
      "Summarize these exploratory testing notes into: (1) confirmed bugs with repro hints, (2) open questions, (3) suggested automation candidates.\n\nNotes:\n{{sessionNotes}}",
    pitfalls: [
      "Uploading production data or PII into public LLM tools.",
      "Accepting inferred bugs without reproduction.",
    ],
  },
  {
    id: "role-context-constraints",
    categoryId: "prompts",
    title: "Role, context, and constraints pattern",
    summary: "The RCA framework for consistent QA prompts.",
    content: [
      "Role: who the model should act as (e.g., senior SDET on a fintech team).",
      "Context: system under test, stack, release constraints, and audience for the output.",
      "Action: the exact deliverable—test cases, checklist, code review comments, or triage summary.",
      "Constraints: format, length, what to exclude, and confidence calibration ('say unknown if unsure').",
    ],
    examplePrompt:
      "Role: Senior QA automation engineer.\nContext: {{context}}\nAction: {{action}}\nConstraints: {{constraints}}",
    pitfalls: [
      "Vague actions like 'test this' without format or depth expectations.",
      "Missing constraints on hallucination-prone areas (dates, IDs, API contracts).",
    ],
    showPromptBuilder: true,
  },
  {
    id: "few-shot-qa-examples",
    categoryId: "prompts",
    title: "Few-shot examples for QA",
    summary: "Anchor model output with 1–2 examples of your preferred test case style.",
    content: [
      "Include one gold-standard test case in the prompt so the model mirrors your step granularity and expected-result wording.",
      "Keep examples short—long few-shot prompts burn context window and dilute focus.",
      "Refresh examples when your team updates test case standards or tooling fields.",
    ],
    examplePrompt:
      "Follow the style of this example test case:\n\n{{exampleTestCase}}\n\nNow generate cases for: {{featureDescription}}",
    pitfalls: [
      "Examples that contradict your written standards (teaches the wrong pattern).",
      "Too many examples leaving little room for the actual request.",
    ],
    showPromptBuilder: true,
  },
  {
    id: "hallucination-checks",
    categoryId: "rag-eval",
    title: "Hallucination checks for RAG answers",
    summary: "Verify claims against retrieved source documents.",
    content: [
      "Every factual claim in a RAG response should trace to a retrieved chunk. Flag statements with no citation.",
      "Test with questions whose answers are not in the corpus—the model should refuse or say it lacks evidence.",
      "Automate spot checks: sample N queries, human-rate grounded vs. invented content, track regression over prompt/model changes.",
    ],
    pitfalls: [
      "Trusting confident tone as evidence of correctness.",
      "Evaluating only happy-path queries where retrieval always succeeds.",
    ],
    showRagDemo: true,
  },
  {
    id: "relevance-scoring-rubric",
    categoryId: "rag-eval",
    title: "Relevance scoring rubric",
    summary: "Score whether the answer addresses the question and respects scope.",
    content: [
      "Relevance: does the answer address the user's question without unrelated tangents?",
      "Completeness: are critical caveats included (e.g., environment limits, version scope)?",
      "Use a simple 1–5 rubric with written anchors so different evaluators score consistently.",
      "Pair automated retrieval metrics (MRR, nDCG) with human judgment on a golden question set.",
    ],
    pitfalls: [
      "Conflating fluent prose with relevant answers.",
      "Golden sets that never change after the first release.",
    ],
    showRagDemo: true,
  },
  {
    id: "bug-report-summarization",
    categoryId: "triage",
    title: "Bug report summarization",
    summary: "Normalize verbose reports into title, impact, repro, and environment.",
    content: [
      "Prompt for a fixed triage template: title (≤80 chars), severity suggestion, repro steps, actual vs expected, environment.",
      "Use summarization for intake queues—not as a substitute for reading original attachments and logs.",
      "Track whether AI summaries reduce time-to-first-response without increasing mis-routed tickets.",
    ],
    examplePrompt:
      "Summarize this bug report for triage:\n\nTitle (max 80 chars)\nSeverity (S1–S4 with rationale)\nRepro steps\nEnvironment\n\nReport:\n{{bugReport}}",
    pitfalls: [
      "Dropping stack traces or reproduction details the model condensed away.",
      "Auto-assigning severity without human review on customer-facing issues.",
    ],
  },
  {
    id: "duplicate-detection-signals",
    categoryId: "triage",
    title: "Duplicate detection signals",
    summary: "Use embeddings and similarity to cluster likely duplicate bugs.",
    content: [
      "Compare new tickets against open defects using title + repro embedding similarity—not just keyword match.",
      "Set similarity thresholds conservatively; false merges hide distinct root causes.",
      "Present 'possible duplicate of #1234' as a suggestion to triagers, not auto-close rules.",
    ],
    pitfalls: [
      "Merging bugs that share symptoms but differ in root cause.",
      "Ignoring component/version metadata when scoring similarity.",
    ],
  },
  {
    id: "pii-safe-fixtures",
    categoryId: "synthetic-data",
    title: "PII-safe synthetic fixtures",
    summary: "Generate realistic data that never touches real customer records.",
    content: [
      "Define schemas (name, email, phone, address) and generation rules that avoid real domains and valid-looking SSN patterns in the wrong environments.",
      "Use deterministic seeds in CI so the same synthetic dataset reproduces across runs.",
      "Label synthetic records clearly in non-prod environments to prevent confusion during demos.",
    ],
    examplePrompt:
      "Generate {{count}} JSON user records with fields: id, firstName, lastName, email, role.\n\nUse example.com emails only. Roles: admin, member, guest.",
    pitfalls: [
      "Accidentally copying production dumps 'just for testing'.",
      "Synthetic data that passes validation but violates business rules.",
    ],
    showPromptBuilder: true,
  },
  {
    id: "combinatorial-edge-cases",
    categoryId: "synthetic-data",
    title: "Combinatorial edge cases",
    summary: "Pairwise and boundary combinations for configuration testing.",
    content: [
      "Ask the model to produce a pairwise table for N configuration flags with constraints (e.g., feature B requires feature A).",
      "Validate generated combinations manually—models miss illegal states that your domain experts know.",
      "Feed combinations into data-driven tests rather than hard-coding hundreds of permutations.",
    ],
    pitfalls: [
      "Combinatorial explosion when constraints are not specified.",
      "Testing illegal configurations the product never allows.",
    ],
  },
];

export const promptTemplates: PromptTemplate[] = [
  {
    id: "test-case-generation",
    label: "Test case generation",
    template:
      "You are a senior QA engineer. Given the feature below, produce 5 test cases in a table: ID, Title, Steps, Expected Result, Priority.\n\nFeature: {{featureDescription}}\n\nInclude at least one negative and one boundary case.",
    fields: [
      {
        id: "featureDescription",
        label: "Feature description",
        placeholder: "User login with email and password...",
      },
    ],
  },
  {
    id: "security-test-ideas",
    label: "Security test ideas",
    template:
      "List negative and security test ideas for a {{fieldType}} field named '{{fieldName}}' with rules: {{validationRules}}.\n\nInclude SQL injection, XSS, length boundaries, and unicode edge cases.",
    fields: [
      { id: "fieldType", label: "Field type", placeholder: "text input" },
      { id: "fieldName", label: "Field name", placeholder: "searchQuery" },
      {
        id: "validationRules",
        label: "Validation rules",
        placeholder: "max 100 chars, alphanumeric only",
      },
    ],
  },
  {
    id: "rca-prompt",
    label: "Role / context / action",
    template:
      "Role: Senior QA automation engineer.\nContext: {{context}}\nAction: {{action}}\nConstraints: {{constraints}}",
    fields: [
      { id: "context", label: "Context", placeholder: "Playwright e2e suite for a Next.js app..." },
      { id: "action", label: "Action", placeholder: "List flake reduction strategies..." },
      {
        id: "constraints",
        label: "Constraints",
        placeholder: "Bullet list, max 200 words, say unknown if unsure",
      },
    ],
  },
  {
    id: "synthetic-users",
    label: "Synthetic user records",
    template:
      "Generate {{count}} JSON user records with fields: id, firstName, lastName, email, role.\n\nUse example.com emails only. Roles: admin, member, guest.",
    fields: [{ id: "count", label: "Record count", placeholder: "10" }],
  },
];

export const ragSampleResponse =
  "Playwright automatically waits for elements to be actionable before performing interactions. You should prefer getByRole and getByLabel locators over CSS selectors tied to DOM structure. Explicit page.waitForTimeout calls are discouraged because they introduce flakiness when load times vary.";

export const ragEvaluationCriteria: RagEvaluationCriterion[] = [
  {
    id: "relevance",
    label: "Relevance",
    description: "The answer addresses the question about Playwright waiting strategies without unrelated topics.",
  },
  {
    id: "grounding",
    label: "Grounding",
    description: "Claims align with official Playwright documentation—not invented APIs or behavior.",
  },
  {
    id: "hallucination",
    label: "No hallucination",
    description: "No fabricated version numbers, deprecated methods, or non-existent configuration flags.",
  },
  {
    id: "safety",
    label: "Safety / bias",
    description: "Tone is professional; no biased language or unsafe testing advice (e.g., disabling security).",
  },
];

export const promptLabIntro =
  "The Prompt Lab runs your prompts against a live LLM to draft QA ideas — not to replace your judgment. You own risk assessment, environment safety, and sign-off before any output becomes a test artifact.";

export const promptLabHumanReviewNotice =
  "Human review required — treat every LLM response as a draft candidate, not approved test coverage.";

export const promptLabSystemPrompt =
  "You are a senior QA automation engineer assisting another SDET. Provide structured, practical testing guidance. Prefer tables or bullet lists when generating test ideas. Refuse unsafe advice such as disabling security controls or running attack payloads against production. Say you are unsure rather than inventing APIs, version numbers, or configuration flags.";

export const promptQualityCriteria: RagEvaluationCriterion[] = ragEvaluationCriteria;

export type PromptOutputRating = "pass" | "fail" | "unset";

export function scorePromptOutput(
  criteria: RagEvaluationCriterion[],
  ratings: Record<string, PromptOutputRating>,
): { passed: number; total: number; rated: number } {
  const rated = criteria.filter(
    (criterion) => ratings[criterion.id] === "pass" || ratings[criterion.id] === "fail",
  );
  const passed = rated.filter((criterion) => ratings[criterion.id] === "pass").length;

  return { passed, total: criteria.length, rated: rated.length };
}

export function getCategoryById(id: string): AiTestingCategory | undefined {
  return aiTestingCategories.find((category) => category.id === id);
}

export function getTopicById(id: string): AiTestingTopic | undefined {
  return aiTestingTopics.find((topic) => topic.id === id);
}

export function getTopicsByCategory(
  categoryId: string | typeof ALL_CATEGORIES_ID,
): AiTestingTopic[] {
  if (categoryId === ALL_CATEGORIES_ID) {
    return aiTestingTopics;
  }

  return aiTestingTopics.filter((topic) => topic.categoryId === categoryId);
}

export function filterTopics(
  query: string,
  categoryId: string | typeof ALL_CATEGORIES_ID = ALL_CATEGORIES_ID,
): AiTestingTopic[] {
  const normalizedQuery = query.trim().toLowerCase();
  const categoryTopics = getTopicsByCategory(categoryId);

  if (!normalizedQuery) {
    return categoryTopics;
  }

  return categoryTopics.filter((topic) => {
    const category = getCategoryById(topic.categoryId);
    const haystack = [
      topic.title,
      topic.summary,
      ...topic.content,
      ...topic.pitfalls,
      category?.label ?? "",
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });
}

export function getPromptTemplateById(id: string): PromptTemplate | undefined {
  return promptTemplates.find((template) => template.id === id);
}

export function assemblePrompt(template: PromptTemplate, values: Record<string, string>): string {
  let result = template.template;
  for (const field of template.fields) {
    result = result.replaceAll(`{{${field.id}}}`, values[field.id] ?? "");
  }
  return result;
}
