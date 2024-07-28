import { BossState } from "@/types";

export const getBoss = (bossState: BossState, size: number) => {
  const images = {
    idle: {
      src: "/boss/centipede/idle.gif",
      width: 158,
      height: 120,
    },
    hurt: {
      src: "/boss/centipede/hurt.gif",
      width: 156,
      height: 117,
    },
    death: {
      src: "/boss/centipede/death.gif",
      width: 202,
      height: 117,
    },
    attack: {
      src: "/boss/centipede/attack.gif",
      width: 218,
      height: 143,
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
