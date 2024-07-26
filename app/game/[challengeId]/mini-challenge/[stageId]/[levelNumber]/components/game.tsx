"use client";
import { useState, useEffect } from "react";
import { useAnimate } from "framer-motion";

import { levels } from "@/db/schema";
import { GameQuestion } from "./game-question";
import { Player } from "@/app/game/[challengeId]/components/player";
import { CharacterState } from "@/types";
import Image from "next/image";
import { nextLevel } from "@/actions/stages";
import { GameOver } from "./game-over";

type Props = {
  level: typeof levels.$inferSelect;
};

export const Game = ({ level }: Props) => {
  const [scope, animate] = useAnimate();

  const [gameOver, setGameOver] = useState(false);
  const [lifes, setLifes] = useState(5);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [characterState, setCharacterState] = useState<CharacterState>("walk");

  const questions = level.questions!;

  useEffect(() => {
    const animateCharacter = async () => {
      await animate("#character", { x: 180 }, { duration: 3 });
      setCharacterState("idle");
      await animate("#gameQuestion", { opacity: 1 }, { duration: 1 });
    };

    animateCharacter();
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

  const handleCorrect = async () => {
    if (questionIdx < level.questions?.length! - 1) {
      setQuestionIdx(questionIdx + 1);
    }

    if (questionIdx === level.questions?.length! - 1) {
      {
        await animate("#gameQuestion", { opacity: 0 }, { duration: 1 });
        await animate("#gameCompleted", { opacity: 1 }, { duration: 1 });
        setCharacterState("running");
        await animate("#character", { x: 1150 }, { duration: 6 });
        await nextLevel(level.stageId, Number(level.levelNumber) + 1);
      }
    }
  };

  return (
    <div ref={scope} className="absolute inset-0 z-20 overflow-hidden p-4">
      <GameOver open={gameOver} handleOpen={setGameOver} />
      <GameQuestion
        data={currentQuestion}
        onCorrect={handleCorrect}
        onWrong={handleWrong}
        answer={currentQuestion.answer}
      />
      <Player characterState={characterState} />
      <div>
        <div className="absolute bottom-4 left-4 flex">
          {lifes > 0 &&
            Array.from({ length: lifes }).map((_, idx) => (
              <Image key={idx} src="/heart.png" alt="" width={50} height={50} />
            ))}
        </div>
        <div className="absolute bottom-4 right-4">
          <span className="text-xl text-white">
            Questions: {questionIdx + 1}/{level.questions?.length}
          </span>
        </div>
      </div>
    </div>
  );
};
