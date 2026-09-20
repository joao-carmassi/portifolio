import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { P } from '@/components/ui/p';
import { H3 } from '@/components/ui/h3';
import { Button } from '@/components/ui/button';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Tilt } from '@/components/ui/tilt';
import { DepthMedia } from '@/components/ui/depth-media';
import {
  MorphingDialog,
  MorphingDialogClose,
  MorphingDialogContainer,
  MorphingDialogContent,
  MorphingDialogDescription,
  MorphingDialogTitle,
  MorphingDialogTrigger,
} from '@/components/ui/morphing-dialog';

type ClientItem = {
  title: string;
  description: string;
  url: string;
  image: string;
  longDescription: string;
};

const title = 'Projetos & Clientes';

const text =
  'Soluções digitais reais com resultados concretos — de pousadas a SaaS B2B e projetos open source.';

const cta = 'Visitar';

const items: ClientItem[] = [
  {
    title: 'Refugio Da Pedra SP',
    description:
      'Chalés aconchegantes nas montanhas de São Bento do Sapucaí, ao pé da Pedra do Baú — vistas deslumbrantes, lareira e natureza preservada.',
    url: 'https://refugiodapedrasp.com',
    image: '/clients/refugio.webp',
    longDescription:
      'Pousada familiar fundada em 2018 em São Bento do Sapucaí, na Serra da Mantiqueira, a 1,5 km da base da Pedra do Baú. São cinco acomodações — três chalés, uma cabana com lareira e um domo geodésico — todas com deck, vista para a serra e café da manhã com produtos regionais. O site traz galeria completa, páginas por acomodação e um fluxo de reserva próprio em quatro etapas que monta a solicitação e envia direto pelo WhatsApp da pousada.',
  },
  {
    title: 'Quotation Factory',
    description:
      'Plataforma SaaS B2B com IA para metalurgia: lê arquivos CAD, gera listas de materiais, calcula custos e cria orçamentos automaticamente.',
    url: 'https://www.quotationfactory.com',
    image: '/clients/qf.webp',
    longDescription:
      'SaaS B2B holandês que automatiza a orçamentação da indústria metalúrgica: lê arquivos CAD em mais de 30 formatos (STEP, DXF, DWG, DSTV, NC1), analisa geometria e furos e devolve orçamentos precisos em minutos. A Virtual Factory modela máquinas, tolerâncias e custos operacionais para alocar cada trabalho só a equipamentos capazes, somando material, tempo de máquina, ferramental, nesting e dedução de dobra. Integra com ERPs (Ridder IQ, MKG, Bemet) e sistemas CAM (TruTops, Lantek, CADMAN, BySoft) por um Edge Connector on-premise, e já processou mais de 281 mil orçamentos para 1.200+ usuários.',
  },
  {
    title: 'Higgx',
    description:
      'Plataforma aberta de IA que orquestra orçamentos, planejamento e produção para metalurgia de alto mix — construída sobre 10+ anos de experiência na Quotation Factory.',
    url: 'https://higgx.app',
    image: '/clients/higgx.webp',
    longDescription:
      'Runtime de relacionamentos de negócio para operações agênticas — não é ERP, CRM nem motor de workflow. Conecta eventos, expectativas, compromissos e ações entre clientes, fornecedores, times, máquinas e agentes de IA sem centralizar tudo numa única aplicação: o SignalMesh transporta sinais atribuíveis por API, e-mail, EDI, SCSN e MQTT, e o Expectation Management System monitora o que foi prometido, detecta risco e coordena a recuperação sob política. Nasceu de mais de uma década de Quotation Factory, hoje o primeiro app rodando sobre ele.',
  },
  {
    title: 'Prisma UI',
    description:
      'Biblioteca de componentes React de código aberto para construir interfaces de usuário hermosas, acessíveis e personalizáveis — construída com Radix UI e Tailwind CSS.',
    url: 'https://prismaui.com/',
    image: '/clients/prisma.webp',
    longDescription:
      'Biblioteca de componentes React open source (MIT) construída sobre primitivos Radix UI e Tailwind CSS, inteiramente tipada em TypeScript. São 13 componentes em três categorias — General, Inputs e Cards — com variantes de efeito prontas como shine, ringHover, gooey, expandIcon, rainbow e border-beam, além de estados de loading e disabled e a prop asChild. A distribuição é copy-paste por um registry compatível com shadcn/ui: o comando add da CLI resolve as dependências sozinho, sem configuração extra.',
  },
  {
    title: 'Dr Jean Almeida',
    description:
      'Médico psiquiatra em São Paulo, na Avenida Paulista — atendimento a adultos com depressão, ansiedade, TDAH e burnout, com escuta cuidadosa e acompanhamento longitudinal.',
    url: 'https://drjeanalmeida.com',
    image: '/clients/jean.webp',
    longDescription:
      'Landing page de página única para o consultório do Dr. Jean Almeida, médico psiquiatra (CRM 127.207) na Avenida Paulista, em São Paulo. Apresenta a abordagem clínica — psiquiatria integrada a compreensão psicodinâmica, com escuta cuidadosa e acompanhamento longitudinal — e as áreas de atuação: depressão, ansiedade, TDAH em adultos, burnout, transtorno bipolar, insônia crônica e borderline. Traz depoimentos, FAQ e um fluxo de agendamento em quatro etapas que leva direto ao WhatsApp, somados a um blog com 22 artigos de saúde mental.',
  },
  {
    title: 'Loja do VRF',
    description:
      'E-commerce especializado em peças e componentes originais para sistemas VRF de ar condicionado — atendendo profissionais de HVAC em todo o Brasil.',
    url: 'https://lojadovrf.com.br',
    image: '/clients/vrf.webp',
    longDescription:
      'E-commerce especializado em peças novas e originais para sistemas de ar-condicionado VRF, com catálogo de cerca de 430 produtos das marcas Daikin, Samsung, Mitsubishi, Toshiba, LG, Midea, Gree, Hitachi, GMCC e Montreal. Cobre compressores, placas, sensores, válvulas de expansão, bombas de dreno, automação e equipamentos de diagnóstico, com navegação por categoria e por fabricante e SKU próprio por peça. Frete grátis para todo o Brasil, 7% de desconto no PIX e parcelamento em 12x, além de suporte por WhatsApp com especialistas técnicos em VRF e uma seção de manuais Toshiba e Midea.',
  },
];

