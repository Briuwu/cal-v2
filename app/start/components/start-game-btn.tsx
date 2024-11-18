"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useGlobalAudioPlayer } from "react-use-audio-player";

export const StartGameBtn = () => {
  const router = useRouter();
  const { stop } = useGlobalAudioPlayer();

  const handleClick = () => {
    stop();
    router.push("/character-selection");
  };

  return (
    <Button
      onClick={handleClick}
      className="w-full border border-black bg-green-500 py-7 font-bold uppercase hover:bg-green-300"
    >
      Start Game
    </Button>
  );
};
