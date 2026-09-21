import { quemSouEu } from './quem-sou-eu';
import { daIdeiaAoDeploy } from './da-ideia-ao-deploy';

// a tuple, not AboutVideo[]: each entry is typed to its own locale slice, and
// widening to the union would lose the link between a video and its script
export const videos = [quemSouEu, daIdeiaAoDeploy] as const;
