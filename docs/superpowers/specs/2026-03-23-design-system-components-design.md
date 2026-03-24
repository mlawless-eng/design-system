# Design System Component Expansion — Design Spec

**Date:** 2026-03-23
**Status:** Approved

---

## Overview

Add 32 missing components to the treasury app design system, identified by gap analysis against Material Design 3, Ant Design, and shadcn/ui. All components land in `src/components/ui/` and are showcased in `src/pages/DesignSystemPage.tsx`.

**Total: 23 shadcn/ui installs + 9 custom-built components = 32 components.**

---

## Scope

### shadcn/ui Components to Install (23)

Install via `npx shadcn@latest add <name>`. All use existing Radix UI primitives already in the project where possible.

| Component | shadcn name | New npm deps (major version) |
|---|---|---|
| Accordion | `accordion` | — |
| Aspect Ratio | `aspect-ratio` | — |
| Breadcrumb | `breadcrumb` | — |
| Calendar | `calendar` | `react-day-picker@^9`, `date-fns@^3` |
| Carousel | `carousel` | `embla-carousel-react@^8` |
| Collapsible | `collapsible` | — |
| Command Palette | `command` | `cmdk@^1` |
| Context Menu | `context-menu` | — |
| Drawer | `drawer` | `vaul@^1` |
| Hover Card | `hover-card` | — |
| OTP Input | `input-otp` | `input-otp@^1` |
| Navigation Menu | `navigation-menu` | — |
| Pagination | `pagination` | — |
| Popover | `popover` | — |
| Progress Bar | `progress` | — |
| Radio Group | `radio-group` | — |
| Resizable Panels | `resizable` | `react-resizable-panels@^4` |
| Scroll Area | `scroll-area` | — |
| Sheet | `sheet` | — |
| Slider | `slider` | — |
| Toast (Sonner) | `sonner` | `sonner@^2` |
| Toggle | `toggle` | — |
| Toggle Group | `toggle-group` | — |

### Custom Components to Build (9)

All custom components:
- Use `cn()` from `@/lib/utils` and `class-variance-authority` for variants
- Use `React.forwardRef` where the component wraps a DOM element
- Use the project's Tailwind tokens (defined in `tailwind.config.cjs`): `gray-*`, `blue-*`, `green-*`, `orange-*`, `purple-*`, `pink-*`, `border-gray-100`, `rounded-xl`, `shadow-sm`
- Follow WAI-ARIA patterns for their role
- No new CSS variables or Tailwind token additions

#### `spinner.tsx` — Spinner
```ts
interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg'   // 16px / 24px / 32px (w-4/w-6/w-8)
  className?: string
}
```
SVG circle (full circle outline) with a rotating partial arc segment. Stroke-width: `2` for sm/md, `2.5` for lg. Inherits `currentColor`. Default size: `md`. ARIA: `role="status"` + `<span className="sr-only">Loading…</span>`.

