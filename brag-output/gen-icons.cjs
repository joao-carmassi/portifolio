const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const L = require('lucide-react');
const S = require('simple-icons');
const fs = require('fs');
const lucide = n => renderToStaticMarkup(React.createElement(L[n], { size: 96, strokeWidth: 1.6, color: 'currentColor' }));
const simple = k => ({ path: S[k].path, hex: S[k].hex, title: S[k].title });
const pessoal = { trail: lucide('Mountain'), moto: lucide('Motorbike'), music: lucide('Headphones'), games: lucide('Gamepad2'), film: lucide('Clapperboard'), code: lucide('Keyboard'), pin: lucide('MapPin') };
const prof = {
  nextjs: simple('siNextdotjs'), react: simple('siReact'), typescript: simple('siTypescript'), tailwind: simple('siTailwindcss'),
  astro: simple('siAstro'), gsap: simple('siGreensock'), reactquery: simple('siReactquery'), git: simple('siGit'),
  // zustand has no simple-icons mark: bear-ish placeholder is worse than a clean wordmark tile
};
fs.writeFileSync('brag-output/pessoal/composition/assets/icons.js', 'window.ICONS=' + JSON.stringify(pessoal) + ';\n');
fs.writeFileSync('brag-output/profissional/composition/assets/icons.js', 'window.ICONS=' + JSON.stringify(prof) + ';\n');
console.log('ok');
