# React + TypeScript Learning Playground

An educational project to learn TypeScript fundamentals and how to use TypeScript with React.

## What you will learn

- TypeScript basics: primitives, aliases, unions, interfaces, narrowing
- Typing React components and props
- Managing state and effects with proper types
- Handling typed events and forms
- Generics and built-in utility types

## Getting started

1. Install dependencies:
   - `npm install`
2. Run the dev server:
   - `npm run dev`
3. Open the app, then choose lessons from the sidebar. Edit files under `src/lessons` and save to see changes.

## Project structure

- `src/lessons` — each file is a focused, runnable lesson
  - `lesson-01-basic-types.tsx`
  - `lesson-02-props-and-components.tsx`
  - `lesson-03-state-and-effects.tsx`
  - `lesson-04-events-and-forms.tsx`
  - `lesson-05-generics-and-utilities.tsx`
- `src/lessons/index.ts` — registry of lessons used by the UI
- `src/App.tsx` — renders the learning UI and current lesson

## Tips

- Use your editor’s TypeScript hover info to inspect inferred types
- Intentionally break a type to see the compiler guidance
- Convert a value to a narrower union and note the editing experience

## Next steps

- Add your own lessons under `src/lessons` and register them in `src/lessons/index.ts`
- Try stricter TypeScript settings in `tsconfig.*.json`
