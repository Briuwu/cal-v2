import { BossState } from "@/types";

import { StaticImageData } from "next/image";

import bloatedAtk from "@/public/boss/bloated/attack.gif";
import bloatedDeath from "@/public/boss/bloated/death.gif";
import bloatedHurt from "@/public/boss/bloated/hurt.gif";
import bloatedIdle from "@/public/boss/bloated/idle.gif";
import bloatedWalk from "@/public/boss/bloated/walk.gif";

import centipedeAtk from "@/public/boss/centipede/attack.gif";
import centipedeDeath from "@/public/boss/centipede/death.gif";
import centipedeHurt from "@/public/boss/centipede/hurt.gif";
import centipedeIdle from "@/public/boss/centipede/idle.gif";
import centipedeWalk from "@/public/boss/centipede/walk.gif";

import turtleAtk from "@/public/boss/turtle/attack.gif";
import turtleDeath from "@/public/boss/turtle/death.gif";
import turtleHurt from "@/public/boss/turtle/hurt.gif";
import turtleIdle from "@/public/boss/turtle/idle.gif";
import turtleWalk from "@/public/boss/turtle/walk.gif";

import twoheadAtk from "@/public/boss/twohead/attack.gif";
import twoheadDeath from "@/public/boss/twohead/death.gif";
import twoheadHurt from "@/public/boss/twohead/hurt.gif";
import twoheadIdle from "@/public/boss/twohead/idle.gif";
import twoheadWalk from "@/public/boss/twohead/walk.gif";

export const getBoss = (
  bossState: BossState,
  size: number,
  bossName: string,
) => {
  let idle_width,
    idle_height,
    hurt_width,
    hurt_height,
    death_width,
    death_height,
    attack_width,
    attack_height,
    walk_width,
    walk_height,
    idleSrc,
    hurtSrc,
    deathSrc,
    attackSrc,
    walkSrc;

  const boss = bossName.toLowerCase();

  switch (boss) {
    case "bloated":
      attack_width = 324;
      attack_height = 325;
      death_width = 314;
      death_height = 319;
      hurt_width = 289;
      hurt_height = 310;
      idle_width = 301;
      idle_height = 328;
      walk_width = 313;
      walk_height = 322;

      idleSrc = bloatedIdle;
      hurtSrc = bloatedHurt;
      deathSrc = bloatedDeath;
      attackSrc = bloatedAtk;
      walkSrc = bloatedWalk;

      break;
    case "centipede":
      attack_width = 426;
      attack_height = 276;
      death_width = 392;
      death_height = 240;
      hurt_width = 299;
      hurt_height = 239;
      idle_width = 332;
      idle_height = 247;
      walk_width = 332;
      walk_height = 247;

      idleSrc = centipedeIdle;
      hurtSrc = centipedeHurt;
      deathSrc = centipedeDeath;
      attackSrc = centipedeAtk;
      walkSrc = centipedeWalk;

      break;
    case "turtle":
      attack_width = 423;
      attack_height = 254;
      death_width = 424;
      death_height = 267;
      hurt_width = 370;
      hurt_height = 250;
      idle_width = 393;
      idle_height = 249;
      walk_width = 396;
      walk_height = 271;

      idleSrc = turtleIdle;
      hurtSrc = turtleHurt;
      deathSrc = turtleDeath;
      attackSrc = turtleAtk;
      walkSrc = turtleWalk;

      break;
    case "twohead":
      attack_width = 574;
      attack_height = 291;
      death_width = 450;
      death_height = 279;
      hurt_width = 403;
      hurt_height = 291;
      idle_width = 410;
      idle_height = 291;
      walk_width = 437;
      walk_height = 278;

      idleSrc = twoheadIdle;
      hurtSrc = twoheadHurt;
      deathSrc = twoheadDeath;
      attackSrc = twoheadAtk;
      walkSrc = twoheadWalk;

      break;
  }
  const images = {
    idle: {
      src: idleSrc,
      width: idle_width ?? 0,
      height: idle_height ?? 0,
    },
    hurt: {
      src: hurtSrc,
      width: hurt_width ?? 0,
      height: hurt_height ?? 0,
    },
    death: {
      src: deathSrc,
      width: death_width ?? 0,
      height: death_height ?? 0,
    },
    attack: {
      src: attackSrc,
      width: attack_width ?? 0,
      height: attack_height ?? 0,
    },
    walk: {
      src: walkSrc,
      width: walk_width ?? 0,
      height: walk_height ?? 0,
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
