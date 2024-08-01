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

type Props = {
  level: typeof levels.$inferSelect;
  characterType: number;
  dialogues: {
    name: string;
    text: string;
  }[];
};

export const Game = ({ level, characterType, dialogues }: Props) => {
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
    const animateCharacter = async () => {
      await animate(
        "#character",
        { x: isLargeDevice ? 200 : 90 },
        { duration: 3 },
      );
      setCharacterState("idle");
    };

    animateCharacter();
    setIsAnimating(false);
  }, []);

  const handleNextDialogue = async () => {
    if (dialogueIdx < dialogues.length - 1) {
      setDialogueIdx(dialogueIdx + 1);
    } else {
      setIsDialogue(false);
      await nextLevel(level.stageId, level.levelNumber + 1);
    }
  };

  const handleTalk = async () => {
    let xCharacterPosition = isSmallDevice ? 250 : isMediumDevice ? 450 : 750;
    setCharacterState("walk");
    await animate("#character", { x: xCharacterPosition }, { duration: 2.5 });
    setCharacterState("idle");
    setNPCState("dialogue");
    setIsDialogue(true);
    await animate("#talkBtn", { opacity: 0 }, { duration: 0.5 });
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
        />
      )}
      <Button
        onClick={handleTalk}
        id="talkBtn"
        className="absolute right-1/2 top-20 z-[99] translate-x-1/2 bg-white text-xs font-bold uppercase text-black md:text-base"
      >
        Talk
      </Button>
      <NPC NPCState={NPCState} stage={level.stageId} />
    </div>
  );
};
