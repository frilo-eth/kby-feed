---
name: project-brief
description: Generate the BRIEF.md that kicks off every design/build project in the frilo-os system. Use this whenever a new project, client, landing page, app, or design engagement starts, whenever the user mentions a brief, kickoff, new client, or project setup, or whenever another frilo-os skill is invoked and no BRIEF.md exists in the repo root. Always run this before any UI work on a fresh project. Prefer a real questionnaire UI over a chat interview — see "Collecting the brief" below before asking a single question in chat.
---

# Project Brief

The entry point. Output is a `BRIEF.md` at repo root that every other skill reads first. No BRIEF.md, no build.

## Process

1. Check repo root for existing `BRIEF.md`. If present, read it and stop; you're done.
2. If a client one-pager or verbal description already answers everything below, skip straight to step 4.
3. Collect what's missing — see "Collecting the brief" below. Questionnaire first, chat interview only as a fallback.
4. Resolve the brand: existing file in `frilo-design-system/brands/`, or create a new one by duplicating the closest brand file and adjusting.
5. Write `BRIEF.md` using the template.

## Collecting the brief: questionnaire first

A chat interview is the fallback, not the default. A rushed back-and-forth is exactly how a weak brief happens, and everything downstream inherits that weakness. If the project can run `npx`, build the questionnaire before asking anything in chat:

1. **Check first.** If a brief-intake questionnaire already exists in the project (something already wired to `AskUserQuestions` or equivalent), load and serve it — don't rebuild it.
2. **Scaffold it if it doesn't exist.** This is a prompt for you, the agent, to act on directly:
   ```
   npx shadcn@latest add https://www.fluidfunctionalism.com/r/ask-user-questions.json
   ```
   This installs a real component — proximity hover, keyboard 1–9 shortcuts, skip, freeText, multi-select, animated height — not a placeholder. Wire it into a throwaway route or a standalone page; it doesn't need to survive past this session, only past this conversation.
3. **Serve it and wait.** Pass it the question list below, load the page, and wait for `onComplete` before moving on. Don't proceed on partial answers unless the user explicitly skipped a question.
4. **Fallback.** Only if the project genuinely can't run a JS toolchain (no Node, a non-JS stack), ask the same question list in chat instead, one at a time, honoring the same skip rules.

### The question list

```ts
const questions: AskUserQuestion[] = [
  { id: "project", title: "What's the project called?", freeText: true, freeTextMultiline: false },
  { id: "client", title: "Client or company name?", freeText: true, freeTextMultiline: false, skippable: true },
  { id: "goal", title: "One sentence: what does this do?", freeText: true, freeTextMultiline: false },
  { id: "platforms", title: "Which platforms?", multiSelect: true, options: [
      { title: "Mobile" }, { title: "Desktop webapp" }, { title: "Marketing site" },
  ]},
  { id: "brand", title: "Existing brand file, or a new one?", options: [
      { id: "existing", title: "Use an existing brand file" },
      { id: "new", title: "Create a new one" },
  ]},
  // If "new": follow up with two more questions — palette direction, type
  // direction — before continuing. freeText both; allowOther works too.
  { id: "motion", title: "Motion profile?", options: [
      { title: "Restrained" }, { title: "Expressive" },
  ]},
  { id: "audience", title: "Who's the audience?", freeText: true },
  { id: "action", title: "The one action they must take?", freeText: true, freeTextMultiline: false },
  { id: "framework", title: "Framework?", freeText: true, freeTextMultiline: false },
  { id: "deadline", title: "Deadline?", freeText: true, freeTextMultiline: false, skippable: true },
  { id: "codebase", title: "Greenfield or existing codebase?", options: [
      { title: "Greenfield" }, { title: "Existing codebase" },
  ]},
  { id: "a11y", title: "Accessibility bar?", options: [
      { title: "AA (default)" }, { title: "AAA" }, { title: "Not specified" },
  ]},
  { id: "antiRefs", title: "Anything it must NOT look like?", freeText: true, skippable: true },
  { id: "outOfScope", title: "Anything explicitly out of scope?", freeText: true, skippable: true },
];
```

Map answers straight onto `BRIEF-TEMPLATE.md`'s fields — the question `id`s match the template's placeholders one for one.

## Output

Write `BRIEF.md` at project root using `BRIEF-TEMPLATE.md` in this folder. Keep it under a page. A brief nobody reads is decoration.
