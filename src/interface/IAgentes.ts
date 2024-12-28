export default interface IAgentes {
  uuid: string;
  displayName: string;
  description: string;
  developerName: string;
  displayIcon: string;
  bustPortrait: string;
  fullPortrait: string;
  fullPortraitV2: string;
  killfeedPortrait: string;
  background: string;
  backgroundGradientColors: string[];
  role: {
    uuid: string;
    displayName: string;
    description: string;
    displayIcon: string;
  };
  abilities: {
    ability1: {
      displayName: string;
      description: string;
      slot: string;
      displayIcon: string;
    };
    ability2: {
      displayName: string;
      description: string;
      slot: string;
      displayIcon: string;
    };
    ability3: {
      displayName: string;
      description: string;
      slot: string;
      displayIcon: string;
    };
    ultimate: {
      displayName: string;
      description: string;
      slot: string;
      displayIcon: string;
    };
  };
}
