import { Characters, CharacterState } from "@/types";

export const getCharacter = (
  characterState: CharacterState,
  size: number,
  type: number,
) => {
  const characterType = type === 0 ? "male_homeless" : "female_homeless";
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
