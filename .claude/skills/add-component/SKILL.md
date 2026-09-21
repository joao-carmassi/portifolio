---
name: add-component
description: Full workflow for adding a new component to Prisma UI (the component library documented at /components/ in this portfolio) or updating an existing one. Use this skill whenever someone asks to add, create, or update a Prisma UI component, "contribute a component", "create a new component", or "update component X". Covers the component source, the Starlight docs page, demos, sidebar and the shadcn registry.
---

# Add Component — Prisma UI

Prisma UI lives inside the portfolio, fully isolated under `src/prisma/`. Its docs are Starlight pages at `/components/`, and its shadcn registry is served by an Astro endpoint that becomes static `.json` files at build.

## Key paths

| What                   | Where                                                         |
| ---------------------- | ------------------------------------------------------------- |
| Component source       | `src/prisma/ui/<name>.tsx`                                    |
| Per-style variants     | `src/prisma/ui/styles/<style>/<name>.tsx`                     |
| Shared keyframes / CSS | `src/prisma/ui/style.css`                                     |
| Docs page              | `src/content/docs/components/<slug>.mdx`                      |
| Demo islands           | `src/prisma/demos/<slug>/<n>.tsx`                             |
| Docs helpers           | `src/prisma/docs/` (`component-preview.tsx`, `Install.astro`, `style-showcase.tsx`, `RegistryConfig.astro`) |
| Sidebar                | `starlight({ sidebar })` in `astro.config.mjs`                |
| Registry definitions   | `COMPONENTS` in `src/prisma/registry.ts`                      |
| Registry endpoint      | `src/pages/components/[...item].json.ts`                      |

There is no generate step: `/components/<name>.json` and `/components/<style>/<name>.json` are built from the live sources, in dev and in `astro build`.

---

## Project conventions

- **Framework**: Astro 7 (static) + React islands. Docs are Starlight, English only.
- **Styling**: Tailwind CSS v4. Docs styles are `src/styles/docs.css`, never the portfolio's `global.css`.
- **Component lib**: shadcn/ui (`radix-vega` style is the canonical base; see "Style-aware components" below)
- **Variants**: `class-variance-authority` (cva)
- **Animation**: `motion/react`, CSS keyframes in `src/prisma/ui/style.css`
- **Icons**: `lucide-react`
- **Imports**: inside prisma code always `@/prisma/ui/<x>` and `@/prisma/lib/utils`. The registry rewrites them to `@/components/ui/<x>` and `@/lib/utils` for installs. **Never** import from the portfolio's `src/components/ui` — those are diverged forks.
- **React hooks**: Always import directly — `import { useState } from 'react'`, never `React.useState`
- **Return types**: React component functions always return `React.ReactNode`
- **Semantic colors**: Use design tokens (`bg-primary`, `text-muted-foreground`), never raw values like `bg-blue-500`
- **Spacing**: Use `flex` with `gap-*`, never `space-x-*` or `space-y-*`
- **Merge classes**: Always use `cn()` from `@/prisma/lib/utils`
- **No framework-specific APIs** in components (no `next/image`, `next/link`): installs go to any React project. Use plain `<img>` / `<a>`.
- **Default animation props**: When a component accepts `transition` or `variants` props, always provide sensible defaults so it works out of the box:

```tsx
const DEFAULT_TRANSITION = { type: 'spring', bounce: 0, duration: 0.4 };
const DEFAULT_VARIANTS = {
  enter: (d: number) => ({ x: d > 0 ? 50 : -50, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (d: number) => ({ x: d > 0 ? -50 : 50, opacity: 0 }),
};

export function MyPanel({ transition = DEFAULT_TRANSITION, variants = DEFAULT_VARIANTS, ...props }) { ... }
```

---

## Core rules

### 1. Every code block in docs MUST have a `<ComponentPreview>` above it

Every non-import code block in a docs page must be preceded by a `<ComponentPreview>` showing the rendered result.

````mdx
<ComponentPreview>
  <MyComponent variant='default'>Example</MyComponent>
</ComponentPreview>

```tsx
<MyComponent variant='default'>Example</MyComponent>
```
````

**All demo containers must be `<ComponentPreview>`** (`src/prisma/docs/component-preview.tsx`). Never invent a new demo container. Reusable showcases under `src/prisma/docs/` (e.g. `style-showcase.tsx`) render their demos inside `<ComponentPreview>` too.

