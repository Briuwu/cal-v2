"use client";
import { useState, useEffect } from "react";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useAnimate } from "framer-motion";

import { levels } from "@/db/schema";
import { GameQuestion } from "@/app/game/[challengeId]/components/game-question";
import { Player } from "@/app/game/[challengeId]/components/player";
import { CharacterState } from "@/types";
import Image from "next/image";
import { nextLevel } from "@/actions/stages";
import { GameOver } from "@/app/game/[challengeId]/components/game-over";
import { useAudioPlayer, useGlobalAudioPlayer } from "react-use-audio-player";

type Props = {
  level: typeof levels.$inferSelect;
  characterType: number;
  coins: number;
  stageId: number;
};

const audioBg = {
  1: "/audio/stage-1.mp3",
  2: "/audio/stage-2.mp3",
  3: "/audio/stage-3.mp3",
  4: "/audio/stage-4.mp3",
  5: "/audio/stage-5.mp3",
};

export const Game = ({ level, characterType, coins, stageId }: Props) => {
  const { load } = useGlobalAudioPlayer();
  const [scope, animate] = useAnimate();
  const [isAnimating, setIsAnimating] = useState(false);

  const [gameOver, setGameOver] = useState(false);
  const [lifes, setLifes] = useState(5);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [characterState, setCharacterState] = useState<CharacterState>("walk");

  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const isLargeDevice = useMediaQuery("only screen and (min-width : 1024px)");

  const questions = level.questions!;

  useEffect(() => {
    setIsAnimating(true);

    // added audio background
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

  let xPosition = Array.from({ length: questions.length }).reduce(
    (acc: number[], _, idx) => {
      const incrementValue = isSmallDevice ? 100 : 250;
      if (idx === 0) {
        acc.push(incrementValue + 50);
      } else {
        acc.push(acc[idx - 1] + incrementValue - 25);
      }

      return acc;
    },
    [] as number[],
  );

  const handleCorrect = async () => {
    setIsAnimating(true);
    setCharacterState("walk");
    await animate("#character", { x: xPosition[questionIdx] }, { duration: 2 });
    setCharacterState("idle");

    if (questionIdx < level.questions?.length! - 1) {
      setQuestionIdx(questionIdx + 1);
    }

    if (questionIdx === level.questions?.length! - 1) {
      {
        await animate("#gameQuestion", { opacity: 0 }, { duration: 1 });
        await animate("#gameCompleted", { opacity: 1 }, { duration: 1 });
        await nextLevel(level.stageId, Number(level.levelNumber) + 1);
      }
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