const dialogTransition = {
  type: 'spring' as const,
  bounce: 0.05,
  duration: 0.35,
};

const fadeVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 12 },
};

const getHost = (url: string): string => {
  try {
    return new URL(url).hostname.replace(/^www\./, '');
  } catch {
    return url;
  }
};

const ClientCard = ({
  item,
  cta,
}: {
  item: ClientItem;
  cta: string;
}): React.ReactNode => (
  <MorphingDialog transition={dialogTransition}>
    <MorphingDialogTrigger
      className='block w-full text-left'
      label={item.title}
    >
      <Tilt rotationFactor={8}>
        <Card className='overflow-hidden border-none shadow-lg bg-card pt-0! gap-4 h-fit'>
          <CardContent className='flex h-full flex-col p-0'>
            <DepthMedia
              src={item.image}
              alt={item.title}
              className='h-72 lg:h-82'
              sizes='(max-width: 639px) 92vw, (max-width: 767px) 69vw, (max-width: 1023px) 46vw, (max-width: 1535px) 32vw, 29vw'
            />
          </CardContent>
          <CardFooter className='flex flex-col gap-1.5 md:gap-3 items-start'>
            <MorphingDialogTitle>
              <H3 className='md:text-lg lg:text-xl'>{item.title}</H3>
            </MorphingDialogTitle>
            <P className='line-clamp-3'>{item.description}</P>
          </CardFooter>
        </Card>
      </Tilt>
    </MorphingDialogTrigger>

    <MorphingDialogContainer>
      <MorphingDialogContent className='relative w-full max-w-3xl max-h-[90dvh] overflow-y-auto rounded-2xl bg-card shadow-2xl'>
        <div className='relative aspect-1861/912 w-full'>
          <img
            src={item.image}
            alt={item.title}
            sizes='(max-width: 768px) 100vw, 768px'
            className='absolute inset-0 size-full object-cover'
          />
        </div>
        <div className='flex flex-col items-start gap-3 p-6'>
          <MorphingDialogTitle>
            <H3 className='text-xl md:text-2xl lg:text-3xl'>{item.title}</H3>
          </MorphingDialogTitle>
          <MorphingDialogDescription
            variants={fadeVariants}
            disableLayoutAnimation
            className='space-y-4'
          >
            <P>{item.longDescription}</P>
            <Button
              asChild
              variant='link'
              size='lg'
              effect='hoverUnderline'
              className='px-0'
            >
              <a href={item.url} target='_blank' rel='noopener noreferrer'>
                {cta} {getHost(item.url)}
                <ArrowUpRight />
              </a>
            </Button>
          </MorphingDialogDescription>
        </div>
        <MorphingDialogClose
          className='absolute top-4 right-4 z-10 grid size-9 place-items-center rounded-full bg-card/80 text-foreground backdrop-blur-sm transition-colors hover:bg-primary hover:text-primary-foreground'
          variants={fadeVariants}
        />
      </MorphingDialogContent>
    </MorphingDialogContainer>
  </MorphingDialog>
);

const Clients = (): React.ReactNode => {
  useGSAP(() => {
    if (!items || !text) return;
    gsap.registerPlugin(ScrollTrigger);

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: '#clientsHomepage',
        start: 'top 70%',
      },
    });

    tl.from(
      '.clients-animation',
      {
        opacity: 0,
        y: 100,
        ease: 'power3.out',
        stagger: 0.08,
        duration: 0.9,
      },
      0,
    );
  }, []);

  return (
    <section className='overflow-hidden py-6 lg:py-12'>
      <div className='px-4 md:px-24 space-y-6 md:space-y-12'>
        <div className='space-y-1.5 md:space-y-3'>
          <h2 className='font-title text-5xl md:text-7xl'>{title}</h2>
          <p className='text-muted-foreground font-semibold max-w-2xl'>
            {text}
          </p>
        </div>
        <div className='relative -mr-4 md:-mr-12'>
          <Carousel
            opts={{
              align: 'start',
              loop: true,
              skipSnaps: true,
            }}
            id='clientsHomepage'
            className='w-full'
          >
            <CarouselContent>
              {items.map((item, index) => (
                <CarouselItem
                  key={index}
                  className='basis-4/5 sm:basis-3/5 md:basis-2/5 lg:basis-[28%] xl:basis-[28%] 2xl:basis-1/3 p-3 lg:p-6 pt-0 clients-animation'
                >
                  <ClientCard item={item} cta={cta} />
                </CarouselItem>
              ))}
            </CarouselContent>
            <div className='flex gap-3'>
              <CarouselPrevious className='static size-10 translate-x-0 translate-y-0 bg-card transition-colors hover:text-card hover:bg-primary/80 [&>svg]:size-6 lg:[&>svg]:size-8 border-t shadow-md' />
              <CarouselNext className='static size-10 translate-x-0 translate-y-0 bg-card transition-colors hover:text-card hover:bg-primary/80 [&>svg]:size-6 lg:[&>svg]:size-8 border-t shadow-md' />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};

export default Clients;
