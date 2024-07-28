"use client";
import { useState, useEffect } from "react";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useAnimate } from "framer-motion";

import { levels } from "@/db/schema";
import { GameQuestion } from "./game-question";
import { Player } from "@/app/game/[challengeId]/components/player";
import { BossState, CharacterState } from "@/types";
import Image from "next/image";
import { nextLevel } from "@/actions/stages";
import { GameOver } from "./game-over";
import { Boss } from "./boss";

type Props = {
  level: typeof levels.$inferSelect;
};

export const Game = ({ level }: Props) => {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const isMediumDevice = useMediaQuery(
    "only screen and (min-width : 769px) and (max-width : 992px)",
  );
  const isLargeDevice = useMediaQuery("only screen and (min-width : 1024px)");

  let x = isSmallDevice ? 450 : isMediumDevice ? 600 : 1150;
  let duration = isSmallDevice ? 5 : isMediumDevice ? 7 : 10;

  const [scope, animate] = useAnimate();
  const [isAnimating, setIsAnimating] = useState(false);

  const [gameOver, setGameOver] = useState(false);
  const [lifes, setLifes] = useState(5);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [characterState, setCharacterState] = useState<CharacterState>("walk");
  const [bossState, setBossState] = useState<BossState>("idle");

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

  const handleWrong = () => {
    if (lifes > 0) {
      setLifes(lifes - 1);
    }

    if (lifes === 1) {
      setGameOver(true);
    }
  };

  let xAttack = isSmallDevice ? 300 : isMediumDevice ? 500 : 800;
  let durationAttack = isSmallDevice ? 2 : 3.5;

  let xOriginal = isSmallDevice ? 80 : 160;
  const handleCorrect = async () => {
    setIsAnimating(true);
    if (questionIdx < level.questions?.length! - 1) {
      setCharacterState("running");
      await animate("#character", { x: xAttack }, { duration: durationAttack });
      setCharacterState("attack");
      setBossState("hurt");
      await animate("#character", { scaleX: -1 }, { duration: 0.5 });
      setCharacterState("running");
      setBossState("idle");
      await animate(
        "#character",
        { x: xOriginal },
        { duration: durationAttack },
      );
      setCharacterState("idle");
      await animate("#character", { scaleX: 1 }, { duration: 0.5 });
      setQuestionIdx(questionIdx + 1);
    }

    if (questionIdx === level.questions?.length! - 1) {
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
      <Player characterState={characterState} />
      <Boss bossState={bossState} />
      <div>
        <div className="bottom-4 left-4 flex lg:absolute">
          {lifes > 0 &&
            Array.from({ length: lifes }).map((_, idx) => (
              <Image key={idx} src="/heart.png" alt="" width={50} height={50} />
            ))}
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