#### `kpi-card.tsx` — KPI / Statistic Card
```ts
interface KpiCardProps {
  label: string
  value: string | number
  trend?: { direction: 'up' | 'down' | 'neutral'; label: string }
  icon?: React.ReactNode
  className?: string
}
```
Card: `border border-gray-100 rounded-xl shadow-sm bg-white p-6`. Label: `text-sm text-gray-500`. Value: `H2` size, `text-gray-900`. Trend badge tokens:
- `up`: `bg-green-100 text-green-300` (green-400 = #05696D is dark on green-100; green-300 = #009994 provides better contrast)
- `down`: `bg-orange-100 text-orange-400`
- `neutral`: `bg-gray-100 text-gray-400`

#### `timeline.tsx` — Timeline
```ts
interface TimelineItem {
  id: string
  icon?: React.ReactNode      // defaults to filled circle dot
  title: string
  description?: string
  timestamp?: string
  status?: 'default' | 'active' | 'complete' | 'error'
}
interface TimelineProps {
  items: TimelineItem[]
  className?: string
}
```
Vertical list. Connecting line: `border-l-2 border-gray-100` running between dots. Status dot colors: `default` = `bg-gray-300`, `active` = `bg-blue-500`, `complete` = `bg-green-300`, `error` = `bg-orange-400`. ARIA: `role="list"` on container, `role="listitem"` on each item.

#### `empty-state.tsx` — Empty State
```ts
interface EmptyStateProps {
  icon?: React.ReactNode
  title: string
  description?: string
  action?: { label: string; onClick: () => void }
  className?: string
}
```
Centered column layout. Icon: `w-12 h-12 text-gray-300`. Title: `H5 text-gray-900`. Description: `Body text-gray-500`. Optional `Button` (primary variant) rendered when `action` is provided. Display-only component; no internal state.

#### `stepper.tsx` — Stepper
```ts
type StepStatus = 'pending' | 'active' | 'complete' | 'error'
interface Step {
  label: string
  description?: string
  status: StepStatus
}
interface StepperProps {
  steps: Step[]
  className?: string
}
```
Horizontal row of numbered circles connected by lines. Circle states:
- `complete`: `bg-blue-500 text-white` + check icon
- `active`: `border-2 border-blue-500 text-blue-500` (ring outline)
- `error`: `border-2 border-orange-400 text-orange-400` + X icon
- `pending`: `border-2 border-gray-200 text-gray-400`

Connecting line between step N and step N+1: `bg-blue-500` when step N has `status === 'complete'`, otherwise `bg-gray-200`. ARIA: `role="list"` on container, each step `role="listitem"`, active step gets `aria-current="step"`.

#### `tag.tsx` — Tag / Chip
```ts
interface TagProps {
  children: React.ReactNode
  variant?: 'default' | 'blue' | 'green' | 'error' | 'orange' | 'purple'
  onRemove?: () => void   // renders × button; caller manages removal from state
  icon?: React.ReactNode
  className?: string
}
```
Inline pill. Variant token pairs (bg / text):
- `default`: `bg-gray-100 / text-gray-700`
- `blue`: `bg-blue-100 / text-blue-600`
- `green`: `bg-green-100 / text-green-400`
- `error`: `bg-orange-100 / text-orange-400` (named `error`, not `red` — the project has no red tokens; orange represents error/destructive states)
- `orange`: `bg-orange-200 / text-orange-500`
- `purple`: `bg-purple-100 / text-purple-400`

> **Note:** The variant previously labelled `red` is renamed to `error` to align with the project's token set. There is no `red` variant.

Dismiss button: `aria-label="Remove"`. The `×` button calls `onRemove()`; the parent manages state.

#### `input-number.tsx` — Input Number
Wraps the existing `<Input>` component (imported from `@/components/ui/input`), inheriting `id`, `name`, `aria-*`, `data-*`, and other HTML input attributes.
```ts
interface InputNumberProps extends Omit<
  React.ComponentPropsWithoutRef<typeof Input>,
  'onChange' | 'value' | 'defaultValue' | 'type' | 'min' | 'max' | 'step'
> {
  value?: number
  defaultValue?: number
  min?: number
  max?: number
  step?: number             // default: 1
  precision?: number        // decimal places to display, default: 0
  onChange?: (value: number | undefined) => void
}
```
The native `min`, `max`, and `step` are omitted from the base type and re-declared as typed `number` props above to avoid duplicate-prop collisions at call sites.
When `value` is provided (controlled mode), `onChange` must also be provided — if omitted, the component logs a `console.warn` and treats itself as read-only. Rendered as the existing `Input` flanked by `−` and `+` `Button` (ghost variant, icon-only). ARIA: `role="spinbutton"`, `aria-valuemin`, `aria-valuemax`, `aria-valuenow`. Clamps to `min`/`max` on blur. Invalid (non-numeric) entry reverts to last valid value on blur.

#### `segmented.tsx` — Segmented Control
```ts
interface SegmentedProps {
  options: Array<{ label: React.ReactNode; value: string; disabled?: boolean }>
  value?: string            // controlled — when provided, onChange is required
  defaultValue?: string     // uncontrolled fallback
  onChange?: (value: string) => void
  className?: string
}
```
Row of buttons where exactly one is active. Distinct from `ToggleGroup` (multi-select). When `value` is provided without `onChange`, logs a `console.warn` and is read-only. ARIA: `role="radiogroup"`, each option `role="radio"` with `aria-checked`. Keyboard: Left/Right arrows move focus and selection; wraps around at ends. Home/End jump to first/last non-disabled option. Disabled options are skipped during keyboard navigation.

#### `date-picker.tsx` — Date Picker
Composed from the `calendar` + `popover` shadcn installs. No additional npm deps beyond those listed for `calendar`.
```ts
interface DatePickerProps {
  value?: Date
  defaultValue?: Date
  onChange?: (date: Date | undefined) => void   // called with undefined on clear
  placeholder?: string      // default: "Pick a date"
  disabled?: boolean
  className?: string
}
```
Trigger: `Button` (outline variant) with `CalendarIcon` (Lucide) + `date-fns` `format(date, 'PPP')` text. Popover contains `Calendar` with `mode="single"`. A "Clear" button (ghost, small) inside the popover footer calls `onChange(undefined)` — visible only when a date is selected. Clicking an already-selected date re-selects it (no toggle-off behavior). Keyboard: follows shadcn Calendar's built-in keyboard navigation.

---

## Design System Page

Each component gets a new `<section>` in `src/pages/DesignSystemPage.tsx` using the established pattern:

```tsx
<section>
  <H2 className="mb-1">Component Name</H2>
  <Body className="text-gray-500 mb-8">One-line description.</Body>
  {/* live, interactive demo */}
</section>
```

Sections are added to the existing **Components** tab in this order (**32 sections total**). The Command Palette section includes a Combobox sub-example — no separate section heading for Combobox:

1. **Feedback:** Toast (Sonner), Progress Bar, Spinner
2. **Data Input:** Radio Group, Slider, Input Number, Segmented Control, Date Picker, OTP Input, Command Palette (includes combobox demo)
3. **Data Display:** Accordion, Popover, Hover Card, Tag/Chip, Timeline, KPI Card, Empty State, Carousel, Calendar, Scroll Area
4. **Navigation:** Breadcrumb, Pagination, Navigation Menu, Stepper
5. **Overlays:** Drawer, Sheet, Context Menu
6. **Layout:** Collapsible, Resizable Panels, Aspect Ratio
7. **Toggle:** Toggle, Toggle Group

---

## Root-Level Changes

- **`src/App.tsx`**: Add `<Toaster />` (from `sonner`) as a sibling **before** the conditional route rendering — not inside any branch — so it is mounted regardless of which route is active. Example placement:
  ```tsx
  // src/App.tsx
  import { Toaster } from '@/components/ui/sonner'
  // ...
  return (
    <>
      <Toaster />          {/* ← add here, above all route branches */}
      {/* existing route JSX */}
    </>
  )
  ```
- Drawer and Sheet (Vaul) render into a portal automatically — no additional provider setup needed.

---

## Architecture

- **No new pages, no new routes**
- **Named exports** matching shadcn convention
- **No new CSS variables** — use existing project tokens only

---

## File Changes

| File | Change |
|---|---|
| `src/components/ui/*.tsx` | 23 new shadcn files + 9 new custom files |
| `src/pages/DesignSystemPage.tsx` | 32 new import groups + 32 new section blocks |
| `src/App.tsx` | Add `<Toaster />` mount |
| `package.json` / `package-lock.json` | New deps: `react-day-picker@^9`, `date-fns@^3`, `embla-carousel-react@^8`, `cmdk@^1`, `vaul@^1`, `input-otp@^1`, `react-resizable-panels@^4`, `sonner@^2` |

---

## Out of Scope

- Storybook stories and unit tests (separate tasks)
- Dark mode variants
- Low-priority Ant Design-only components: Watermark, Transfer, TreeSelect, Rate, Mention, Cascader
- Charts (partially addressed in AssetsPage)
- Axe/accessibility automated testing (separate task — `@storybook/addon-a11y` is already installed for future use)

---

## Success Criteria

- `tsc --noEmit` exits with code 0 (no TypeScript errors)
- `vite build` exits with code 0 (no build errors)
- All 32 component sections render at `/design-system` with no console errors
- Each interactive section contains at least one rendered, non-disabled component instance that responds to a user interaction (click, focus, or keyboard input produces a visible state change). Display-only components (`Timeline`, `EmptyState` without action, `KpiCard`, `Stepper`) are exempt — their demo must render correctly with representative prop values covering all visual states (e.g., Stepper shows all four step statuses; Timeline shows all four dot colors)
- No regressions: all sections present before this change continue to render and function correctly
