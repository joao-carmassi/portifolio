# Vídeos "Sobre mim", v3: linguagem das referências

## O que mudou da v2 para a v3

- **Qualidade:** a v2 era recomprimida em CRF 28 (cerca de 0,6 Mbps) e tinha grão animado, que o codec transforma em blocos. A v3 tira o grão e entrega em CRF 20 com `aq-mode=3`, que protege os gradientes escuros.
- **Logo:** o símbolo JC fica em cima e o nome embaixo, na abertura e no encerramento.
- **Cenas:** a v2 reaproveitava os componentes da v1 (HUD, janela com painel lateral, barras de idioma, fileira de ícones) e só trocava as cores. A v3 refaz cada cena com a linguagem das referências.

## A linguagem das referências

**Linear (filme de lançamento)**
- Cada cena ocupa o quadro inteiro, com objetos grandes perto e longe e profundidade de campo: o que está fora do plano de foco fica desfocado.
- A câmera nunca para: aproxima, afasta, gira devagar.
- Uma frase curta por cena, pequena, centralizada, entrando palavra por palavra a partir do desfoque.
- As transições usam a própria cena: a câmera passa por dentro dos objetos, um objeto escuro cruza a lente, ou corta para o claro com um flash.
- Os tons vão do preto ao cinza de estúdio e ao branco.

**Socoloff (Payy)**
- **Abertura:** linhas finas que são a geometria do logo em escala gigante, se desenhando; a câmera recua até elas virarem o logo.
- **Elementos de produto grandes e centrados:** pílulas, cartões, ícones de app e tipografia enorme.
- **Transições de corte:**
  - *match cut*, em que o elemento enche a tela e vira a próxima cena;
  - um objeto passando entre as letras;
  - *wipe* diagonal com borda de luz.
- **Encerramento:** preto com uma grade de linhas finas, e o logo pequeno sai do desfoque e volta a ele.

## Regras

- **Conteúdo:** nada do conteúdo sai; os textos, dados e frases dos dois vídeos continuam. Nos painéis do vídeo profissional entram os screenshots reais dos clientes no lugar dos wireframes.
- **Fotos em cor:** a interface do vídeo fica nos tons neutros da marca, mas as fotos (a minha, a da Pedra do Baú, os sites dos clientes) entram coloridas. Só os ícones da stack ficam monocromáticos.
- **Formato:** os dois vídeos têm 26,0 s, 30 fps e 1920×820.
- **Paleta:** a da marca. Preto `#050505`, estúdio claro `#f7f6f4` a `#d4d3cf`, estúdio cinza e grafite `#2f2e2b`. As fontes são DM Serif Display, DM Serif Display Italic (legendas), Raleway e Geist Mono.
- **Áudio:** trilha em ré maior, com os efeitos no mesmo tom e na mesma reverberação. O card do site toca mudo; o modal toca com som.

## Abertura (0,0 a 2,95 s, igual nos dois)

| t | o que acontece |
|---|---|
| 0,0–1,75 | os traços do J e do C cruzam o quadro como linhas finas, a 34× o tamanho final, e se desenham enquanto a câmera recua; dois ecos maiores somem no caminho |
| 1,25–1,75 | o traço engrossa até o peso do logo e o símbolo pousa acima do centro, com um brilho atrás |
| 1,62–2,3 | "João Carmassi" entra embaixo do símbolo, letra a letra |
| 2,6–2,95 | o conjunto se dissolve em desfoque |

## Encerramento (23,7 a 26,0 s, igual nos dois)

No preto, uma grade de linhas finas se desenha. O símbolo e o nome, empilhados, saem do desfoque, ficam parados e voltam ao desfoque até 25,25 s. O vídeo termina no preto, então o loop do card não salta.

## Vídeo A, pessoal: "Quem sou eu"

