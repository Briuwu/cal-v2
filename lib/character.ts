import { Characters, CharacterState } from "@/types";

export const getCharacter = (
  characterState: CharacterState,
  size: number,
  type: number,
) => {
  let characterType,
    idle_width,
    idle_height,
    run_width,
    run_height,
    walk_width,
    walk_height,
    attack_width,
    attack_height,
    hurt_width,
    hurt_height,
    attack_2_width,
    attack_2_height,
    dead_width,
    dead_height;

  switch (type) {
    case 1:
      characterType = "male_homeless";
      attack_width = 293;
      attack_height = 295;
      dead_width = 226;
      dead_height = 287;
      hurt_width = 226;
      hurt_height = 287;
      idle_width = 193;
      idle_height = 328;
      run_width = 248;
      run_height = 292;
      walk_width = 181;
      walk_height = 323;
      break;
    case 2:
      characterType = "female_homeless";
      attack_width = 300;
      attack_height = 274;
      dead_width = 275;
      dead_height = 229;
      hurt_width = 162;
      hurt_height = 262;
      idle_width = 163;
      idle_height = 257;
      run_width = 212;
      run_height = 270;
      walk_width = 158;
      walk_height = 276;
      break;
    case 3:
      characterType = "fighter";
      attack_2_width = 358;
      attack_2_height = 342;
      attack_width = 252;
      attack_height = 347;
      dead_width = 331;
      dead_height = 268;
      hurt_width = 178;
      hurt_height = 302;
      idle_width = 152;
      idle_height = 352;
      run_width = 251;
      run_height = 317;
      walk_width = 159;
      walk_height = 353;
      break;
    case 4:
      characterType = "samurai";
      attack_2_width = 448;
      attack_2_height = 324;
      attack_width = 445;
      attack_height = 317;
      dead_width = 389;
      dead_height = 318;
      hurt_width = 224;
      hurt_height = 342;
      idle_width = 221;
      idle_height = 356;
      run_width = 261;
      run_height = 334;
      walk_width = 241;
      walk_height = 366;
      break;
    case 5:
      characterType = "shinobi";
      attack_2_width = 423;
      attack_height = 332;
      attack_width = 437;
      attack_height = 332;
      dead_width = 361;
      dead_height = 301;
      hurt_width = 168;
      hurt_height = 322;
      idle_width = 171;
      idle_height = 336;
      run_width = 284;
      run_height = 322;
      walk_width = 168;
      walk_height = 335;
      break;
    case 6:
      characterType = "lightning_mage";
      attack_2_width = 485;
      attack_2_height = 290;
      attack_width = 536;
      attack_height = 284;
      dead_width = 248;
      dead_height = 248;
      hurt_width = 147;
      hurt_height = 225;
      idle_width = 149;
      idle_height = 266;
      run_width = 225;
      run_height = 267;
      walk_width = 114;
      walk_height = 274;
      break;
    case 7:
      characterType = "fire_mage";
      attack_2_width = 534;
      attack_2_height = 345;
      attack_width = 374;
      attack_height = 256;
      dead_width = 285;
      dead_height = 247;
      hurt_width = 145;
      hurt_height = 228;
      idle_width = 158;
      idle_height = 282;
      run_width = 221;
      run_height = 278;
      walk_width = 135;
      walk_height = 288;
      break;
  }
  const images: Record<
    CharacterState,
    { src: string; width: number; height: number }
  > = {
    idle: {
      src: `/characters/animations/${characterType}/idle.gif`,
      width: idle_width ?? 0,
      height: idle_height ?? 0,
    },
    running: {
      src: `/characters/animations/${characterType}/run.gif`,
      width: run_width ?? 0,
      height: run_height ?? 0,
    },
    walk: {
      src: `/characters/animations/${characterType}/walk.gif`,
      width: walk_width ?? 0,
      height: walk_height ?? 0,
    },
    attack: {
      src: `/characters/animations/${characterType}/attack.gif`,
      width: attack_width ?? 0,
      height: attack_height ?? 0,
    },
    hurt: {
      src: `/characters/animations/${characterType}/hurt.gif`,
      width: hurt_width ?? 0,
      height: hurt_height ?? 0,
    },
    "attack-2": {
      src: `/characters/animations/${characterType}/attack-2.gif`,
      width: attack_2_width ?? 0,
      height: attack_2_height ?? 0,
    },
    dead: {
      src: `/characters/animations/${characterType}/dead.gif`,
      width: dead_width ?? 0,
      height: dead_height ?? 0,
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
