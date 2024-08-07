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
      height: 242,
    },
    hurt: {
      src: `/boss/${boss}/hurt.gif`,
      width: 296,
      height: 228,
    },
    death: {
      src: `/boss/${boss}/death.gif`,
      width: 406,
      height: 224,
    },
    attack: {
      src: `/boss/${boss}/attack.gif`,
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
