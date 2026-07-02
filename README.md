# Quality Engineering Lab

An interactive portfolio showcasing QA automation architecture, leadership thinking, and hands-on testing tools — built as a living lab rather than a static resume.

**Author:** Nathan Middleton  
**Stack:** Next.js · TypeScript · Tailwind CSS · shadcn/ui · Playwright · Vitest

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |
| `npm run typecheck` | TypeScript check |
| `npm run test` | Vitest unit tests |
| `npm run test:e2e` | Playwright end-to-end tests (smoke + regression) |
| `npm run test:e2e:smoke` | Smoke tests only |
| `npm run test:e2e:regression` | Regression tests only |

## Project structure

```
app/              Next.js App Router pages (20 feature routes)
components/       UI, layout, and dashboard components
content/articles/ MDX articles for "How I Solve Problems"
lib/              Site config, articles loader, utilities
tests/e2e/        Playwright POM framework (pages, fixtures, specs)
tests/unit/       Vitest unit tests
automation/       Framework Demo documentation (live tests in tests/e2e/)
```

## Feature roadmap

| Phase | Features | Status |
|-------|----------|--------|
| **1** | Foundation — scaffold, design system, routing, CI/CD | Complete |
| **2** | Command Center landing, Contact | Live |
| **3** | Testing Playground, Bug Hunt Game | Live |
| **4** | Test Case Builder, Live API Explorer | Test Case Builder live; API Explorer planned |
| **5** | Framework Architecture, CI/CD Pipeline Visualizer | Live |
| **6** | Articles, QA Leadership, Lessons Learned | Articles + QA Leadership live; Lessons hidden |
| **7** | Interactive Resume, Technical Stack | Live |
| **8** | Metrics Dashboard, Interview Prep | Live |
| **9** | Architecture Whiteboard, Exercises, Snippets | Architecture Whiteboard + What Would You Test live; Snippets planned |
| **10** | Framework Demo, AI in Testing | Live |

## Adding a new feature

1. Set `status: "live"` for the feature in [`lib/site-config.ts`](lib/site-config.ts).
2. Replace the `ComingSoon` placeholder in the feature's `app/` route.
3. Add Playwright coverage in [`tests/e2e/`](tests/e2e/).
4. Update this README roadmap if needed.

## Environment variables

Copy [`.env.example`](.env.example) to `.env.local` when adding API integrations (e.g. OpenAI for the Test Case Builder).

## Deployment

Deploy to [Vercel](https://vercel.com) by connecting the GitHub repository:

1. Import the repo in Vercel
2. Set production branch to `main`
3. Vercel auto-detects Next.js — no extra config required

CI runs on every push and pull request via [`.github/workflows/ci.yml`](.github/workflows/ci.yml): lint, typecheck, unit tests, build, and Playwright e2e.

## License

Private portfolio project.
