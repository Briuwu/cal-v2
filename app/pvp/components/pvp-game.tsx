"use client";
import { useMemo, useState, useTransition, useEffect } from "react";

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

    socket.on("connection", handleConnect);
    socket.on("disconnect", handleDisconnect);
    socket.on("newGame", (data) => {
      setRoomUniqueId(data.roomUniqueId);
      setPlayer1(true);
    });
    socket.on("playersConnected", handlePlayersConnected);

    return () => {
      socket.off("connection", handleConnect);
      socket.off("disconnect", handleDisconnect);
      socket.off("newGame");
      socket.off("playersConnected", handlePlayersConnected);
    };
  }, []);

  useEffect(() => {
    if (questionIndex === data.length) {
      setGameOver(true);
      setStartGame(false);
    }
    socket.on("choicesMade", (data) => {
      handleNextQuestion();
      socket.emit("resetChoices", { roomUniqueId: data.roomUniqueId });
      setChoices({ p1: "", p2: "" });
    });

    socket.on("p1Choice", (data) => {
      setChoices((prev) => ({ ...prev, p1: data.value }));
    });

    socket.on("p2Choice", (data) => {
      setChoices((prev) => ({ ...prev, p2: data.value }));
    });

    return () => {
      socket.off("choicesMade");
      socket.off("p1Choice");
      socket.off("p2Choice");
    };
  }, [data.length, questionIndex, choices]);

  const handleNextQuestion = () => {
    setQuestionIndex((prev) => prev + 1);
  };

  const handleStartGame = () => {
    // reset();
    setStartGame(true);
    // start();
    socket.emit("createGame");
  };

  const joinGame = () => {
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

  console.log("p1", p1Answers);
  console.log("p2", p2Answers);

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
    });
    if (player1) {
      setP1Answers((prev) => [...prev, choice]);
    } else {
      setP2Answers((prev) => [...prev, choice]);
    }
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
                  {currentQuestion?.question}
                </h2>
                <ul className="space-y-5">
                  {currentQuestion?.options!.map((option, index) => (
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
