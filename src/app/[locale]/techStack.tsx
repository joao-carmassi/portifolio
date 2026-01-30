import ScrollFloat from '../../components/ScrollFloat';
import { HoverEffect } from '../../components/ui/card-hover-effect';
import 'devicon/devicon.min.css';

const tecnologias = [
  {
    name: 'Next.js',
    img: <i className='devicon-nextjs-plain text-5xl md:text-7xl' />,
  },
  {
    name: 'Tailwind CSS',
    img: <i className='devicon-tailwindcss-original text-5xl md:text-7xl' />,
  },
  {
    name: 'TypeScript',
    img: <i className='devicon-typescript-plain text-5xl md:text-7xl' />,
  },
  {
    name: 'Git',
    img: <i className='devicon-github-original text-5xl md:text-7xl' />,
  },
  {
    name: 'Zustand',
    img: <i className='devicon-zustand-plain text-5xl md:text-7xl' />,
  },
  {
    name: 'React-query',
    img: (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 256 230'
        className='size-13 md:size-[4.7rem] mx-auto'
      >
        <title>React-query-icon SVG Icon</title>
        <path
          fill='currentColor'
          d='M189.647 161.333a3.684 3.684 0 0 1 4.235 2.81l.023.112l.207 1.075c6.71 35.276 1.983 52.915-14.18 52.915c-15.813 0-35.944-15.051-60.392-45.153a3.684 3.684 0 0 1 2.777-6.005h.114l1.288.009c10.288.056 20.289-.303 30.004-1.076c11.467-.913 23.442-2.475 35.924-4.687M78.646 134.667l.062.105l.646 1.127c5.177 9 10.57 17.542 16.18 25.627c6.608 9.52 14.038 19.158 22.29 28.914a3.684 3.684 0 0 1-.309 5.082l-.093.083l-.83.715c-27.307 23.397-45.055 28.068-53.244 14.012c-8.017-13.757-5.11-38.773 8.719-75.047a3.683 3.683 0 0 1 6.579-.618m124.857-52.054l.112.037l1.028.354c33.705 11.725 46.51 24.61 38.416 38.655c-7.916 13.736-30.93 23.738-69.041 30.004a3.683 3.683 0 0 1-3.773-5.501c5.458-9.286 10.375-18.524 14.749-27.717c4.96-10.425 9.615-21.616 13.965-33.57a3.684 3.684 0 0 1 4.432-2.295zM84.446 76.71a3.683 3.683 0 0 1 1.31 5.042c-5.46 9.285-10.376 18.524-14.75 27.717c-4.96 10.425-9.615 21.615-13.965 33.57a3.684 3.684 0 0 1-4.544 2.262l-.112-.037l-1.028-.355c-33.705-11.724-46.51-24.61-38.416-38.654c7.916-13.737 30.93-23.738 69.041-30.004c.85-.14 1.722.022 2.464.459m108.206-57.748c8.017 13.758 5.11 38.774-8.719 75.048a3.683 3.683 0 0 1-6.579.618l-.062-.105l-.646-1.127c-5.177-9-10.57-17.542-16.18-25.627c-6.608-9.52-14.038-19.158-22.29-28.914a3.684 3.684 0 0 1 .309-5.082l.093-.083l.83-.715c27.307-23.397 45.055-28.068 53.244-14.013M77.45 10.59c15.814 0 35.945 15.05 60.392 45.152a3.684 3.684 0 0 1-2.777 6.005h-.114l-1.288-.008c-10.287-.056-20.289.303-30.003 1.076c-11.468.913-23.443 2.475-35.925 4.687a3.684 3.684 0 0 1-4.234-2.81l-.024-.113l-.207-1.074C56.56 28.228 61.286 10.59 77.45 10.59'
        />
        <path
          fill='currentColor'
          d='M111.295 73.67h31.576a12.89 12.89 0 0 1 11.181 6.475l15.855 27.626a12.892 12.892 0 0 1 0 12.834l-15.855 27.626a12.892 12.892 0 0 1-11.181 6.475h-31.576c-4.618 0-8.883-2.47-11.182-6.475L84.26 120.605a12.892 12.892 0 0 1 0-12.834l15.854-27.626a12.892 12.892 0 0 1 11.182-6.475m26.763 8.338c4.62 0 8.888 2.473 11.185 6.481l11.056 19.288a12.892 12.892 0 0 1 0 12.822l-11.056 19.288a12.892 12.892 0 0 1-11.185 6.48h-21.95c-4.62 0-8.888-2.472-11.185-6.48l-11.056-19.288a12.892 12.892 0 0 1 0-12.822l11.056-19.288a12.892 12.892 0 0 1 11.184-6.48zm-5.187 9.12h-11.576a12.892 12.892 0 0 0-11.179 6.47l-5.842 10.167a12.892 12.892 0 0 0 0 12.846l5.842 10.168a12.892 12.892 0 0 0 11.179 6.47h11.576c4.616 0 8.88-2.468 11.179-6.47l5.842-10.168a12.892 12.892 0 0 0 0-12.846l-5.842-10.168a12.892 12.892 0 0 0-11.179-6.47m-4.994 8.729c4.612 0 8.873 2.464 11.173 6.46l.829 1.44a12.892 12.892 0 0 1 0 12.862l-.829 1.44a12.892 12.892 0 0 1-11.173 6.46h-1.588a12.892 12.892 0 0 1-11.173-6.46l-.829-1.44a12.892 12.892 0 0 1 0-12.862l.829-1.44a12.892 12.892 0 0 1 11.173-6.46zm-.792 8.599a5.738 5.738 0 0 0-4.97 2.866a5.729 5.729 0 0 0 0 5.732a5.738 5.738 0 0 0 9.937 0a5.729 5.729 0 0 0 0-5.732a5.736 5.736 0 0 0-4.967-2.866m-46.509 5.732h10.32'
        />
      </svg>
    ),
  },
  {
    name: 'Shadcn/UI',
    img: (
      <svg
        id='Layer_1'
        xmlns='http://www.w3.org/2000/svg'
        version='1.1'
        viewBox='0 0 256 256'
        className='size-13 md:size-[4.7rem] mx-auto'
      >
        <defs>
          <style>{`
      .st0, .st1 {
        fill: none;
      }

      .st1 {
        stroke: currentColor;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-width: 32px;
      }
    `}</style>
        </defs>
        <rect className='st0' />
        <line className='st1' x1='208' y1='128' x2='128' y2='208' />
        <line className='st1' x1='192' y1='40' x2='40' y2='192' />
      </svg>
    ),
  },
  {
    name: 'Framer Motion',
    img: <i className='devicon-framermotion-original text-5xl md:text-7xl' />,
  },
];

interface Props {
  title: string;
}

const TechStack = ({ title }: Props) => {
  return (
    <section id='techStack' className='bg-card border-t border-b border-border'>
      <div className='p-6 md:p-12 max-w-7xl mx-auto space-y-3 md:space-y-6'>
        <ScrollFloat
          animationDuration={1}
          ease='back.inOut(2)'
          scrollStart='center bottom+=40%'
          scrollEnd='bottom bottom-=60%'
          stagger={0.03}
          textClassName='md:text-7xl lg:text-9xl font-semibold'
        >
          {title}
        </ScrollFloat>
        <HoverEffect items={tecnologias} />
      </div>
    </section>
  );
};

export default TechStack;
