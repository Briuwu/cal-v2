import { CharacterState } from "@/types";

export const getCharacter = (
  characterState: CharacterState,
  size: number,
  type?: string,
) => {
  const images = {
    idle: {
      src: "/characters/animations/male_homeless/idle.gif",
      width: 193,
      height: 328,
    },
    running: {
      src: "/characters/animations/male_homeless/run.gif",
      width: 248,
      height: 292,
    },
    walk: {
      src: "/characters/animations/male_homeless/walk.gif",
      width: 181,
      height: 323,
    },
    attack: {
      src: "/characters/animations/male_homeless/attack.gif",
      width: 293,
      height: 295,
    },
    hurt: {
      src: "/characters/animations/male_homeless/hurt.gif",
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
