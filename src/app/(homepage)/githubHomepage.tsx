import { Button } from '@/components/ui/button';
import { BookOpen, Code, Github, Laptop, Layers } from 'lucide-react';
import { H2 } from '../../components/ui/h2';
import { P } from '@/components/ui/p';
import { H3 } from '@/components/ui/h3';

const GithubHomepage = () => {
  return (
    <section id='githubHomepage' className='shadow-md'>
      <div className='mx-auto max-w-7xl p-6 md:p-12 space-y-6 md:space-y-12'>
        <div className='space-y-1.5 md:space-y-3'>
          <H2 className='text-center md:text-start'>Github</H2>
          <P className='text-center md:text-start'>
            Explore my study and professional projects on GitHub.
          </P>
        </div>
        <div className='grid sm:grid-cols-2 md:grid-cols-5 lg:grid-cols-3 gap-6'>
          {/* Card 1 */}
          <div className='bg-muted rounded-xl p-3 md:p-6 col-span-1 md:col-span-2 lg:col-span-1 md:shadow-lg flex flex-col gap-3 md:gap-6'>
            {/* Media 1 Mobile */}
            <div className='md:hidden aspect-video w-full bg-background rounded-xl mb-3'>
              <img
                className='object-cover h-full w-full rounded-xl'
                src='./imgs/github-profile-img.png'
                alt=''
              />
            </div>
            <H3>Work</H3>
            <ul className='space-y-4'>
              <li>
                <div className='flex items-start gap-3'>
                  <Laptop className='shrink-0' />
                  <p className='-mt-0.5'>
                    Build interactive UIs using React and Tailwind—efficient,
                    reusable, and responsive.
                  </p>
                </div>
              </li>
              <li>
                <div className='flex items-start gap-3'>
                  <Code className='shrink-0' />
                  <p className='-mt-0.5'>
                    Explore projects ranging from dashboards to dynamic web
                    apps—practical examples of my work.
                  </p>
                </div>
              </li>
              <li>
                <div className='flex items-start gap-3'>
                  <Layers className='shrink-0' />
                  <p className='-mt-0.5'>
                    Organize components and layouts efficiently—showcasing
                    structured and scalable designs.
                  </p>
                </div>
              </li>
            </ul>
            <Button
              effect={'expandIcon'}
              icon={Github}
              iconPlacement='right'
              className='w-full mt-auto'
              asChild
            >
              <a target='_blank' href='https://github.com/joao-carmassi'>
                See more
              </a>
            </Button>
          </div>
          {/* Media 1 Desktop */}
          <div className='hidden md:block bg-muted rounded-xl col-span-1 md:col-span-3 lg:col-span-2'>
            <img
              className='object-cover h-full w-full rounded-xl'
              src='./imgs/github-profile-img.png'
              alt=''
            />
          </div>
          {/* Media 2 Desktop */}
          <div className='hidden md:block bg-muted rounded-xl col-span-1 md:col-span-3 lg:col-span-2 '>
            <img
              className='object-cover h-full w-full rounded-xl'
              src='./imgs/github-organization-img.png'
              alt=''
            />
          </div>
          {/* Card 2 */}
          <div className='bg-muted rounded-xl p-3 md:p-6 col-span-1 md:col-span-2 lg:col-span-1 md:shadow-lg flex flex-col gap-3 md:gap-6'>
            {/* Media 2 Mobile */}
            <div className='md:hidden aspect-video w-full bg-background rounded-xl mb-3'>
              <img
                className='object-cover h-full w-full rounded-xl'
                src='./imgs/github-organization-img.png'
                alt=''
              />
            </div>
            <H3>Study</H3>
            <ul className='space-y-4'>
              <li>
                <div className='flex items-start gap-3'>
                  <BookOpen className='shrink-0' />
                  <p className='-mt-0.5'>
                    Explore a variety of projects—from HTML and CSS basics to
                    Vue and React apps.
                  </p>
                </div>
              </li>
              <li>
                <div className='flex items-start gap-3'>
                  <Layers className='shrink-0' />
                  <p className='-mt-0.5'>
                    Experiment with different frameworks and
                    languages—TypeScript, Vue, React and more.
                  </p>
                </div>
              </li>
              <li>
                <div className='flex items-start gap-3'>
                  <Code className='shrink-0' />
                  <p className='-mt-0.5'>
                    Build small, practical projects to sharpen your skills and
                    explore new technologies.
                  </p>
                </div>
              </li>
            </ul>
            <Button
              effect={'expandIcon'}
              icon={Github}
              iconPlacement='right'
              className='w-full mt-auto'
              asChild
            >
              <a
                target='_blank'
                href='https://github.com/joao-carmassi-studies'
              >
                See more
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GithubHomepage;
