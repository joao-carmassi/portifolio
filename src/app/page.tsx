import AboutMe from '@/components/aboutMe';
import ContainerContact from '@/components/containerContact';
import ContainerMap from '@/components/containerMap';
import DidYouKnow from '@/components/didYouKnow';
import HeroMain from '@/components/heroMain';
import RepsGraph from '@/components/repsGraph';
import Team05Page from '@/components/documents';

export default function Home() {
  return (
    <main>
      <HeroMain />
      <DidYouKnow />
      <AboutMe />
      <RepsGraph />
      <Team05Page />
      <ContainerContact />
      <ContainerMap />
    </main>
  );
}
