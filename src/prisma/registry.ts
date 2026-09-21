// shadcn registry for prisma ui, served by src/pages/components/[...item].json.ts
// and written out as static .json at build time

const SCHEMA = 'https://ui.shadcn.com/schema/registry-item.json';

// the shadcn cli swaps {style} in a registry url for the style in the target
// components.json
export const STYLES = [
  'radix-vega',
  'radix-nova',
  'radix-maia',
  'radix-lyra',
  'radix-mira',
  'radix-luma',
  'radix-rhea',
  'radix-sera',
];

// sources in src/prisma/ui are this style, and the root /components/{name}.json
export const BASE_STYLE = 'radix-vega';

// older components.json files still carry these, so they get vega instead of a 404
export const LEGACY_ALIASES: Record<string, string> = {
  default: BASE_STYLE,
  'new-york': BASE_STYLE,
};

// only these have per-style sources in src/prisma/ui/styles/{style}/
const STYLE_DEPENDENT_FILES = ['button.tsx', 'badge.tsx', 'floating-label-input.tsx'];

interface Component {
  name: string;
  dependencies?: string[];
  devDependencies?: string[];
  registryDependencies?: string[];
  files: string[];
}

export const COMPONENTS: Component[] = [
  {
    name: 'button',
    dependencies: ['class-variance-authority', 'lucide-react', 'radix-ui'],
    registryDependencies: ['spinner'],
    files: ['button.tsx', 'style.css'],
  },
  {
    name: 'badge',
    dependencies: ['class-variance-authority', 'radix-ui'],
    files: ['badge.tsx', 'style.css'],
  },
  {
    name: 'confetti-wrapper',
    dependencies: ['canvas-confetti', 'radix-ui'],
    devDependencies: ['@types/canvas-confetti'],
    files: ['confetti-wrapper.tsx'],
  },
  {
    name: 'rainbow-border',
    registryDependencies: ['card'],
    files: ['rainbow-border.tsx', 'style.css'],
  },
  {
    name: 'border-beam',
    dependencies: ['motion'],
    registryDependencies: ['card'],
    files: ['border-beam.tsx'],
  },
  {
    name: 'shine-border',
    registryDependencies: ['card'],
    files: ['shine-border.tsx', 'style.css'],
  },
  {
    name: 'flip-card',
    registryDependencies: ['card'],
    files: ['flip-card.tsx', 'style.css'],
  },
  {
    name: 'floating-label-input',
    registryDependencies: ['input', 'label'],
    files: ['floating-label-input.tsx'],
  },
  {
    name: 'animated-background',
    dependencies: ['motion'],
    files: ['animated-background.tsx'],
  },
  {
    name: 'tilt',
    dependencies: ['motion'],
    files: ['tilt.tsx'],
  },
  {
    name: 'magnetic',
    dependencies: ['motion'],
    files: ['magnetic.tsx'],
  },
  {
    name: 'tracing-beam',
    dependencies: ['motion'],
    files: ['tracing-beam.tsx'],
  },
  {
    name: 'depth-media',
    dependencies: ['motion'],
    files: ['depth-media.tsx'],
  },
  {
    name: 'aura-beam',
    registryDependencies: ['card'],
    files: ['aura-beam.tsx', 'style.css'],
  },
];

const sources = import.meta.glob<string>('/src/prisma/ui/**/*.{tsx,css}', {
  query: '?raw',
  import: 'default',
  eager: true,
});

function read(path: string): string | undefined {
  // a crlf checkout must not leak into the payloads
  return sources[`/src/prisma/ui/${path}`]?.replaceAll('\r\n', '\n');
}

// per-style sources import the shared css as '../../style.css' and the per-style
// input as './input' so they compile here; installed components sit next to
// style.css and get input from '@/components/ui/input'
function readSource(style: string, file: string): string {
  if (style !== BASE_STYLE && STYLE_DEPENDENT_FILES.includes(file)) {
    const variant = read(`styles/${style}/${file}`);
    if (variant !== undefined) {
      return variant
        .replace("import '../../style.css';", "import './style.css';")
        .replace("import { Input } from './input';", "import { Input } from '@/components/ui/input';");
    }
    console.warn(`[registry] missing src/prisma/ui/styles/${style}/${file}, using the canonical source`);
  }
  const content = read(file);
  if (content === undefined) throw new Error(`[registry] missing src/prisma/ui/${file}`);
  return content;
}

// prisma lives under src/prisma so it never collides with the portfolio's own
// components; installs get the usual shadcn paths back
function toShadcnPaths(content: string): string {
  return content
    .replaceAll('@/prisma/ui/', '@/components/ui/')
    .replaceAll('@/prisma/lib/utils', '@/lib/utils');
}

export function buildItem(component: Component, style: string) {
  const { name, dependencies, devDependencies, registryDependencies } = component;
  return {
    $schema: SCHEMA,
    name,
    type: 'registry:ui',
    description: 'A Prisma UI component. https://github.com/joao-carmassi/prisma-ui',
    author: 'Prisma UI',
    ...(dependencies && { dependencies }),
    ...(devDependencies && { devDependencies }),
    ...(registryDependencies && { registryDependencies }),
    files: component.files.map((file) => ({
      path: `ui/${file}`,
      content: toShadcnPaths(readSource(style, file)),
      type: 'registry:ui',
      target: `components/ui/${file}`,
    })),
  };
}
