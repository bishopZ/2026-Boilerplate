---
name: migrate-ci-github-to-gitlab
description: Replace GitHub Actions CI with GitLab CI/CD while preserving the same lint, typecheck, and Cypress E2E behavior and updating docs for gitlab.com settings.
---

# Migrate CI from GitHub Actions to GitLab

Use this skill when a task asks to move continuous integration off GitHub-specific workflow files onto **GitLab CI/CD** (`.gitlab-ci.yml`), or to drop `.github/workflows` in favor of a GitLab-hosted project.

## Goal

- Remove GitHub Actions workflow definitions (and other GitHub-only CI glue that is no longer needed).
- Add a **GitLab CI** pipeline that matches the existing quality bar: **`npm run lint`**, **`npm run type-check`**, **`npm run test:e2e`** (Cypress against `http://localhost:3000` with a dev server started in the job).
- Keep **no mandatory CI secrets** for the default path (same idea as committed non-production env for the app under test).
- Update **README**, **CONTRIBUTING**, **AGENTS.md** (skills list), and **CHANGELOG** so contributors and agents are not pointed at GitHub-only instructions.

## Preconditions

- Confirm the repo **currently** has (or recently had) GitHub Actions under `.github/workflows/` (typically `ci.yml`). If there is no Actions workflow yet, add GitLab CI from scratch using the same commands and env pattern below—no need to delete missing files.
- Confirm **`package-lock.json`** exists so **`npm ci`** is valid in CI (this boilerplate expects it).

## CI behavior to preserve

| Check     | Command              | Notes |
| --------- | -------------------- | ----- |
| Lint      | `npm run lint`       | Node **24.x**, `npm ci` |
| Typecheck | `npm run type-check` | `tsc --noEmit` |
| E2E       | `npm run test:e2e`   | Copy committed CI env → `.env`, start **`npm run dev`** in background, wait until **`http://127.0.0.1:3000`** responds, run Cypress, stop server in `after_script` |

**Env file:** If the repository uses **`.github/ci.env`**, relocate it to a **vendor-neutral** path as part of migration (recommended: **`ci/ci.env`**) and reference that path from `.gitlab-ci.yml`. Update any remaining docs that linked to `.github/ci.env`.

**Triggers (GitLab equivalents):**

| GitHub                    | GitLab |
| ------------------------- | ------ |
| `pull_request`            | `merge_request_event` (and/or `external_pull_request_event` if using GitLab mirroring of GitHub PRs) |
| `push` to `main`          | `push` pipelines on `main` |
| `merge_group`             | **Merge trains** / **Merged results pipelines** (project settings)—no single YAML line is identical; document in README |

## Files to add

### 1) `.gitlab-ci.yml`

- Use a **current Node 24** image (e.g. `node:24-bookworm`) or `image: node:24` per your registry policy.
- Enable **npm cache** via GitLab `cache` (e.g. cache `.npm/` and set `npm_config_cache` under `$CI_PROJECT_DIR` if helpful).
- **Parallel test stage (recommended):** One stage (e.g. `test`) with three jobs—`lint`, `typecheck`, `e2e`—so lint and typecheck are not blocked by E2E duration.
- **Optional `ci_ok` job:** A final stage with `needs: [lint, typecheck, e2e]` and a trivial success script gives a single check name for **protected branch** rules (similar to the GitHub **CI OK** job). If you skip it, rely on “pipeline must succeed” for the merge request.
- **E2E job:**
  - `before_script` or early `script`: `cp ci/ci.env .env` (or your chosen path).
  - Start `npm run dev` in the **background**, poll with `curl` until the root URL returns HTTP success (same loop idea as Actions: ~60 attempts, ~2s sleep).
  - Run `npm run test:e2e`.
  - Use `after_script` to `kill` the background shell/dev server (and optionally `pkill` nodemon/tsx patterns) so runners do not leak processes.
- Set **`timeout`** on the E2E job (e.g. 25–30 minutes) to match the GitHub job intent.

### 2) `ci/ci.env` (when migrating off `.github/ci.env`)

- Move (not duplicate) the existing file if present; keep the same variable names and **long** `SESSION_SECRET` requirement (JWT service rejects short secrets).
- If the file did not exist, create it with the same contract as `.envTemplate` but with **safe CI-only placeholders** (length ≥ 16 for `SESSION_SECRET`, not the literal `[REDACTED]` from the template).

## Files to remove or stop maintaining

- **`.github/workflows/*.yml`** — delete the CI workflow(s) you are replacing.
- **`.github/ci.env`** — remove after relocating to `ci/ci.env` (or delete entirely if env is inlined in GitLab **CI/CD variables**—prefer committed file for fork-friendly, secret-free CI).

Keep **`.github/`** only if other workflows remain (e.g. issue templates); otherwise the directory can be removed when empty.

## Documentation updates

### `README.md`

- Replace **GitHub Actions CI** with **GitLab CI** (or **CI/CD**): point to **`.gitlab-ci.yml`** and **`ci/ci.env`**.
- Replace **Configuration on github.com** with **Configuration on gitlab.com**:
  - **Settings → CI/CD → General pipelines** — ensure CI/CD is enabled; configure **timeout** and **artifact** retention if needed.
  - **Settings → CI/CD → Token access** / **job token** — restrict only if your org requires it (document any extra scope).
  - **Protected branches** (`Settings → Repository`) — require **successful pipeline** for `main` (and optional **allowed to merge** roles).
  - **Merge requests** — enable **Pipelines must succeed** (project **Settings → Merge requests**).
  - **Merge trains** — if you relied on GitHub merge queues, enable and document **merge trains** or **merged results pipelines** here instead of `merge_group` in YAML.

### `docs/CONTRIBUTING.md`

- Replace references to “GitHub Actions” and the GitHub-only README anchor with GitLab pipeline / merge request wording.

### `AGENTS.md`

- Add this skill to the **Skills** list.
- If **Key Commands** or testing bullets mention GitHub Actions only, generalize to “CI pipeline” or name GitLab explicitly.

### `CHANGELOG.md`

- Add an **Unreleased** entry describing the migration (GitHub Actions removed, GitLab CI added, env file path if changed).

## Validation checklist

- Open a **merge request** (or push to a test branch) and confirm the pipeline runs **lint**, **typecheck**, and **e2e** as intended.
- Confirm **Cypress** reaches the app (no “server not running” / connection refused).
- Run locally: `npm run lint`, `npm run type-check`, `npm run test` (with dev server as today’s docs describe).
- Search for stale references:
  - `rg "github\\.com.*Actions|GitHub Actions|\\.github/workflows|GITHUB_ENV" README.md AGENTS.md docs CHANGELOG.md .gitlab-ci.yml`

## Done criteria

- GitLab pipeline provides equivalent coverage to the prior GitHub workflow (lint + typecheck + E2E with server + env file).
- GitHub Actions workflow files for CI are removed (or explicitly retained only with a comment explaining dual hosting—avoid unless required).
- Docs describe **gitlab.com** settings, not **github.com** CI settings.
- **CHANGELOG** and **AGENTS.md** are updated.
