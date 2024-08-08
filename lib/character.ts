import { Characters, CharacterState } from "@/types";

export const getCharacter = (
  characterState: CharacterState,
  size: number,
  type: number,
) => {
  let characterType;
  switch (type) {
    case 1:
      characterType = "male_homeless";
      break;
    case 2:
      characterType = "female_homeless";
      break;
    case 3:
      characterType = "fighter";
      break;
    case 4:
      characterType = "samurai";
      break;
    case 5:
      characterType = "shinobi";
      break;
  }
  const images: Record<
    CharacterState,
    { src: string; width: number; height: number }
  > = {
    idle: {
      src: `/characters/animations/${characterType}/idle.gif`,
      width: 193,
      height: 328,
    },
    running: {
      src: `/characters/animations/${characterType}/run.gif`,
      width: 248,
      height: 292,
    },
    walk: {
      src: `/characters/animations/${characterType}/walk.gif`,
      width: 181,
      height: 323,
    },
    attack: {
      src: `/characters/animations/${characterType}/attack.gif`,
      width: 293,
      height: 295,
    },
    hurt: {
      src: `/characters/animations/${characterType}/hurt.gif`,
      width: 226,
      height: 287,
    },
    "attack-2": {
      src: `/characters/animations/${characterType}/attack-2.gif`,
      width: 358,
      height: 342,
    },
  };

  const src = images[characterState].src;
  const width = images[characterState].width / size;
  const height = images[characterState].height / size;

  return {
    src,
    width,
    height,
  };
};
