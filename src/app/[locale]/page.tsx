import AboutMeHomepage from './aboutMeHomepage';
import DidYouKnowHomepage from './didYouKnowHomepage';
import HeroHomepage from './heroHomepage';
import ContactMeHomepage from './contactMeHomepage';
import DocumentosHomepage from '@/app/[locale]/documentsHomepage';
import TechStack from '@/components/techStack';
import GithubHomepage from '@/app/[locale]/githubHomepage';

export const locales = [
  { locale: 'en', name: 'English' },
  { locale: 'pt', name: 'Portugues' },
  { locale: 'es', name: 'Español' },
];

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
