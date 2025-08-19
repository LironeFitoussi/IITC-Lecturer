import type { Lesson } from './types.ts'
import BasicTypes from './lesson-01-basic-types.tsx'
import PropsAndComponents from './lesson-02-props-and-components.tsx'
import StateAndEffects from './lesson-03-state-and-effects.tsx'
import EventsAndForms from './lesson-04-events-and-forms.tsx'
import GenericsAndUtilities from './lesson-05-generics-and-utilities.tsx'

export const lessons: Lesson[] = [
  {
    id: '01-basic-types',
    title: '01 — TypeScript Basics',
    summary: 'Primitive types, type aliases, unions, interfaces, and narrowing.',
    Component: BasicTypes,
  },
  {
    id: '02-props-components',
    title: '02 — Props and Components',
    summary: 'Typing component props, optional props, default values.',
    Component: PropsAndComponents,
  },
  {
    id: '03-state-effects',
    title: '03 — State and Effects',
    summary: 'Typing useState, derived state, and basic effects.',
    Component: StateAndEffects,
  },
  {
    id: '04-events-forms',
    title: '04 — Events and Forms',
    summary: 'Typing events for inputs, buttons, and forms.',
    Component: EventsAndForms,
  },
  {
    id: '05-generics-utilities',
    title: '05 — Generics and Utility Types',
    summary: 'Generic functions/components and built-in utility types.',
    Component: GenericsAndUtilities,
  },
]


