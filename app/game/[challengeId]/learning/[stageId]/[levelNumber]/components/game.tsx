"use client";
import { useState, useEffect } from "react";
import { useMediaQuery } from "@uidotdev/usehooks";
import { useAnimate } from "framer-motion";

import { levels } from "@/db/schema";
import { Player } from "@/app/game/[challengeId]/components/player";
import { CharacterState } from "@/types";
import { Dialogue } from "./dialogue";
import { dialogues } from "@/lib/dialogues";
import { nextLevel } from "@/actions/stages";

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
  const [characterState, setCharacterState] = useState<CharacterState>("walk");
  const [dialogueIdx, setDialogueIdx] = useState(0);

  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
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
      await nextLevel(level.stageId, level.levelNumber + 1);
    }
  };
  return (
    <div
      ref={scope}
      className="z-20 overflow-hidden lg:absolute lg:inset-0 lg:p-4"
    >
      <Player characterState={characterState} characterType={characterType} />
      <Dialogue
        dialogue={dialogues[dialogueIdx]}
        onNextDialogue={handleNextDialogue}
      />
    </div>
  );
};
