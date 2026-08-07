# AGENTS.md — standing instructions for AI agents

This file is the standing prompt for AI coding agents working in this repo.
Humans should read [CONTRIBUTING.md](CONTRIBUTING.md) instead.

## Repo at a glance

- React 19 + Vite + Tailwind SPA (`src/`), code-split routes via React Router v7.
- `api/` = Vercel serverless functions: Stripe Checkout/receipts/portal, Resend
  (contact, newsletter, matching gift, volunteer, careers, gift aid).
- Tests: Vitest + Testing Library + vitest-axe. Lint: oxlint. Format: Prettier.
- Deployment: **Vercel auto-deploys `master`**; GitHub Pages as fallback
  (`npm run deploy`). Contentful optional CMS for news/stories.

## Golden rules (non-negotiable)

1. **Never push to `master` directly.** `master` is protected: every change
   lands via a feature branch + Pull Request with CI green.
2. **Conventional Commits**:
   `feat` `fix` `refactor` `perf` `test` `docs` `ci` `chore` `security` `revert` —
   one logical change per commit, imperative summary ≤ 72 chars, body explains
   WHY. Format: `<type>(<scope>): <subject>` (optional `!` for breaking changes).
   CI enforces this (`validate-commit-messages` job).
3. **CI is the gate** — never merge red. Run `npm run lint && npm test && npm run build`
   locally before pushing. Branch protection requires the checks to pass.
4. **Never rewrite pushed/shared history.** Rebase/squash only on your own
   unpushed branch. Force-push only with `--force-with-lease` if ever unavoidable.
5. **No secrets in code.** `.env` lives in Vercel dashboard settings; never
   commit it. Only `.env.example` is tracked. `STRIPE_SECRET_KEY` and
   `RESEND_API_KEY` are server-side only — never in `src/` or logs.
6. **Recovery first**: `git reflog` (90-day undo), backup branch before risky
   ops, `git revert` (never rewrite) to roll back `master`.
7. **Atomic PRs** — keep them small (< ~400 lines); split large ones.

## The workflow (every change)

```bash
git switch master && git pull          # fresh, up-to-date master
git switch -c <type>/<desc>            # feat/ fix/ docs/ chore/ refactor/...
# ...atomic change(s), conventional commits...
npm run lint && npm test && npm run build
git push -u origin <type>/<desc>       # pre-push hook allows non-master branches
gh pr create --fill
# wait for CI, then:
gh pr merge --squash --delete-branch
```

Branch names: `<type>/<brief-description>` (lowercase, hyphens).
Rollback of a bad merge: `git revert <hash>` on a branch → PR.

## Environment variables (see .env.example)

| Variable | Used by | Required |
|---|---|---|
| `STRIPE_SECRET_KEY` | `api/create-checkout-session.js` etc. | Yes (live donations) |
| `RESEND_API_KEY` | `api/contact.js` etc. | Yes |
| `RESEND_AUDIENCE_ID` | `api/subscribe.js` | Yes |
| `VITE_SENTRY_DSN` | `src/main.jsx` | No |
| `VITE_CONTENTFUL_*` | `src/lib/content.js` | No (falls back to local data) |

## Local setup

```bash
npm install
git config core.hooksPath .githooks   # enables the pre-push hook
npm run dev                           # http://localhost:5173
```

The `api/` functions run as Vercel serverless functions — use `vercel dev`
(local) to exercise them; Vite's dev server does not serve them.

## House rules for edits

- Regenerate `public/sitemap.xml` after adding pages/content:
  `node scripts/generate-sitemap.mjs`.
- New content: edit `src/data/*.js` (news, impactStories, campaigns) — each
  entry needs a unique `slug`.
- Keep photographic assets JPEG (`.jpg`); do not enable `webp` in
  `vite-plugin-imagemin`.
- Follow existing i18n pattern (`src/i18n/translations.js`) — English + French.
