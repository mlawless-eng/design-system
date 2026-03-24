# shadcn Components Section — Design System Page

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Install 8 missing shadcn/ui components and add one "Components" section (10 sub-sections) to the Foundation tab of DesignSystemPage.tsx.

**Architecture:** All new components installed via `npx shadcn@latest add`. New sections appended inside the existing Foundation `motion.div` in DesignSystemPage.tsx, following the existing white-card + `space-y-16` pattern. Treasury-themed demo content throughout.

**Tech Stack:** React, shadcn/ui, Radix UI, Tailwind CSS, lucide-react

---

### Task 1: Install missing shadcn components

**Files:**
- Create: `src/components/ui/select.tsx`
- Create: `src/components/ui/checkbox.tsx`
- Create: `src/components/ui/textarea.tsx`
- Create: `src/components/ui/tabs.tsx`
- Create: `src/components/ui/tooltip.tsx`
- Create: `src/components/ui/separator.tsx`
- Create: `src/components/ui/skeleton.tsx`
- Create: `src/components/ui/table.tsx`

- [ ] Run shadcn CLI to add all 8 components

```bash
cd /Users/michael/AI-Projects/treasury-app
npx shadcn@latest add select checkbox textarea tabs tooltip separator skeleton table --yes
```

- [ ] Verify files created in `src/components/ui/`

---

### Task 2: Add 10 component sections to DesignSystemPage.tsx

**Files:**
- Modify: `src/pages/DesignSystemPage.tsx`

Sections to add (in order, appended after "Cards & Form Elements"):

1. **Select** — currency/account selectors
2. **Checkbox** — multi-select list items
3. **Textarea** — transfer notes field
4. **Tabs** — Overview / Transfers / Analytics
5. **Separator** — horizontal + vertical dividers
6. **Tooltip** — icon button tooltips
7. **Skeleton** — loading state for a card
8. **Table** — recent transactions
9. **Avatar** — user/team member list
10. **Dialog** — confirm transfer modal
11. **Dropdown Menu** — actions menu

- [ ] Add imports for all new components at top of DesignSystemPage.tsx
- [ ] Append sections inside Foundation tab's motion.div
- [ ] Verify no TypeScript errors

---
