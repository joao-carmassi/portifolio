const links = [
  { href: '#aboutMeHomepage', label: 'Sobre' },
  { href: '#documentosHomepage', label: 'Currículo' },
  { href: '#clientsHomepage', label: 'Projetos' },
  { href: '#techStack', label: 'Tecnologias' },
  { href: '#contactMeHomepage', label: 'Contato' },
];

// lives inside the hero section, so it scrolls away with it and inherits the
// hero's GSAP scope; the padding repeats the hero's own so the wordmark lines
// up with the h1 below it
const HeroNav = () => (
  <div className='hero-nav invisible absolute inset-x-0 top-0 z-20 p-6 md:p-12 lg:p-24'>
    <nav className='hero-entry flex items-center justify-between gap-6'>
      <a href='#heroHomepage' className='font-title text-2xl md:text-3xl'>
        JC
      </a>
      <ul className='hidden md:flex items-center gap-6 font-semibold'>
        {links.map(({ href, label }) => (
          <li key={href}>
            <a
              href={href}
              className='text-foreground/70 hover:text-foreground transition-colors'
            >
              {label}
            </a>
          </li>
        ))}
      </ul>
      <a
        href='#contactMeHomepage'
        className='md:hidden text-foreground/70 hover:text-foreground transition-colors font-semibold'
      >
        Contato
      </a>
    </nav>
  </div>
);

export default HeroNav;
