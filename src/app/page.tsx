import AboutMe from '@/components/aboutMe';
import ContainerContact from '@/components/containerContact';
import ContainerMap from '@/components/containerMap';
import DidYouKnow from '@/components/didYouKnow';
import HeroMain from '@/components/heroMain';
import RepsGraph from '@/components/repsGraph';

export default function Home() {
  return (
    <main>
      <HeroMain />
      <DidYouKnow />
      <AboutMe />
      <RepsGraph />
      <ContainerContact />
      <ContainerMap />
    </main>
  );
}
