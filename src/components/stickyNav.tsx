import { Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import GlassSurface from '@/components/ui/glass-surface';
import StaggeredMenu from '@/components/ui/staggered-menu';

const items = [
  {
    label: 'Sobre',
    ariaLabel: 'Ir para a seção sobre mim',
    link: '#aboutMeHomepage',
  },
  {
    label: 'Currículo',
    ariaLabel: 'Ir para os documentos',
    link: '#documentosHomepage',
  },
  {
    label: 'Projetos',
    ariaLabel: 'Ir para os projetos',
    link: '#clientsHomepage',
  },
  { label: 'Tecnologias', ariaLabel: 'Ir para a stack', link: '#techStack' },
  {
    label: 'Contato',
    ariaLabel: 'Ir para o formulário de contato',
    link: '#contactMeHomepage',
  },
];

const socialItems = [
  { label: 'GitHub', link: 'https://github.com/joao-carmassi' },
  { label: 'LinkedIn', link: 'https://www.linkedin.com/in/joao-carmassi/' },
  { label: 'Instagram', link: 'https://www.instagram.com/joao_carmassi/' },
];

const StickyNav = () => {
  const [shown, setShown] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // lenis scrolls the window itself, so the native event still fires
    const onScroll = () => setShown(scrollY > innerHeight * 0.5);
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    return () => removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* the menu paints its own full-screen overlay; the pill sits above it so
          its button is also what closes the menu again */}
      <StaggeredMenu
        isFixed
        open={menuOpen}
        showHeader={false}
        closeOnClickAway={false}
        position='right'
        items={items}
        socialItems={socialItems}
        colors={['#eba8ff', '#7300ff']}
        accentColor='#7300ff'
        onMenuOpen={() => setMenuOpen(true)}
        onMenuClose={() => setMenuOpen(false)}
      />

      <div
        // no fade: it drops in from past the top edge and settles, nothing else
        className={`fixed top-4 md:top-6 inset-x-6 mx-auto md:w-1/2 z-50 transition-transform duration-700 ease-[cubic-bezier(0.33,1.15,0.5,1)] ${
          shown ? 'translate-y-0' : 'translate-y-[-250%]'
        }`}
        // the bar is inert while it sits above the viewport
        aria-hidden={!shown}
        inert={!shown}
      >
        {/* the glass stays in flow and the bar floats over it: an absolute
            sibling with no z-index keeps both in the same blending group, so
            mix-blend-difference on the bar reads the glass and the page under
            it and paints the wordmark in whatever colour opposes them */}
        <div className='relative'>
          <GlassSurface width='100%' height={56} borderRadius={999} />
          <nav className='absolute inset-0 flex items-center justify-between gap-4 px-5 text-white mix-blend-difference'>
            <a href='#heroHomepage' className='font-title text-2xl md:text-3xl'>
              JC
            </a>
            <button
              type='button'
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              className='grid size-9 place-items-center rounded-full transition-colors hover:bg-white/20'
            >
              {menuOpen ? <X className='size-5' /> : <Menu className='size-5' />}
            </button>
          </nav>
        </div>
      </div>
    </>
  );
};

export default StickyNav;
