import { IMessage } from '@/types/message';
import AboutMeHomepage from './aboutMeHomepage';
import ContactMeHomepage from './contactMeHomepage';
import DidYouKnowHomepage from './didYouKnowHomepage';
import DocumentosHomepage from './documentsHomepage';
import GithubHomepage from './githubHomepage';
import HeroHomepage from './heroHomepage';
import TechStack from './techStack';
import {
  getMessages as getMessagesIntl,
  setRequestLocale,
} from 'next-intl/server';

interface Props {
  params: Promise<{ locale: string }>;
}

export default async function Home({ params }: Props) {
  const { locale } = await params;

  setRequestLocale(locale);

  const messages = (await getMessagesIntl()) as IMessage;

  return (
    <main>
      <HeroHomepage {...messages.homepage.hero} />
      <DidYouKnowHomepage {...messages.homepage.didYouKnow} />
      <AboutMeHomepage {...messages.homepage.aboutMe} />
      <section className='bg-background'>
        <DocumentosHomepage {...messages.homepage.documentos} />
      </section>
      <TechStack {...messages.homepage.techStack} />
      <GithubHomepage {...messages.homepage.github} />
      <ContactMeHomepage {...messages.homepage.contactMe} />
    </main>
  );
}
