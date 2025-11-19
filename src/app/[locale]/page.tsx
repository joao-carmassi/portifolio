import AboutMeHomepage from './aboutMeHomepage';
import DidYouKnowHomepage from './didYouKnowHomepage';
import ContactMeHomepage from './contactMeHomepage';
import DocumentosHomepage from '@/app/[locale]/documentsHomepage';
import TechStack from '@/app/[locale]/techStack';
import GithubHomepage from './githubHomepage';
import HeroHomepage from './heroHomepage';
import { getMessages } from '@/utils/getMessages';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getMessages(locale, 'homepage');
  const { title, text1, text2, button1, button2 } = t('hero');

  return (
    <main>
      <HeroHomepage
        title={title}
        text1={text1}
        text2={text2}
        button1={button1}
        button2={button2}
      />
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