**Image placeholders**: use [Lorem Picsum](https://picsum.photos) with plain `<img>`, slightly varying dimensions so different images load. Use the same URLs in the code block below the preview.

```tsx
<img src='https://picsum.photos/320/200' alt='Demo' width={320} height={200} className='rounded-lg' />
<img src='https://picsum.photos/322/204' alt='Demo 2' width={322} height={204} className='rounded-lg' />
```

### 2. Preview blocks must contain ONLY the component

No explanation, wrapping layout or boilerplate inside the preview. Only add context when it is essential to a usage pattern (a layout-level wrapper, a stateful demo).

### 3. Split icon/external imports into a separate code block

````mdx
```tsx
import { ArrowRight, Mail } from 'lucide-react';
```

```tsx
<Button effect="expandIcon" icon={ArrowRight} iconPlacement="right">Continue</Button>
<Button effect="expandIcon" icon={Mail} iconPlacement="left">Send Email</Button>
```
````

The component's own import (in the `## Import` section) is never repeated in variant examples.

### 4. Always check shadcn FIRST

Before writing a new UI component, check whether shadcn/ui already provides it (see the `shadcn` skill; `npx shadcn@latest view <name>` / `search`). If it exists, add it and wrap it; if something similar exists, extend it via a wrapper; otherwise build from scratch. Preserve shadcn's original styles and API.

Adding a shadcn base component for Prisma: put it in `src/prisma/ui/`, not in the portfolio's `src/components/ui/` (the repo's `components.json` targets the portfolio). Copy it from `https://ui.shadcn.com/r/styles/radix-vega/<name>.json` and fix its imports to `@/prisma/...`.

### 5. Prefer wrappers over modifying base components

```
src/prisma/ui/button.tsx             ← shadcn base (DO NOT modify for new features)
src/prisma/ui/card.tsx               ← shadcn base (DO NOT modify for new features)
src/prisma/ui/card-hover-effect.tsx  ← wrapper (add features here)
```

Acceptable reasons to edit a base: fixing a bug in it, syncing with shadcn upstream, purely structural changes (a `data-slot` attribute).

### 6. Astro MDX constraints (read before writing a docs page)

Docs pages are Astro MDX, not Next MDX. React inside MDX renders as **static HTML** unless it is an island:

- **Interactive previews** (hooks, event handlers, motion, pointer effects, radix popovers/tooltips/tabs) go in a demo file `src/prisma/demos/<slug>/<n>.tsx` (default export) and are used as `<Demo1 client:visible />` inside `<ComponentPreview>`.
- **Compound tags** (`<FlipCard.Front>`, `<FloatingLabel.Input>`) and **JSX-valued props** (`front={<Card />}`) break in MDX (`Objects are not valid as a React child`). Put those previews in a demo `.tsx` too; without `client:visible` it still renders static.
- A demo component imported by name (e.g. `import { ConfettiOnClickDemo } from '@/prisma/demos/confetti-onclick'`) still needs `client:visible`, or its `onClick` never runs.
- Children passed from MDX into a hydrated component arrive as static HTML, so never hydrate a parent whose children need React context: move the whole preview into the demo file.
- Multi-line code passed to Starlight's `<Code code={...} />` loses its indentation in MDX. Build it inside an Astro component instead (see `RegistryConfig.astro`). Normal fenced blocks are fine.
- Plain CSS-only components (`<Button effect='shine'>`) can stay inline in the MDX.

---

## Style-aware components

The registry serves every component in 8 shadcn styles (`radix-vega`, `radix-nova`, `radix-maia`, `radix-lyra`, `radix-mira`, `radix-luma`, `radix-rhea`, `radix-sera`) plus legacy aliases (`default`, `new-york` → vega). A component is **style-aware** when its sizing, radius, or typography must match the surrounding shadcn controls (currently: Button, Badge, Floating Label Input).

1. **Canonical source** stays at `src/prisma/ui/<name>.tsx` (the `radix-vega` variant).
2. **Per-style variants** live at `src/prisma/ui/styles/<style>/<name>.tsx` for the other 7 styles. They import shared CSS as `'../../style.css'` and the sibling per-style input as `'./input'`; `src/prisma/registry.ts` rewrites those imports for the payload.
3. Add the file name to `STYLE_DEPENDENT_FILES` in `src/prisma/registry.ts`.
4. Base the per-style class strings on the official shadcn sources (`https://ui.shadcn.com/r/styles/<style>/<name>.json`), then re-apply the Prisma delta (effects, extra props).
5. **Docs page** ends with a `## Theme styles` section rendering `<StyleShowcase component='<name>' />` (`src/prisma/docs/style-showcase.tsx` — extend its imports and prop union).
6. The Installation section shows the direct URL snippet first, then the `@prisma/<name>` snippet with the style-aware note (copy the pattern from `badge.mdx`).
7. Mention the component in the style-aware lists in `src/content/docs/components/index.mdx` and `styles.mdx`.

---

## Decision: new component vs. update

- **New component** → "Full workflow"
- **Update to existing component** → "Update workflow"

---

## Full workflow (new component)

