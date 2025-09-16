'use client';

import type { BundledLanguage } from '@/components/ui/kibo-ui/code-block';
import {
  CodeBlock,
  CodeBlockBody,
  CodeBlockContent,
  CodeBlockItem,
} from '@/components/ui/kibo-ui/code-block';
import { useEffect, useState } from 'react';

interface Props {
  json: {
    mobile: string;
    desktop: string;
  };
}

const ContainerCodigo = ({ json }: Props) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  const code = [
    {
      language: 'json',
      filename: 'profile.json',
      code: isMobile ? json.mobile : json.desktop,
    },
  ];

  return (
    <CodeBlock
      data={code}
      defaultValue={code[0].language}
      className='[&_*]:!leading-relaxed [&_*]:text-[0.75rem] md:[&_*]:text-[1rem] [&_*]:!tracking-wide md:[&_*]:!tracking-wider [&_*]:!font-bold [&_pre]:!whitespace-pre-wrap [&_code]:!whitespace-pre-wrap rounded-t-none rounded-b-xl dark'
    >
      <CodeBlockBody>
        {(item) => (
          <CodeBlockItem key={item.language} value={item.language}>
            <CodeBlockContent
              language={item.language as BundledLanguage}
              themes={{
                light: 'material-theme-palenight',
                dark: 'material-theme-palenight',
              }}
            >
              {item.code}
            </CodeBlockContent>
          </CodeBlockItem>
        )}
      </CodeBlockBody>
    </CodeBlock>
  );
};

export default ContainerCodigo;
