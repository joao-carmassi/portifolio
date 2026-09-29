# Novos vídeos "Sobre mim" — plano

## Contexto

Hoje os "6 vídeos" são **2 composições Remotion** tocadas ao vivo com `@remotion/player`, e o texto de cada idioma vem de `src/locales/{pt,en,es}/about.json` (`videos.<id>.script`):

- `src/components/about/videos/quem-sou-eu.tsx`: pessoal, 8 cenas, cerca de 34 s. Mostra nome, polaroid (`src/assets/about/joao.webp`), nascido em SP em 2004, mora em São Bento do Sapucaí, Pedra do Baú (`pedra-do-bau.webp`), "100% remoto", idiomas (PT nativo, EN C1, ES B2), objeto `joao` em código, 6 ferramentas e hobbies (trilhas, viajar de moto, música, games, filmes). Fecha com "joão." e github.com/joao-carmassi.
- `src/components/about/videos/da-ideia-ao-deploy.tsx`: profissional, 12 cenas, cerca de 46 s. Mostra briefing, pesquisa de palavras-chave, terminal Astro, hero.tsx, tags de SEO, layout responsivo, auditoria Lighthouse, logos da stack, placar 100/100/100/100, deploy e "no ar.".
- Onde aparecem: `src/components/aboutMeHomepage.tsx` (2 `MediaCard` com proporção 1920/820 no grid) por meio de `src/components/about/videoPlayer.tsx`. As imagens chegam por `src/pages/[lang]/index.astro:115-117`. `/100.astro` usa `videos={false}`.

Os dois atuais são longos (34 s e 46 s), parecem slideshow (uma cena por item) e o profissional é mais um "tutorial do processo" do que um retrato do dev. Você pediu trocar tudo por vídeos feitos com **/brag**. Como você está no Opus 5.5, o /brag passa para o **/brag-slim**: eu mesmo monto a história, o visual, o áudio e o render, e o resultado são **arquivos MP4**, não mais um Player ao vivo.

## Decisões técnicas

- **Motor:** composições HTML + GSAP (já é dependência do projeto), com cada frame em função pura do tempo. A captura é feita em Chrome headless, e o ffmpeg 9 (já instalado) codifica. Se o `npx hyperframes` rodar na máquina, ele faz a captura e o render. Se não rodar, uso um script Node pequeno de captura. As fontes são as do site: DM Serif (título), Raleway e Geist Mono.
- **Formato:** 1920×820, 30 fps, cerca de 20 s cada. Mantive o 1920×820 porque o grid do about depende da proporção de 2,34.
- **i18n:** uma composição por vídeo, que lê `strings.json` com `?lang=pt|en|es`. O timing é fixo e dimensionado pelo texto mais longo (normalmente ES). Só o texto muda entre idiomas.
- **Áudio:** música e SFX do pacote do brag (`assets/music`, `assets/sfx`), mixados. **No site o vídeo toca mudo**: navegador bloqueia autoplay com som, então os arquivos do site saem sem trilha (`-an`, menos bytes). As versões com música ficam em `brag-output/` para redes sociais.
- **Conteúdo verificado:** o portfólio é todo front-end. **Não achei nada de backend** para mostrar, então não vou inventar. Onde você falou em "frontend/backend", uso o que existe: integração de dados (React Query/Zustand), dashboards SaaS, fluxos de reserva e agendamento via WhatsApp e SEO técnico. Se quiser backend no vídeo, me passa o quê.

---

## VIDEO A — PESSOAL · "Ficha de personagem" (cerca de 20 s)

**Ângulo:** você apresentado como personagem de jogo (games é hobby seu). A tela de seleção de personagem vira a ficha e depois o mapa do mundo. Tem personalidade e nada de visual corporativo. **Tom:** `default` puxado para o brincalhão. Paleta noturna violeta com um acento neon. Os frames são nítidos, sem pixel-art tosca: HUD de jogo moderno.

| # | Tempo | Cena | Conteúdo do portfólio usado | Motion / SFX |
|---|---|---|---|---|
| 1 | 0–2,5 s | **Hook: PRESS START.** Tela escura, "PRESS START" pisca, um clique e um flash abrem o HUD | nome "João Vitor Carmassi" (hero.json) | blink, depois impacto e zoom-in; SFX de start |
| 2 | 2,5–6 s | **Seleção de personagem.** Retrato numa moldura de HUD que gira em 3D. Tags de classe e origem entram em pop | `joao.webp`; "desenvolvedor front-end"; "nascido em são paulo, 2004" | moldura desenhada por stroke, tags com spring; SFX de seleção |
| 3 | 6–10 s | **Mapa do mundo.** A Pedra do Baú em parallax lento. Um pin cai em São Bento do Sapucaí e uma rota pontilhada sai da serra até um globo | `pedra-do-bau.webp`; "mora em são bento do sapucaí"; "da serra … para o mundo todo · 100% remoto" | câmera com push-in, pin com bounce, rota desenhada; SFX de whoosh |
| 4 | 10–13,5 s | **Atributos.** Três barras de stat enchem, e balões "olá / hello / hola" estouram | PT nativo, EN C1 (MET), ES B2 (SIELE), vindos de docs.json e about.json | barras com easing e overshoot, contagem no número; SFX de tick |
| 5 | 13,5–18 s | **Inventário.** Grade de slots, um item de cada vez, cada um com ícone (lucide): trilhas, moto, música, games, filmes. O slot "equipado" é o teclado ("código") | hobbies de about.json e meta.json keywords | item "coletado" com escala e brilho, cursor de jogo navegando; SFX de pickup |
| 6 | 18–21 s | **Outro: SAVE GAME.** "Salvar progresso?" e depois "joão." em DM Serif, com github.com/joao-carmassi | assinatura e GitHub (vídeo atual e cards) | barra de save, fade para o nome. O último frame fica estável e vira poster/reduced-motion |

