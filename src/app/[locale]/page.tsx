import AboutMeHomepage from './aboutMeHomepage';
import DidYouKnowHomepage from './didYouKnowHomepage';
import HeroHomepage from './heroHomepage';
import ContactMeHomepage from './contactMeHomepage';
import DocumentosHomepage from '@/app/[locale]/documentsHomepage';
import TechStack from '@/app/[locale]/techStack';
import GithubHomepage from './githubHomepage';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  return (
    <main>
      <HeroHomepage locale={locale} />
      <DidYouKnowHomepage />
      <AboutMeHomepage locale={locale} />
      <section className='bg-background'>
        <DocumentosHomepage locale={locale} />
      </section>
      <TechStack locale={locale} />
      {/* <GithubHomepage locale={locale} /> */}
      <ContactMeHomepage />
    </main>
  );
}
