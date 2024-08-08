import { BossState } from "@/types";

export const getBoss = (
  bossState: BossState,
  size: number,
  bossName: string,
) => {
  const boss = bossName.toLowerCase();
  const images = {
    idle: {
      src: `/boss/${boss}/idle.gif`,
      width: 332,
      height: 247,
    },
    hurt: {
      src: `/boss/${boss}/hurt.gif`,
      width: 299,
      height: 239,
    },
    death: {
      src: `/boss/${boss}/death.gif`,
      width: 392,
      height: 240,
    },
    attack: {
      src: `/boss/${boss}/attack.gif`,
      width: 426,
      height: 276,
    },
    walk: {
      src: `/boss/${boss}/walk.gif`,
      width: 332,
      height: 247,
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