Texto por tela: no máximo 1 título e 1 rótulo curto.

---

## VIDEO B — PROFISSIONAL · "Uma janela, todos os projetos" (cerca de 22 s)

**Ângulo:** uma única janela de browser abstrata é o fio condutor. Ela nasce de um rascunho, vira código e depois muda de forma entre os tipos de projeto que você entrega, ganha motion, sobe no Google e fecha. É um retrato do dev, não uma propaganda do site. **Tom:** `polished` com energia de `app-store`. Grafite e violeta, glass sutil.

| # | Tempo | Cena | Conteúdo do portfólio usado | Motion / SFX |
|---|---|---|---|---|
| 1 | 0–2,5 s | **Hook: rascunho → janela.** Um cursor desenha um retângulo à mão, e o traço "encaixa" e vira uma janela de browser | intro: "do rascunho até o ar" | traço sketchy que morfa para um retângulo limpo; SFX de snap |
| 2 | 2,5–6 s | **Código e stack.** Dentro da janela, linhas TSX digitam sozinhas. Os logos saem do código e orbitam: Next.js, React, TypeScript, Tailwind, Astro, GSAP, React Query, Zustand, Git | techStackHomepage.tsx, meta.json | digitação, depois logos em órbita e depois fileira (simple-icons); SFX de teclado leve |
| 3 | 6–13 s | **O que eu construo.** A janela faz morph por 4 layouts wireframe recriados, cerca de 1,7 s cada, com um rótulo por vez: **sites institucionais** (hero e seções: Refúgio, Dr Jean) → **e-commerce** (grid de produtos e preço PIX: Loja do VRF) → **mapas interativos** (pins e lista lateral: Mapa Turístico) → **SaaS & dashboards** (gráficos e tabela: Quotation Factory, Higgx) | clients.json | morph contínuo, sem corte, com os blocos reorganizando (FLIP); SFX de swoosh curto por troca |
| 4 | 13–15,5 s | **Motion.** O dashboard ganha vida: cards com stagger, uma curva bezier desenhada ao lado e o rótulo "animação com GSAP". Inclui um piscar de componente Prisma UI (botão com shine) | GSAP, Prisma UI (clients.json) | curva de easing sendo desenhada e elementos seguindo a curva |
| 5 | 15,5–19,5 s | **SEO & performance.** A janela vira um resultado de busca que sobe até o 1º lugar. Depois, 4 anéis Lighthouse enchem até 100 | cards: "Core Web Vitals medidos", "HTML semântico e dados estruturados", "palavras que seu cliente digita"; scores do vídeo atual | card de SERP subindo, anéis animando (pure fn); SFX de ding suave no 100 |
| 6 | 19,5–22 s | **Outro.** A janela recua e mostra "João Carmassi · desenvolvedor front-end", com a CTA "me conta seu projeto" | meta.json jobTitle; botão do card | recuo de câmera; o último frame estável vira poster |

---

## Fluxo de execução (com o ponto de aprovação que você pediu)

1. `brag-output/` na raiz, com `brag-plan.md` por vídeo, `pessoal/composition/`, `profissional/composition/` e `strings.json` (pt/en/es). As renders e o `work/` vão para o `.gitignore`. O fonte das composições fica versionado para poder re-renderizar.
2. **Render só PT-BR** dos dois vídeos, mais uma contact sheet de stills (cada cena e o meio de cada transição), conferindo overflow, contraste e legibilidade (cerca de 0,3 s por palavra). **Paro aqui para você aprovar a estrutura visual.**
3. Depois de aprovado: render EN e ES com o mesmo timing, verificando os stills do ES (texto mais longo).
4. Poster: o melhor frame estável vai para `.jpg` e entra como frame 0.
5. Arquivos do site: `public/videos/about/{pessoal,profissional}-{pt,en,es}.mp4` (H.264, sem áudio, CRF por volta de 26, `+faststart`) e `…-{lang}.jpg` (poster). Versões com música e `share-copy.txt` ficam em `brag-output/`.

## Integração no site

- `aboutMeHomepage.tsx`: o `MediaCard` passa a renderizar `<video muted loop playsInline preload="none" poster=…>`. Um `IntersectionObserver` dá play/pause, parecido com o que existe hoje em `videoPlayer.tsx:31-38`. Com reduced motion, fica só o poster. Os ids passam a ser `pessoal` e `profissional`.
- `about.json` (×3): troca os blocos `videos.*` por `{ title, srText }` novos que descrevem os vídeos novos. Os `script` saem.
- `src/pages/[lang]/index.astro`: remove as imagens `/about/*` passadas ao about, que ficam sem uso no site. Os arquivos continuam em `src/assets/about/` porque o vídeo os usa.
- **Remoções:** `src/components/about/videoPlayer.tsx` e `src/components/about/videos/`. Os `src/components/remocn/*` e as deps `remotion` e `@remotion/*` saem **só se** o grep confirmar que nenhum outro lugar usa (por exemplo docs em `/components/`).
- `/100.astro` continua com `videos={false}`.

## Verificação

- Stills de todas as cenas e transições, nos 3 idiomas, revisados antes do render final.
- `ffprobe` em cada MP4: 1920×820, 30 fps, 15–25 s, sem trilha de áudio nos arquivos do site.
- `astro dev --background`, depois abrir `/pt/`, `/en/` e `/es/` no Chrome: o vídeo do idioma certo toca ao entrar na viewport e pausa ao sair. Com reduced motion, mostra o poster. `/100` continua sem vídeo.
- `npx astro check` / `astro build` limpos.
