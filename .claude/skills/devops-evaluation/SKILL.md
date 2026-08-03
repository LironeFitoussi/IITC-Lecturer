---
name: devops-evaluation
description: Evaluate a student's GitHub repo for a DevOps final/certification assignment against a structured rubric (CI/CD, containerization/IaC, security, git practices, docs, testing) and produce an 80-100 score with a detailed written breakdown. Use when the lecturer gives a student GitHub repo link plus what the assignment/task requires and asks to grade it, review it for certification, or "בדוק ריפו של תלמיד", "תן ציון להערכה", "הערכת פרויקט גמר דבאופס".
---

# DevOps Repo Evaluation (Certification Grading)

Grades a single student GitHub repo against a structured DevOps rubric for a
final/certification-level assignment. One run = one repo. Can be re-run per
student. Produces a written Hebrew report (the score/breakdown/feedback are
in Hebrew, matching the lecturer's language; code/file/tool names stay in
English) plus a Notion entry.

The full rubric, weights, and the pass/fail gate criteria live in
`references/rubric.md` — read it before scoring. Do not re-derive the rubric
from scratch each run; treat that file as the source of truth and only
adapt emphasis per the lecturer's task definition (step 1).

## Workflow

### 1. Collect inputs
Make sure you have, before doing any repo work:
- The student's GitHub repo URL.
- The lecturer's definition of what this assignment actually requires /
  what to focus on (free text — e.g. "פרויקט גמר: API עם Docker, CI/CD
  ל-ECR, ו-Terraform לפריסה"). This tailors which rubric items matter most
  and which deliverables are mandatory for the gate check (step 6).
- Optional: student name, cohort/course, due date — include in the report
  header if given, skip silently if not.

If the task definition is missing or too vague to know what's mandatory,
ask the lecturer before evaluating — don't guess what a "final project"
requires.

### 2. Get access to the repo
Check if the repo is already in this session's scope. If not, call
`add_repo` with the owner/repo parsed from the URL (read access is enough
unless the lecturer asks you to comment/push). Clone it into the
scratchpad directory, then call `register_repo_root`.

### 3. Initial survey via GitHub MCP tools (run in parallel)
- `get_file_contents` on the README and any top-level config files.
- `list_commits` — commit history shape (frequency, message quality).
- `actions_list` / `actions_get` — do CI/CD workflows exist, and what do
  recent runs look like (pass/fail, how recent).
- `list_branches`.

### 4. Deep local inspection (on the clone: Glob/Grep/Read/Bash)
- Locate `Dockerfile(s)`, `docker-compose.yml`, `.github/workflows/*`,
  IaC files (`terraform/`, `ansible/`, etc. — only if relevant to the task
  definition), test files, `.gitignore`.
- Grep for likely leaked secrets (API keys, `.env` files committed,
  hardcoded credentials) — check history too, not just the current tree,
  since this is a security gate item.
- Never run destructive or long-lived commands against the student's repo
  (no `docker build`/deploy against real infra) — static inspection only,
  plus reading CI run results GitHub already produced.

### 5. Map findings to the rubric
Use `references/rubric.md`'s 7 categories. Weight emphasis toward whatever
the lecturer's task definition (step 1) called out as required; categories
irrelevant to this specific assignment (e.g. IaC when none was asked for)
stay at their baseline weight rather than being scored against a
requirement that was never assigned.

### 6. Apply the minimum-bar gate BEFORE scoring
Check all gate conditions from `references/rubric.md`. If **any** fail
(e.g. no CI/CD pipeline exists at all, the app doesn't build/run, a
mandatory deliverable from the task definition is entirely missing, or a
secret is exposed in the repo/history):

- Do **not** force a score into 80-100.
- Report clearly: "מתחת לרף המינימלי" (below the minimum bar), list exactly
  which gate condition(s) failed and why, and give an honest estimated
  score outside the 80-100 band (can be well below 80).
- Skip step 7; still produce the report (step 8) and Notion entry (step 9)
  so the lecturer has a record of what's missing.

### 7. Score (only if the gate passed)
Base score = 80. Add the weighted bonus earned per category (see
`references/rubric.md`, max +20 total across all 7 categories). Cap at 100,
round to the nearest integer.

### 8. Write the report
Markdown file in the scratchpad, in Hebrew, containing:
- Header: student/cohort (if given), repo link, task evaluated, date.
- Final score, bolded, with the gate verdict (עבר / מתחת לרף).
- A breakdown table: category, points earned/max, key findings, evidence
  (specific file paths, commit SHAs, or CI run links backing each claim —
  never assert a finding without pointing at what you actually looked at).
- Concrete improvement feedback per weak category.
- One-paragraph overall verdict.

Send the file to the lecturer with `SendUserFile`.

### 9. Log to Notion
Ask the lecturer which Notion database/page to log the result into, unless
already established earlier in the conversation. Create an entry there
(via the Notion MCP tools) with: student, repo link, score, gate verdict,
date, and a short summary — link back to or embed the fuller report rather
than duplicating the whole breakdown table into Notion.
