"use client";
import { useState, useEffect } from "react";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useAnimate } from "framer-motion";
import Image from "next/image";

import { levels } from "@/db/schema";
import { BossState, CharacterState } from "@/types";
import { nextLevel } from "@/actions/stages";

import { GameQuestion } from "@/app/game/[challengeId]/components/game-question";
import { Player } from "@/app/game/[challengeId]/components/player";
import { GameOver } from "@/app/game/[challengeId]/components/game-over";
import { Boss } from "./boss";
import { sleep } from "@/lib/utils";

type Props = {
  level: typeof levels.$inferSelect;
  characterType: number;
  coins: number;
};

export const Game = ({ level, characterType, coins }: Props) => {
  const [scope, animate] = useAnimate();
  const [isAnimating, setIsAnimating] = useState(false);

  const [gameOver, setGameOver] = useState(false);
  const [lifes, setLifes] = useState(5);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [characterState, setCharacterState] = useState<CharacterState>("walk");
  const [bossState, setBossState] = useState<BossState>("idle");

  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const isMediumDevice = useMediaQuery(
    "only screen and (min-width : 769px) and (max-width : 992px)",
  );
  const isLargeDevice = useMediaQuery("only screen and (min-width : 1024px)");

  const questions = level.questions!;

  useEffect(() => {
    setIsAnimating(true);
    const animateCharacter = async () => {
      setBossState("idle");
      await animate(
        "#character",
        { x: isLargeDevice ? 200 : 90 },
        { duration: 3 },
      );
      setCharacterState("idle");
      await animate("#gameQuestion", { opacity: 1 }, { duration: 1 });
    };

    animateCharacter();
    setIsAnimating(false);
  }, []);

  let currentQuestion = questions[questionIdx];

  const handleWrong = async () => {
    setIsAnimating(true);
    let xBossPosition = isSmallDevice ? 225 : isMediumDevice ? 400 : 600;
    let xBossOriginal = isSmallDevice ? 20 : 40;
    await animate("#boss", { x: -xBossPosition }, { duration: 3 });
    setBossState("attack");
    setCharacterState("hurt");
    await sleep(1000);
    await animate("#boss", { scaleX: -1 }, { duration: 0.5 });
    setCharacterState("idle");
    setBossState("idle");
    await animate("#boss", { x: -xBossOriginal }, { duration: 3 });
    await animate("#boss", { scaleX: 1 }, { duration: 0.5 });

    if (lifes > 0) {
      setLifes(lifes - 1);
    }

    if (lifes === 1) {
      setGameOver(true);
    }
    setIsAnimating(false);
  };

  const handleCorrect = async () => {
    setIsAnimating(true);
    setCharacterState("running");
    let xCharacterPosition = isSmallDevice ? 300 : isMediumDevice ? 500 : 800;
    let xCharacterOriginal = isSmallDevice ? 80 : 160;
    await animate("#character", { x: xCharacterPosition }, { duration: 2.5 });
    setCharacterState("attack");
    setBossState("hurt");
    await sleep(1000);
    await animate("#character", { scaleX: -1 }, { duration: 0.5 });
    setCharacterState("running");
    setBossState("idle");
    await animate("#character", { x: xCharacterOriginal }, { duration: 2.5 });
    setCharacterState("idle");
    await animate("#character", { scaleX: 1 }, { duration: 0.5 });

    if (questionIdx < level.questions?.length! - 1) {
      setQuestionIdx(questionIdx + 1);
    }

    if (questionIdx === level.questions?.length! - 1) {
      let x = isSmallDevice ? 450 : isMediumDevice ? 600 : 1150;
      let duration = isSmallDevice ? 5 : isMediumDevice ? 7 : 8;
      setBossState("death");
      await animate("#gameQuestion", { opacity: 0 }, { duration: 1 });
      await animate("#gameCompleted", { opacity: 1 }, { duration: 1 });
      setCharacterState("running");
      await animate("#character", { x }, { duration });
      await nextLevel(level.stageId, Number(level.levelNumber) + 1);
    }
    setIsAnimating(false);
  };

  return (
    <div
      ref={scope}
      className="z-20 overflow-hidden lg:absolute lg:inset-0 lg:p-4"
    >
      <GameOver open={gameOver} handleOpen={setGameOver} />
      <GameQuestion
        data={currentQuestion}
        onCorrect={handleCorrect}
        onWrong={handleWrong}
        answer={currentQuestion.answer}
        isAnimating={isAnimating}
      />
      <Player characterState={characterState} characterType={characterType} />
      <Boss bossState={bossState} />
      <div>
        <div className="bottom-4 left-4 lg:absolute">
          <div className="flex items-center">
            {lifes > 0 &&
              Array.from({ length: lifes }).map((_, idx) => (
                <Image
                  key={idx}
                  src="/heart.png"
                  alt=""
                  width={50}
                  height={50}
                  className="w-10"
                />
              ))}
          </div>
          <div className="flex items-center gap-2">
            <Image
              src="/coins.png"
              alt=""
              width={43}
              height={43}
              className="w-10"
            />
            <span className="text-xl text-white">{coins}</span>
          </div>
        </div>
        <div className="bottom-4 right-4 lg:absolute">
          <span className="text-xl text-white">
            Questions: {questionIdx + 1}/{level.questions?.length}
          </span>
        </div>
      </div>
    </div>
  );
};
