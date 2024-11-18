"use client";
import { useState, useEffect } from "react";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useAnimate } from "framer-motion";

import { levels } from "@/db/schema";
import { Player } from "@/app/game/[challengeId]/components/player";
import { CharacterState, NPCState } from "@/types";
import { Dialogue } from "./dialogue";
import { nextLevel } from "@/actions/stages";
import { NPC } from "../../../../components/NPC";
import { Button } from "@/components/ui/button";
import { handleLearningComplete } from "@/actions/learning";
import { useGlobalAudioPlayer } from "react-use-audio-player";

type Props = {
  level: typeof levels.$inferSelect;
  characterType: number;
  dialogues: {
    name: string;
    text: string;
  }[];
  playerName: string;
  stageId: number;
};

const audioBg = {
  1: "/audio/learning-stage-1.mp3",
  2: "/audio/learning-stage-2.mp3",
  3: "/audio/learning-stage-3.mp3",
  4: "/audio/learning-stage-4.mp3",
  5: "/audio/learning-stage-5.mp3",
};

export const Game = ({
  level,
  characterType,
  dialogues,
  playerName,
  stageId,
}: Props) => {
  const { load } = useGlobalAudioPlayer();
  const [scope, animate] = useAnimate();
  const [isAnimating, setIsAnimating] = useState(false);
  const [isDialogue, setIsDialogue] = useState(false);
  const [characterState, setCharacterState] = useState<CharacterState>("walk");
  const [NPCState, setNPCState] = useState<NPCState>("idle");
  const [dialogueIdx, setDialogueIdx] = useState(0);

  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const isMediumDevice = useMediaQuery(
    "only screen and (min-width : 769px) and (max-width : 992px)",
  );
  const isLargeDevice = useMediaQuery("only screen and (min-width : 1024px)");

  useEffect(() => {
    setIsAnimating(true);
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
      await animate("#talkBtn", { opacity: 1 }, { duration: 0.5 });
    };

    animateCharacter();
    setIsAnimating(false);
  }, []);

  const handleNextDialogue = async () => {
    if (dialogueIdx < dialogues.length - 1) {
      setDialogueIdx(dialogueIdx + 1);
    } else {
      setIsDialogue(false);
      let x = isSmallDevice ? 450 : isMediumDevice ? 600 : 1150;
      setNPCState("idle");
      setCharacterState("walk");
      await animate("#character", { x }, { duration: 3 });
      await handleLearningComplete(level.stageId, level.levelNumber);
    }
  };

  const handleSkipDialogue = async () => {
    setIsDialogue(false);
    let x = isSmallDevice ? 450 : isMediumDevice ? 600 : 1150;
    setNPCState("idle");
    setCharacterState("walk");
    await animate("#character", { x }, { duration: 3 });
    await handleLearningComplete(level.stageId, level.levelNumber);
  };

  const handleTalk = async () => {
    await animate("#talkBtn", { opacity: 0 }, { duration: 0.5 });
    let xCharacterPosition = isSmallDevice ? 250 : isMediumDevice ? 450 : 750;
    setCharacterState("walk");
    await animate("#character", { x: xCharacterPosition }, { duration: 2.5 });
    setCharacterState("idle");
    setNPCState("dialogue");
    setIsDialogue(true);
  };
  return (
    <div
      ref={scope}
      className="z-20 overflow-hidden lg:absolute lg:inset-0 lg:p-4"
    >
      <Player characterState={characterState} characterType={characterType} />
      {isDialogue && (
        <Dialogue
          dialogue={dialogues[dialogueIdx]}
          onNextDialogue={handleNextDialogue}
          onSkipDialogue={handleSkipDialogue}
          playerName={playerName}
        />
      )}
      <Button
        onClick={handleTalk}
        id="talkBtn"
        className="absolute right-1/2 top-20 z-[99] translate-x-1/2 bg-white text-xs font-bold uppercase text-black opacity-0 md:text-base"
        disabled={isAnimating}
      >
        Talk
      </Button>
      <NPC NPCState={NPCState} stage={level.stageId} />
    </div>
  );
};
