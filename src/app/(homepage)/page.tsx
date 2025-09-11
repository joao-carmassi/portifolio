import AboutMeHomepage from './aboutMeHomepage';
import DidYouKnowHomepage from './didYouKnowHomepage';
import HeroHomepage from './heroHomepage';
import ContactMeHomepage from './contactMeHomepage';
import DocumentosHomepage from '@/app/(homepage)/documentsHomepage';
import TechStack from '@/components/techStack';
import GithubHomepage from '@/app/(homepage)/githubHomepage';

export default function Home() {
  return (
    <main>
      <HeroHomepage />
      <DidYouKnowHomepage />
      <AboutMeHomepage />
      <section className='bg-background'>
        <DocumentosHomepage />
      </section>
      <TechStack />
      <GithubHomepage />
      <ContactMeHomepage />
    </main>
  );
}
