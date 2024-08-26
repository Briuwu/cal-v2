"use client";
import { useMemo, useState, useTransition } from "react";

import { useStopwatch } from "react-timer-hook";
import { Stopwatch } from "./stopwatch";
import { pvpQuestions } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { submitToLeaderboard } from "@/actions/pvp";
import { toast } from "sonner";

type Props = {
  data: (typeof pvpQuestions.$inferSelect)[];
  userId: string;
};

export const PvpGame = ({ data, userId }: Props) => {
  const [isPending, startTransition] = useTransition();
  const { totalSeconds, seconds, minutes, isRunning, start, pause, reset } =
    useStopwatch();
  const [startGame, setStartGame] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState(false);

  const currentQuestion = useMemo(
    () => data[questionIndex],
    [questionIndex, data],
  );

  const handleNextQuestion = (answer: string) => {
    setQuestionIndex((prev) => prev + 1);
    setAnswers((prev) => [...prev, answer]);

    if (questionIndex === data.length - 1) {
      pause();
      setStartGame(false);
      setGameOver(true);
    }
  };

  const handleStartGame = () => {
    reset();
    setStartGame(true);
    start();
  };

  const answeredCorrectly = useMemo(
    () => answers.filter((answer, index) => answer === data[index].answer),
    [answers, data],
  );

  console.log(answeredCorrectly);

  const handleSubmitScore = () => {
    startTransition(async () => {
      await submitToLeaderboard(userId, answeredCorrectly.length, totalSeconds);
      toast.success("Score submitted successfully!");
      reset();
      setAnswers([]);
      setQuestionIndex(0);
      setGameOver(false);
      pause();
    });
  };

  return (
    <div className="text-white">
      <Stopwatch isRunning={isRunning} seconds={seconds} minutes={minutes} />
      <div className="mx-auto grid min-h-screen max-w-[500px] place-content-center">
        {gameOver ? (
          <div className="space-y-3 rounded-md bg-white p-4 text-black">
            <h3 className="text-2xl font-bold uppercase">Game Over!</h3>
            <p>
              Your total time is:{" "}
              <span className="font-bold">{totalSeconds}</span> seconds.
            </p>
            <p>
              Your total score is:{" "}
              <span className="font-bold">
                {answeredCorrectly.length}/{data.length}
              </span>
            </p>
            <div>
              {!isPending ? (
                <Button className="w-full" onClick={handleSubmitScore}>
                  Submit Score
                </Button>
              ) : (
                <Button className="w-full" disabled>
                  Submitting...
                </Button>
              )}
            </div>
          </div>
        ) : (
          <div>
            {!startGame ? (
              <Button onClick={handleStartGame}>Game Start</Button>
            ) : (
              <div className="space-y-10 text-center">
                <h2 className="text-3xl font-bold">
                  {currentQuestion.question}
                </h2>
                <ul className="space-y-5">
                  {currentQuestion.options!.map((option, index) => (
                    <li
                      key={index}
                      className={cn(
                        "cursor-pointer border border-black bg-white p-2 text-black transition hover:scale-105",
                      )}
                      onClick={() => handleNextQuestion(option)}
                    >
                      {option}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
