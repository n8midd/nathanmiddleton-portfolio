# Playwright Automation Framework

The live Playwright framework for this site lives in [`tests/e2e/`](../tests/e2e/) — not in this folder. This directory documents the intended structure for the **Framework Demo** page and future expansion.

## Current structure

```
tests/e2e/
├── fixtures/
│   └── test.fixture.ts       # Custom fixture with page object instances
├── pages/
│   ├── base.page.ts          # goto, title, url helpers
│   ├── site-shell.page.ts    # Header, sidebar, mobile nav, footer
│   ├── command-center.page.ts
│   ├── architecture.page.ts
│   └── bug-hunt.page.ts
└── specs/
    ├── smoke.spec.ts         # @smoke — fast CI checks
    └── regression/
        ├── command-center.regression.spec.ts
        ├── architecture.regression.spec.ts
        └── bug-hunt.regression.spec.ts
```

## Running tests

```bash
npm run test:e2e              # Full suite (smoke + regression)
npm run test:e2e:smoke        # Smoke only
npm run test:e2e:regression   # Regression only
```

## Patterns

- **Page Object Model** — locators and assertions live in `pages/`; specs call page object methods only.
- **Shared test data** — UI and tests import from `lib/data/` (e.g. command-center, architecture, bug-hunt).
- **Custom fixture** — `test.fixture.ts` injects page objects into every spec.

## Planned additions (Framework Demo page)

- `helpers/` — logging, retry utilities
- Additional page objects as each lab feature goes live
- Parallel CI shards for regression suites
