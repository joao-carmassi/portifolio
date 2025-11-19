import AboutMeHomepage from './aboutMeHomepage';
import DidYouKnowHomepage from './didYouKnowHomepage';
import ContactMeHomepage from './contactMeHomepage';
import DocumentosHomepage from '@/app/[locale]/documentsHomepage';
import TechStack from '@/app/[locale]/techStack';
import GithubHomepage from './githubHomepage';
import HeroHomepage from './heroHomepage';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <main>
      <HeroHomepage />
      <DidYouKnowHomepage />
      <AboutMeHomepage locale={locale} />
      <section className='bg-background'>
        <DocumentosHomepage locale={locale} />
      </section>
      <TechStack locale={locale} />
      <GithubHomepage locale={locale} />
      <ContactMeHomepage />
    </main>
  );
}