### Step 1 — Check shadcn availability

See core rule 4.

### Step 2 — Implement the component

Create `src/prisma/ui/<name>.tsx`, using existing components as reference:

- `class-variance-authority` for multiple visual options
- `cn()` from `@/prisma/lib/utils` for all class merging
- `React.ComponentProps<"element">` pattern when wrapping a DOM element
- `'use client'` if it uses hooks, event handlers or browser APIs (harmless in Astro, needed by Next installs)
- Keyframes go in `src/prisma/ui/style.css` (imported by the component as `import './style.css'`) — no separate CSS files
- Semantic color tokens only

### Step 3 — Write the documentation page

Create `src/content/docs/components/<slug>.mdx`, in this exact order:

1. **Frontmatter** — `title` (plain name, Starlight appends the site title) and `description`
2. **Imports** — the component, `ComponentPreview`, `Install`, demo islands
3. **Short description** — one paragraph (no `# H1`, Starlight renders the title)
4. **`## Installation`** — `<Install registryUrl='/components/<name>.json' />` (a site path; `Install.astro` prefixes `PUBLIC_SITE_URL`)
5. **`## Import`** — one code block with `import { X } from '@/components/ui/<name>';` (the path users get after install)
6. **`---`** separator
7. **`## Usage` / variant sections** — `<ComponentPreview>` above each code block (core rules 1–3, 6)
8. **`## Props`** — props table at the very end (a plain markdown table)

```mdx
---
title: 'My Component'
description: 'One line on what it does.'
---

import { MyComponent } from '@/prisma/ui/my-component';
import { ComponentPreview } from '@/prisma/docs/component-preview';
import Install from '@/prisma/docs/Install.astro';
import Demo1 from '@/prisma/demos/my-component/1';

A short paragraph.

## Installation

<Install registryUrl='/components/my-component.json' />
```

Use `src/content/docs/components/badge.mdx` as the template.

### Step 4 — Register in the sidebar

In `astro.config.mjs`, add `'components/<slug>'` to the right group (`General`, `Inputs`, `Cards`) of `starlight({ sidebar })`, or add a new group. Pages not listed there are reachable but hidden from the sidebar.

### Step 5 — Add the registry entry

Add an entry to `COMPONENTS` in `src/prisma/registry.ts`:

```ts
{
  name: '<name>',
  dependencies: ['motion'],              // every npm package the files import; omit if none
  devDependencies: ['@types/<dep>'],     // omit if none
  registryDependencies: ['card'],        // shadcn items it needs; omit if none
  files: ['<name>.tsx', 'style.css'],    // style.css only if the component imports it
},
```

List **every** npm import in `dependencies` (including `radix-ui`), or installs in a fresh project fail to resolve it. The endpoint picks the entry up automatically — nothing to run.

### Step 6 — Verify

```bash
astro dev --background
curl -s http://localhost:4321/components/<name>.json          # 200, JSON with the source
curl -s http://localhost:4321/components/radix-nova/<name>.json
```

Open `/components/<slug>/` and check every preview renders and every interactive one responds. For a real install check, run `npx shadcn@latest add http://localhost:4321/components/<name>.json` in a scratch project (scratchpad, never this repo) and confirm files land in `components/ui/` with `@/lib/utils` imports. Stop the server afterwards with `astro dev stop`.

Sitemap and search index are generated by the build; nothing to update.

---

## Update workflow (existing component)

1. Edit `src/prisma/ui/<name>.tsx` (and its per-style variants if style-aware).
2. Update `src/content/docs/components/<slug>.mdx` if the API or behavior changed.
3. Update the `COMPONENTS` entry if imports or dependencies changed.
4. Verify as in Step 6.

---

## Quality checklist

**Component**

- [ ] Checked shadcn first; wrapper instead of editing a base
- [ ] File at `src/prisma/ui/<name>.tsx`, imports only `@/prisma/...` (never `@/components/ui`)
- [ ] No `next/*` or other framework APIs
- [ ] `'use client'` if it uses hooks, event handlers or browser APIs
- [ ] `cn()` for class merging, semantic tokens, `gap-*`, hooks imported directly, `React.ReactNode` return type
- [ ] Keyframes in `style.css`

**Documentation**

- [ ] `src/content/docs/components/<slug>.mdx` with frontmatter, `<Install>`, no H1
- [ ] Every non-import code block has a `<ComponentPreview>` above it
- [ ] Interactive / compound / JSX-prop previews are demo files; interactive ones have `client:visible`
- [ ] Sidebar entry in `astro.config.mjs`

**Registry**

- [ ] `COMPONENTS` entry in `src/prisma/registry.ts` with every npm import in `dependencies`
- [ ] `/components/<name>.json` returns the component in dev