| # | t (s) | cena | transição de saída |
|---|---|---|---|
| 1 | 2,7–6,05 | "press start" com um anel de luz girando (o "Introducing" do Linear); o anel vira um ponto. "João Vitor Carmassi" enorme, com a legenda *jogador 1*. O cartão com a foto vem de longe, atravessa as letras (umas na frente, outras atrás) e para no tamanho final, sem passar dele; o nome se abre em volta e some no desfoque | o estúdio da cena 2 acende em volta do cartão parado |
| 2 | 6,05–9,8 | uma seleção de personagem: estúdio escuro com luz de cima, cartões dos outros personagens desfocados dos lados. Linhas finas ligam o cartão a "classe / desenvolvedor front-end" e "origem / são paulo, 2004". Legenda *personagem selecionado*. Moldura discreta no topo: "P1 · João" e "fase 1/5" | o cartão vira e mostra no verso o trecho da foto da Pedra do Baú que está atrás dele; a moldura se abre até a tela inteira, sem zoom na foto |
| 3 | 9,8–13,95 | a foto da Pedra do Baú cobre a tela no enquadramento final; um pino cai na pedra com a etiqueta "base · São Bento do Sapucaí, SP". Uma íris fecha a foto num círculo que voa até um globo de pontos: a serra vira o ponto de partida de rotas pelo mundo. Legenda *da serra para o mundo.* e a pílula "100% remoto" | flash branco |
| 4 | 13,95–17,3 | estúdio claro: *idiomas*. Três pílulas grandes (português · nativo, inglês · C1, espanhol · B2), com balões "olá", "hello" e "hola" | *whip pan* com desfoque de movimento |
| 5 | 17,05–21,1 | estúdio cinza: *inventário*. Seis cubos caem girando até formar uma fileira (os cubos do Linear), com o ícone na face: trilhas, viajar de moto, música, games, filmes, código. O último ganha a luz e a etiqueta *equipado* | uma forma escura cruza a lente e revela a cena seguinte |
| 6 | 20,7–23,7 | anéis de luz inclinados giram (o "Focus on what ships"). Um círculo de progresso fecha em volta de *salvar progresso?*, que vira *✓ progresso salvo*; os anéis se abrem e "joão." sai do desfoque com github.com/joao-carmassi | desfoque para o preto |

## Vídeo B, profissional: "O que eu construo"

| # | t (s) | cena | transição de saída |
|---|---|---|---|
| 1 | 2,7–6,1 | estúdio claro: um lápis rascunha um site (janela, menu, título, imagem, cards). Uma linha passa da esquerda para a direita e, atrás dela, o rascunho vira o site real do Refúgio da Pedra em localhost:4321, que se inclina em 3D. Legenda *do rascunho até o ar.* | a câmera entra na janela |
| 2 | 6,05–9,3 | o TSX se escreve num plano inclinado, com profundidade de campo seguindo a linha digitada. Depois os 9 ícones da stack (Next.js, React, TypeScript, Tailwind, Astro, GSAP, React Query, Zustand, Git) saltam como ícones de app numa mesa inclinada. Legenda *stack* | os ícones passam pela lente |
| 3 | 9,25–15,05 | a câmera voa por janelas suspensas no espaço, com os sites reais em cor. Cada janela entra em foco e passa desfocada por perto da lente; as etiquetas de dados ficam sempre nítidas: 01 sites institucionais (Refúgio da Pedra + Dr. Jean Almeida), 02 e-commerce (Loja do VRF, "PIX −7%"), 03 mapas interativos ("40+ lugares", "aberto agora"), 04 SaaS & dashboards (Quotation Factory + Higgx, com 281k+ orçamentos, 1.200+ usuários e 30+ formatos CAD pulando com elástico). As URLs ficam na barra de cada janela | a câmera atravessa a última janela |
| 4 | 15,0–17,35 | a curva power3.out desenhada como um traço de luz, com um ponto percorrendo; barras elásticas; legenda *animação com GSAP*. A câmera atravessa até o botão "Me conta seu projeto" com brilho passando e clique, sobre o site da Prisma UI desfocado; legenda *componentes da prisma ui* | flash branco |
| 5 | 17,35–20,9 | estúdio claro: a pílula de busca digita "site institucional", os resultados aparecem e o meu (escuro, #1) sobe para o topo. Quatro anéis do Lighthouse chegam a 100. Legenda *SEO desde o primeiro dia* | *wipe* diagonal com borda de luz |
| 6 | 20,8–23,7 | pôster editorial no escuro, com fios finos em cima e embaixo: "desenvolvedor front-end" no canto, o símbolo JC no outro, "João Carmassi" enorme subindo letra a letra com um brilho passando, a CTA "me conta seu projeto →" com clique e a linha da stack embaixo | desfoque para o preto |

## Pipeline

- **Composições:** `brag-output/{pessoal,profissional}/composition/index.html`, em HTML, CSS 3D, canvas (o globo) e GSAP. Cada frame é função pura do tempo: as poses dos cubos, a câmera do voo pelas janelas, o globo e a íris são desenhados no `onUpdate` da timeline a partir de estados que o GSAP anima. A marca compartilhada fica em `shared/brand.{js,css}` e é copiada para `assets/`.
- **Render:** `bash shared/render-all.sh [pt en es]` gera os vídeos e as trilhas, sem perda (CRF 16 do hyperframes).
- **Entrega:** `bash shared/deliver.sh <vídeo> <idioma> <segundo-do-pôster>` junta vídeo e áudio em H.264 CRF 20 (`aq-mode=3`), AAC 128k e `+faststart`, normaliza o áudio em -16 LUFS e salva o pôster `.jpg`.
