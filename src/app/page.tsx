'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

// export const metadata = {
//   title: 'Portfolio | João Carmassi',
//   description:
//     'Professional portfolio of João Vitor Carmassi, front-end developer specialized in Next and Tailwind CSS.',
//   keywords:
//     'João Vitor Carmassi, web development, frontend development, programming, HTML, CSS, JavaScript, TypeScript, React, Next.js, Tailwind, Sass, Git, Eslint, Redux, Context API, Shadcn/UI, Motion, Mobile first, Scrum, Kanban, games, music, movies, hiking, languages C1 English, B2 Spanish',
//   robots: 'index, follow',
//   openGraph: {
//     title: 'Portfolio | João Carmassi',
//     description:
//       'Professional portfolio of João Vitor Carmassi, front-end developer specialized in Next and Tailwind CSS.',
//     url: `${process.env.NEXT_PUBLIC_SITE_URL}`,
//     siteName: 'Portfolio | João Carmassi',
//     type: 'website',
//   },
//   twitter: {
//     card: 'summary_large_image',
//     title: 'Portfolio | João Carmassi',
//     description:
//       'Professional portfolio of João Vitor Carmassi, front-end developer specialized in Next and Tailwind CSS.',
//   },
// };

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.push('/en');
  }, [router]);

  return <body />;
}
