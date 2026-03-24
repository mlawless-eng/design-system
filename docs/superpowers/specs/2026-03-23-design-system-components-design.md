# Design System Component Expansion — Design Spec

**Date:** 2026-03-23
**Status:** Approved

---

## Overview

Add ~31 missing components to the treasury app design system, identified by gap analysis against Material Design 3, Ant Design, and shadcn/ui. All components are installed into `src/components/ui/` and showcased in `src/pages/DesignSystemPage.tsx`.

---

## Scope

### shadcn/ui Components to Install (23)

Install via `npx shadcn@latest add <name>`:

| Component | shadcn name |
|---|---|
| Accordion | `accordion` |
| Breadcrumb | `breadcrumb` |
| Calendar | `calendar` |
| Carousel | `carousel` |
| Collapsible | `collapsible` |
| Command Palette | `command` |
| Context Menu | `context-menu` |
| Drawer | `drawer` |
| Hover Card | `hover-card` |
| OTP Input | `input-otp` |
| Navigation Menu | `navigation-menu` |
| Pagination | `pagination` |
| Popover | `popover` |
| Progress Bar | `progress` |
| Radio Group | `radio-group` |
| Resizable Panels | `resizable` |
| Scroll Area | `scroll-area` |
| Sheet | `sheet` |
| Slider | `slider` |
| Toast (Sonner) | `sonner` |
| Toggle | `toggle` |
| Toggle Group | `toggle-group` |

> Note: `date-picker` is composed from `calendar` + `popover`, not a separate install.

### Custom Components to Build (8)

Hand-crafted to match existing design system patterns in `src/components/ui/`:

| Component | File | Description |
|---|---|---|
| Spinner | `spinner.tsx` | Animated loading indicator, size variants (sm/md/lg) |
| KPI Card | `kpi-card.tsx` | Statistic display with label, value, trend indicator |
| Timeline | `timeline.tsx` | Vertical event list with icon, label, timestamp |
| Empty State | `empty-state.tsx` | Zero-state UI with icon, title, description, optional CTA |
| Stepper | `stepper.tsx` | Horizontal step indicator with active/complete/error states |
| Tag/Chip | `tag.tsx` | Compact label with optional icon and dismiss button |
| Input Number | `input-number.tsx` | Numeric input with +/− controls, min/max, step |
| Segmented Control | `segmented.tsx` | Mutually exclusive button group, controlled/uncontrolled |
| Date Picker | `date-picker.tsx` | Composed from Calendar + Popover |

---

## Design System Page

Each component gets a new `<section>` in `src/pages/DesignSystemPage.tsx`, using the established pattern:

```tsx
<section>
  <H2 className="mb-1">Component Name</H2>
  <Body className="text-gray-500 mb-8">One-line description.</Body>
  {/* live demo */}
</section>
```

Sections are added to the existing **Components** tab (not the Motion tab). Order follows logical grouping:

1. Feedback: Toast, Progress Bar, Spinner
2. Data Input: Radio Group, Slider, Input Number, Segmented Control, Date Picker, OTP Input, Combobox/Command
3. Data Display: Accordion, Popover, Hover Card, Tag/Chip, Timeline, KPI Card, Empty State, Carousel, Calendar, Scroll Area
4. Navigation: Breadcrumb, Pagination, Navigation Menu, Stepper
5. Overlays: Drawer, Sheet, Context Menu
6. Layout: Collapsible, Resizable Panels, Aspect Ratio
7. Toggle: Toggle, Toggle Group

---

## Architecture

- **No new pages** — all sections land in the existing `DesignSystemPage.tsx`
- **No new routes** — existing `/design-system` route covers everything
- **Pattern consistency** — all custom components use `cn()` from `@/lib/utils`, `class-variance-authority` for variants, `forwardRef` where appropriate
- **Exports** — each file exports named components matching shadcn convention

---

## File Changes

| File | Change |
|---|---|
| `src/components/ui/*.tsx` | 23 new shadcn files + 8 new custom files |
| `src/pages/DesignSystemPage.tsx` | ~31 new import lines + ~31 new section blocks |
| `package.json` | New deps added by shadcn CLI (e.g. `react-day-picker`, `input-otp`, `embla-carousel-react`) |

---

## Out of Scope

- Storybook stories for new components (separate task)
- Unit tests (separate task)
- Dark mode variants
- Ant Design-only components (Watermark, Transfer, TreeSelect, Rate, Mention, Cascader) — low priority for a treasury app
- Charts — already partially addressed in AssetsPage

---

## Success Criteria

- All 31 components render without errors in the design system page
- Each section has a live, interactive demo
- No TypeScript errors
- No regressions to existing sections
