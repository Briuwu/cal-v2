"use client";
import { useMemo, useState, useTransition, useEffect } from "react";

import { useStopwatch } from "react-timer-hook";
import { Stopwatch } from "./stopwatch";
import { pvpQuestions } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { submitToLeaderboard } from "@/actions/pvp";
import { toast } from "sonner";
import { socket } from "@/lib/socket";

type Props = {
  data: (typeof pvpQuestions.$inferSelect)[];
  userId: string;
};

export const PvpGame = ({ data, userId }: Props) => {
  const [player1, setPlayer1] = useState(false);
  const [choices, setChoices] = useState({
    p1: "",
    p2: "",
  });
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [isJoining, setIsJoining] = useState(false);
  const [joined, setJoined] = useState(false);
  const [roomUniqueId, setRoomUniqueId] = useState("");
  const [isPending, startTransition] = useTransition();
  // const { totalSeconds, seconds, minutes, isRunning, start, pause, reset } =
  //   useStopwatch();
  const [startGame, setStartGame] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState(false);

  const currentQuestion = useMemo(
    () => data[questionIndex],
    [questionIndex, data],
  );

  useEffect(() => {
    function handleConnect() {
      setIsConnected(true);
    }

    function handleDisconnect() {
      setIsConnected(false);
    }

    function handlePlayersConnected() {
      setJoined(true);
    }

    socket.on("connection", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("newGame", (data) => {
      setRoomUniqueId(data.roomUniqueId);
    });
    socket.on("playersConnected", handlePlayersConnected);

    return () => {
      socket.off("connection", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("newGame");
      socket.off("playersConnected", handlePlayersConnected);
    };
  }, [socket]);

  const handleNextQuestion = () => {
    setQuestionIndex((prev) => prev + 1);

    if (questionIndex === data.length - 1) {
      setStartGame(false);
      setGameOver(true);
    }
  };

  useEffect(() => {
    function handleP1Choice(data: { value: string }) {
      setChoices((prev) => ({ ...prev, p1: data.value }));
      socket.emit("nextQuestion", {
        value: data.value,
        roomUniqueId: roomUniqueId,
      });
    }

    function handleP2Choice(data: { value: string }) {
      setChoices((prev) => ({ ...prev, p2: data.value }));
      socket.emit("nextQuestion", {
        value: data.value,
        roomUniqueId: roomUniqueId,
      });
    }

    socket.on("p1Choice", handleP1Choice);
    socket.on("p2Choice", handleP2Choice);

    return () => {
      socket.off("p1Choice", handleP1Choice);
      socket.off("p2Choice", handleP2Choice);
    };
  }, [socket.on]);

  const handleStartGame = () => {
    // reset();
    setStartGame(true);
    // start();
    setPlayer1(true);
    socket.emit("createGame");
  };

  const joinGame = () => {
    setJoined(true);
    socket.emit("joinGame", { roomUniqueId: roomUniqueId });
    setStartGame(true);
  };

  const answeredCorrectly = useMemo(
    () => answers.filter((answer, index) => answer === data[index].answer),
    [answers, data],
  );

  const handleSubmitScore = () => {
    startTransition(async () => {
      await submitToLeaderboard(userId, answeredCorrectly.length);
      toast.success("Score submitted successfully!");
      setAnswers([]);
      setQuestionIndex(0);
      setGameOver(false);
    });
  };

  const sendChoice = (choice: string) => {
    const choiceEvent = player1 ? "p1Choice" : "p2Choice";
    socket.emit(choiceEvent, {
      value: choice,
      roomUniqueId: roomUniqueId,
    });
  };

  return (
    <div className="text-white">
      <div className="mx-auto grid min-h-screen max-w-[500px] place-content-center">
        {gameOver ? (
          <div className="space-y-3 rounded-md bg-white p-4 text-black">
            <h3 className="text-2xl font-bold uppercase">Game Over!</h3>
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
              <div className="flex flex-wrap items-center gap-2">
                <Button onClick={handleStartGame}>Game Start</Button>
                <Button onClick={() => setIsJoining(true)}>Join Game</Button>
                {isJoining && (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter Room Code"
                      className="border border-black p-2 text-black"
                      value={roomUniqueId}
                      onChange={(e) => setRoomUniqueId(e.target.value)}
                    />
                    <Button onClick={joinGame}>Join</Button>
                  </div>
                )}
              </div>
            ) : !joined ? (
              <div>
                <p>
                  Waiting for other players to join using the code:{" "}
                  {roomUniqueId}
                </p>
              </div>
            ) : (
              <div className="space-y-10 text-center">
                {choices.p1 && (
                  <div className="text-2xl font-bold">
                    Player 1 has made a choice
                  </div>
                )}
                {choices.p2 && (
                  <div className="text-2xl font-bold">
                    Player 2 has made a choice
                  </div>
                )}
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
                      onClick={() => sendChoice(option)}
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
