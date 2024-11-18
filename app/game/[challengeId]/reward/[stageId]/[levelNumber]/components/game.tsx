"use client";
import { useState, useEffect } from "react";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useAnimate } from "framer-motion";

import { levels } from "@/db/schema";
import { Player } from "@/app/game/[challengeId]/components/player";
import { CharacterState } from "@/types";
import Image from "next/image";
import { nextLevel } from "@/actions/stages";
import { Treasure } from "./treasure";
import { Button } from "@/components/ui/button";
import { Rewards } from "./rewards";
import { handleRewardChest } from "@/actions/reward";
import { useGlobalAudioPlayer } from "react-use-audio-player";

type Props = {
  level: typeof levels.$inferSelect;
  characterType: number;
  stageId: number;
};

let rewards = [
  {
    stageId: 1,
    coins: 100,
    level: 3,
  },
  {
    stageId: 2,
    coins: 200,
    level: 5,
  },
  {
    stageId: 3,
    coins: 300,
    level: 5,
    hasCharacter: 5,
  },
  {
    stageId: 4,
    coins: 800,
    level: 5,
  },
  {
    stageId: 5,
    coins: 1500,
    level: 10,
    hasCharacter: 4,
  },
];

const audioBg = {
  1: "/audio/stage-1.mp3",
  2: "/audio/stage-2.mp3",
  3: "/audio/stage-3.mp3",
  4: "/audio/stage-4.mp3",
  5: "/audio/stage-5.mp3",
};

export const Game = ({ level, characterType, stageId }: Props) => {
  const { load } = useGlobalAudioPlayer();
  const [scope, animate] = useAnimate();
  const [isAnimating, setIsAnimating] = useState(false);

  const [lifes, setLifes] = useState(5);
  const [openChest, setOpenChest] = useState(false);
  const [characterState, setCharacterState] = useState<CharacterState>("walk");

  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const isLargeDevice = useMediaQuery("only screen and (min-width : 1024px)");

  const currentReward = rewards.find(
    (reward) => reward.stageId === Number(level.stageId),
  );

  console.log(currentReward);

  useEffect(() => {
    setIsAnimating(true);

    load(audioBg[stageId as keyof typeof audioBg], {
      loop: true,
      autoplay: true,
    });

    const animateCharacter = async () => {
      await animate(
        "#character",
        { x: isLargeDevice ? 200 : 90 },
        { duration: 3 },
      );
      setCharacterState("idle");
    };

    animateCharacter();
    setIsAnimating(false);
  }, []);

  let characterXPos = isSmallDevice ? 200 : isLargeDevice ? 500 : 375;
  const handleOpenChest = async () => {
    setOpenChest(true);
    setIsAnimating(true);
    await animate("#openBtn", { opacity: 0 }, { duration: 1 });
    setCharacterState("walk");
    await animate("#character", { x: characterXPos }, { duration: 2 });
    setCharacterState("idle");
    await animate("#chest", { opacity: 0 }, { duration: 1 });
    await animate("#animatedChest", { opacity: 1 }, { duration: 1 });
    await animate("#rewards", { opacity: 1 }, { duration: 1 });
    setCharacterState("running");
    let characterPosition = isSmallDevice ? 700 : isLargeDevice ? 1250 : 750;
    await animate("#character", { x: characterPosition }, { duration: 4 });
    await handleRewardChest(
      currentReward?.coins!,
      currentReward?.level!,
      currentReward?.hasCharacter,
    );
    await nextLevel(
      Number(level.stageId) + 1,
      Number(level.levelNumber) + 1,
      true,
    );

    setIsAnimating(false);
  };

  return (
    <div
      ref={scope}
      className="z-20 overflow-hidden lg:absolute lg:inset-0 lg:p-4"
    >
      <Player characterState={characterState} characterType={characterType} />
      <Treasure />
      <Button
        disabled={isAnimating}
        id="openBtn"
        className="absolute right-1/2 top-[100px] z-[99] translate-x-1/2 text-xs hover:bg-opacity-50 md:top-[375px] lg:bottom-[190px] lg:top-auto lg:text-base"
        onClick={handleOpenChest}
      >
        Open Chest
      </Button>
      <Rewards reward={currentReward!} />
      <div>
        <div className="bottom-4 left-4 flex lg:absolute">
          {lifes > 0 &&
            Array.from({ length: lifes }).map((_, idx) => (
              <Image key={idx} src="/heart.png" alt="" width={50} height={50} />
            ))}
        </div>
      </div>
    </div>
  );
};
