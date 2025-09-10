import ScrollFloat from './ScrollFloat';
import { HoverEffect } from './ui/card-hover-effect';

const tecnologias = [
  'Next.js',
  'Tailwind CSS',
  'TypeScript',
  'React',
  'Context API',
  'Shadcn/UI',
];

const TechStack = () => {
  return (
    <section
      id='techStack'
      className='bg-card shadow-md border-t border-border'
    >
      <div className='p-6 md:p-12 max-w-7xl mx-auto space-y-3 md:space-y-6'>
        <ScrollFloat
          animationDuration={1}
          ease='back.inOut(2)'
          scrollStart='center bottom+=50%'
          scrollEnd='bottom bottom-=50%'
          stagger={0.03}
          textClassName='sm:text-5xl md:text-7xl lg:text-9xl font-semibold'
        >
          My Tech stack
        </ScrollFloat>
        <HoverEffect items={tecnologias} />
      </div>
    </section>
  );
};

export default TechStack;
