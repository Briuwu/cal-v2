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

type Props = {
  level: typeof levels.$inferSelect;
  characterType: number;
};

export const Game = ({ level, characterType }: Props) => {
  const [scope, animate] = useAnimate();
  const [isAnimating, setIsAnimating] = useState(false);

  const [lifes, setLifes] = useState(5);
  const [openChest, setOpenChest] = useState(false);
  const [characterState, setCharacterState] = useState<CharacterState>("walk");

  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const isLargeDevice = useMediaQuery("only screen and (min-width : 1024px)");

  useEffect(() => {
    setIsAnimating(true);
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
        className="absolute right-1/2 top-[150px] z-[99] translate-x-1/2 text-xs hover:bg-opacity-50 md:top-[375px] lg:bottom-[170px] lg:top-auto lg:text-base"
        onClick={handleOpenChest}
      >
        Open Chest
      </Button>
      <Rewards />
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