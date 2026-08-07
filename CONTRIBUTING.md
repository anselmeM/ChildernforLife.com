# Contributing to Children for Life

Thanks for contributing! This repo follows a **branch + pull request** workflow
with **protected `master`** — nobody (including admins) pushes to `master`
directly.

## Quick start

```bash
npm install
git config core.hooksPath .githooks   # enable the pre-push hook (blocks direct pushes to master)
npm run dev                           # http://localhost:5173
npm test                              # Vitest
npm run lint                          # oxlint
npm run build                         # production build
```

> The `api/` functions run as Vercel serverless functions. Use `vercel dev` to
> exercise them locally — the Vite dev server does not serve them.

## Golden rules

1. **Never push to `master` directly** — every change lands via a PR with CI green.
2. **Conventional Commits** — `<type>(<scope>): <subject>`:
   `feat` `fix` `refactor` `perf` `test` `docs` `ci` `chore` `security` `revert`.
   One logical change per commit; subject ≤ 72 chars, imperative; body explains WHY.
   CI rejects non-conforming messages (`validate-commit-messages` job).
3. **CI is the gate** — run `npm run lint && npm test && npm run build` before
   pushing; never merge a red PR.
4. **Never rewrite pushed history.** No force-pushes to shared branches.
5. **No secrets.** `.env` goes in Vercel's dashboard, never in git (only
   `.env.example` is tracked).

## Making a change

```bash
git switch master && git pull
git switch -c <type>/<desc>            # e.g. feat/hero-section, fix/checkout, docs/readme
# ... make your change with atomic conventional commits ...
npm run lint && npm test && npm run build
git push -u origin <type>/<desc>
gh pr create --fill                    # or open a PR on github.com
# wait for CI, then:
gh pr merge --squash --delete-branch
```

Branch names: `<type>/<brief-description>` (lowercase, hyphens). Keep PRs small
(< ~400 lines); split big ones. Use the PR template checklist — it exists to
keep reviews fast.

## Rolling back a bad merge

Never rewrite `master`:

```bash
git switch master && git pull
git switch -c revert/<hash>
git revert <hash>
git push -u origin revert/<hash>
# open PR for the revert
```

## Environment variables

Copy `.env.example` to `.env` for local dev. Never commit `.env`. Server-side
secrets (`STRIPE_SECRET_KEY`, `RESEND_API_KEY`, `RESEND_AUDIENCE_ID`) are set in
Vercel's dashboard; `VITE_`-prefixed vars are inlined at build time.

## Deployment

- **Primary**: Vercel — auto-deploys `master` (merges deploy; PRs get previews).
- **Alternative**: GitHub Pages — `npm run deploy` (uses `GITHUB_PAGES=true`).

## House rules

- Regenerate `public/sitemap.xml` after adding pages/content:
  `node scripts/generate-sitemap.mjs`.
- New news/stories/campaigns: edit `src/data/*.js` (each entry needs a unique `slug`).
- Photographic assets stay JPEG (`.jpg`); don't enable `webp` in `vite-plugin-imagemin`.
- i18n: add translations to `src/i18n/translations.js` (English + French).
