# DevOps Evaluation Rubric

Source of truth for `devops-evaluation`. Base score is always **80**;
categories below add up to **+20 bonus points** (max total: 100). Bonus
points within a category should be awarded proportionally to how much of
that category's checklist is actually satisfied — don't treat it as
all-or-nothing.

Adapt weight/emphasis to the lecturer's task definition: if a category was
never part of the assignment (e.g. no IaC was asked for), score it at a
neutral baseline rather than penalizing its absence, and don't let it
crowd out categories the lecturer explicitly called out as important.

## Categories

### 1. CI/CD Pipeline — up to +4
- At least one `.github/workflows/*` (or equivalent CI config) exists.
- Triggers make sense for the project (push/PR/schedule as appropriate).
- Pipeline actually ran, and recent runs are green (or failures are
  understood/explained, not silently broken).
- Meaningful stages (build, test, lint, deploy) rather than a single
  no-op step.

### 2. Containerization / IaC — up to +4
- `Dockerfile` present and reasonable: appropriate base image, multi-stage
  build where it matters, non-root user, no unnecessary bloat.
- `docker-compose.yml` (or k8s manifests) if the project has multiple
  services.
- Terraform/Ansible/other IaC present and coherent, **only if the task
  definition called for infrastructure provisioning**.

### 3. Code Quality & Architecture — up to +3
- Sensible project structure and separation of concerns.
- Config/secrets pulled from environment, not hardcoded.
- No obvious dead code, duplication, or unexplained complexity.

### 4. Git & Version Control Practices — up to +2
- Commit history is atomic and the messages are meaningful (not
  `wip`/`fix`/`asdf` throughout).
- `.gitignore` actually excludes build artifacts, `node_modules`, `.env`,
  etc.
- No secrets or large binaries committed into history.

### 5. Documentation (README) — up to +2
- Explains what the project does and how to run it locally.
- Documents required environment variables / configuration.
- Architecture or design notes for anything non-obvious.

### 6. Security Practices — up to +3
- No hardcoded credentials/API keys, in the working tree **or** git
  history.
- Secrets handled via CI/CD secret stores or environment injection, not
  committed config.
- Any dependency/image scanning or basic hardening present is a plus.

### 7. Testing & Verification — up to +2
- Automated tests exist and are meaningful (not a single placeholder
  test).
- Tests actually run as part of the CI pipeline, not just locally.
- Evidence of a working deployment/build (a green run, a live URL, deploy
  logs) rather than just claims in the README.

## Minimum-Bar Gate (must ALL hold to be eligible for the 80-100 scale)

1. The repo is accessible and the project actually builds/runs (or there
   is clear evidence — e.g. a successful CI/deploy run — that it does).
2. At least one CI/CD workflow exists **and has executed** at least once.
3. Every deliverable the lecturer's task definition marked as mandatory is
   present (e.g. if the task required a Dockerfile, it must exist — don't
   award partial CI/CD credit as a substitute for a missing mandatory
   piece).
4. No exposed secret/credential in the current tree or commit history.

If any gate condition fails, do not assign a score in 80-100 — see
`SKILL.md` step 6 for how to report a below-the-bar result instead.
