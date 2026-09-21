import type { APIRoute, GetStaticPaths } from 'astro';
import { BASE_STYLE, COMPONENTS, LEGACY_ALIASES, STYLES, buildItem } from '@/prisma/registry';

// /components/{name}.json is vega; /components/{style}/{name}.json backs the
// @prisma namespace, legacy style names included
export const getStaticPaths = (() => {
  const folders: [string, string][] = [
    ...STYLES.map((s): [string, string] => [s, s]),
    ...Object.entries(LEGACY_ALIASES),
  ];
  return COMPONENTS.flatMap((component) => [
    { params: { item: component.name }, props: { component, style: BASE_STYLE } },
    ...folders.map(([folder, style]) => ({
      params: { item: `${folder}/${component.name}` },
      props: { component, style },
    })),
  ]);
}) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) =>
  new Response(JSON.stringify(buildItem(props.component, props.style)), {
    headers: { 'Content-Type': 'application/json' },
  });
