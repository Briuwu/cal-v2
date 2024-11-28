"use client";
import { useMemo, useState, useTransition, useEffect } from "react";

import { pvpLeaderboard, pvpQuestions } from "@/db/schema";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { submitToLeaderboard } from "@/actions/pvp";
import { toast } from "sonner";
import { socket } from "@/lib/socket";
import Link from "next/link";

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
  const [hasAnswered, setHasAnswered] = useState(false);
  const [playerChoice, setPlayerChoice] = useState("");
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [isJoining, setIsJoining] = useState(false);
  const [joined, setJoined] = useState(false);
  const [roomUniqueId, setRoomUniqueId] = useState("");
  const [isPending, startTransition] = useTransition();
  const [startGame, setStartGame] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [p1Answers, setP1Answers] = useState<string[]>([]);
  const [p2Answers, setP2Answers] = useState<string[]>([]);
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

    function handleNewGame(data: { roomUniqueId: string }) {
      setRoomUniqueId(data.roomUniqueId);
      setPlayer1(true);
    }

    socket.on("connection", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("newGame", handleNewGame);
    socket.on("playersConnected", handlePlayersConnected);

    return () => {
      socket.off("connection", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("newGame", handleNewGame);
      socket.off("playersConnected", handlePlayersConnected);
    };
  }, []);

  useEffect(() => {
    if (questionIndex === data.length) {
      setGameOver(true);
      setStartGame(false);
    }
    const handleChoicesMade = (data: { roomUniqueId: string }) => {
      handleNextQuestion();
      socket.emit("resetChoices", { roomUniqueId: data.roomUniqueId });
      setChoices({ p1: "", p2: "" });
      setHasAnswered(false);
      setPlayerChoice("");
    };
    socket.on("choicesMade", handleChoicesMade);

    const handleP1Choice = (data: { value: string }) => {
      setChoices((prev) => ({ ...prev, p1: data.value }));
    };
    socket.on("p1Choice", handleP1Choice);

    const handleP2Choice = (data: { value: string }) => {
      setChoices((prev) => ({ ...prev, p2: data.value }));
    };
    socket.on("p2Choice", handleP2Choice);

    return () => {
      socket.off("choicesMade", handleChoicesMade);
      socket.off("p1Choice", handleP1Choice);
      socket.off("p2Choice", handleP2Choice);
    };
  }, [data.length, questionIndex, choices]);

  const handleNextQuestion = () => {
    setQuestionIndex((prev) => prev + 1);
  };
  const handleStartGame = () => {
    setStartGame(true);
    socket.emit("createGame");
  };

  const joinGame = () => {
    if (!roomUniqueId) return;
    setJoined(true);
    socket.emit("joinGame", { roomUniqueId: roomUniqueId });
    setStartGame(true);
  };

  const p1AnsweredCorrectly = useMemo(
    () => p1Answers.filter((answer, index) => answer === data[index].answer),
    [p1Answers, data],
  );

  const p2AnsweredCorrectly = useMemo(
    () => p2Answers.filter((answer, index) => answer === data[index].answer),
    [p2Answers, data],
  );

  const handleSubmitScore = () => {
    startTransition(async () => {
      if (player1) {
        await submitToLeaderboard(userId, p1AnsweredCorrectly.length);
      } else {
        await submitToLeaderboard(userId, p2AnsweredCorrectly.length);
      }
      toast.success("Score submitted successfully!");
      setP1Answers([]);
      setP2Answers([]);
      setQuestionIndex(0);
      setGameOver(false);
    });
  };

  const sendChoice = (choice: string) => {
    const choiceEvent = player1 ? "p1Choice" : "p2Choice";
    socket.emit(choiceEvent, {
      value: choice,
      roomUniqueId: roomUniqueId,
      score: player1 ? p1AnsweredCorrectly.length : p2AnsweredCorrectly.length,
    });
    if (player1) {
      setP1Answers((prev) => [...prev, choice]);
    } else {
      setP2Answers((prev) => [...prev, choice]);
    }
    setPlayerChoice(choice);
    setHasAnswered(true);
  };

  return (
    <div className="container">
      <section
        className="grid min-h-screen grid-rows-[auto,1fr] border-2 border-black bg-[#FFF9E4] shadow-dark"
        style={{
          backgroundImage: "url('/stages/webp/stage-1.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <header className="relative flex items-center justify-center border-b-2 border-black bg-blue-300 p-5">
          <h1 className="text-xl font-bold uppercase md:text-3xl">
            <Link href="/pvp">PVP</Link>
          </h1>
        </header>
        {gameOver ? (
          <div className="space-y-3 place-self-center rounded-md bg-white p-4 text-center text-black">
            <h3 className="text-2xl font-bold uppercase">Game Over!</h3>
            <p>
              Your total score is:{" "}
              <span className="font-bold">
                {player1
                  ? p1AnsweredCorrectly.length
                  : p2AnsweredCorrectly.length}
                /{data.length}
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
          <div className="place-self-center">
            {!startGame ? (
              <div className="flex w-full flex-col items-center gap-2 md:min-w-[286px]">
                <Button
                  className="gameBtn w-full bg-green-300 text-black"
                  onClick={handleStartGame}
                >
                  PVP Start
                </Button>
                <Button
                  className="gameBtn w-full bg-blue-300 text-black"
                  onClick={() => setIsJoining(true)}
                >
                  Join Game
                </Button>

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
                <p className="text-center text-white md:text-2xl">
                  Waiting for other players to join using the code:{" "}
                  {roomUniqueId}
                </p>
              </div>
            ) : (
              <>
                <div className="left-0 right-0 top-20 mx-auto w-fit uppercase text-green-300">
                  {choices.p1 && (
                    <p className="text-2xl font-bold">
                      Player 1 has made a choice
                    </p>
                  )}
                  {choices.p2 && (
                    <p className="text-2xl font-bold">
                      Player 2 has made a choice
                    </p>
                  )}
                </div>
                <div className="mx-auto mt-5 max-w-[700px] text-center">
                  <p className="mb-5 border-b-2 border-white pb-5 text-xl font-bold text-white md:text-2xl">
                    {currentQuestion?.question}
                  </p>
                  <div className="space-y-10">
                    {currentQuestion?.options!.map((option, index) => (
                      <button
                        key={index}
                        className={cn(
                          "text-blac block w-full rounded-full border-2 border-black bg-white p-5",
                          playerChoice === option && "bg-green-300",
                          hasAnswered &&
                            playerChoice !== option &&
                            "cursor-not-allowed",
                          hasAnswered &&
                            playerChoice !== option &&
                            "opacity-50",
                          playerChoice !== option &&
                            !hasAnswered &&
                            "hover:border-blue-300 hover:bg-blue-300",
                        )}
                        onClick={() => sendChoice(option)}
                        disabled={hasAnswered}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </section>
    </div>
  );
};
