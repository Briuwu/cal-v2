import { BossState } from "@/types";

export const getBoss = (bossState: BossState, size: number) => {
  const images = {
    idle: {
      src: "/boss/centipede/idle.gif",
      width: 332,
      height: 242,
    },
    hurt: {
      src: "/boss/centipede/hurt.gif",
      width: 296,
      height: 228,
    },
    death: {
      src: "/boss/centipede/death.gif",
      width: 406,
      height: 224,
    },
    attack: {
      src: "/boss/centipede/attack.gif",
      width: 429,
      height: 280,
    },
  };

  const src = images[bossState].src;
  const width = images[bossState].width / size;
  const height = images[bossState].height / size;

  return {
    src,
    width,
    height,
  };
};
