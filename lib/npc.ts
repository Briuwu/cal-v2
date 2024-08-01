import { NPCState } from "@/types";

export const getNPC = (NPCState: NPCState, size: number, stage: number) => {
  let stageName;

  switch (stage) {
    case 1:
      stageName = "stage-1";
      break;
    case 2:
      stageName = "stage-2";
      break;
    case 3:
      stageName = "stage-3";
      break;
    case 4:
      stageName = "stage-4";
      break;
    case 5:
      stageName = "stage-5";
      break;
    default:
      stageName = "stage-1";
      break;
  }

  const images: Record<
    NPCState,
    { src: string; width: number; height: number }
  > = {
    idle: {
      src: `/npc/${stageName}/idle.gif`,
      width: 171,
      height: 308,
    },
    dialogue: {
      src: `/npc/${stageName}/dialogue.gif`,
      width: 263,
      height: 306,
    },
  };

  const src = images[NPCState].src;
  const width = images[NPCState].width / size;
  const height = images[NPCState].height / size;

  return {
    src,
    width,
    height,
  };
};
