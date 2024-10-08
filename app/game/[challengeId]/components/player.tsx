"use client";
import { getCharacter } from "@/lib/character";
import { Characters, CharacterState } from "@/types";
import { useMediaQuery } from "@uidotdev/usehooks";
import Image from "next/image";

export const Player = ({
  characterState,
  characterType,
}: {
  characterState: CharacterState;
  characterType: number;
}) => {
  const isLargeDevice = useMediaQuery("only screen and (min-width : 1024px)");
  let size = isLargeDevice ? 2.5 : 3.85;
  if (characterType === 3 && characterState === "idle") {
    size = isLargeDevice ? 3 : 5.5;
  }

  if (
    characterType === 3 &&
    (characterState === "walk" || characterState === "hurt")
  ) {
    size = isLargeDevice ? 3 : 4.75;
  }

  if (characterType === 3 && characterState === "attack") {
    size = isLargeDevice ? 3.25 : 2.5;
  }

  if (
    characterType === 4 &&
    (characterState === "walk" || characterState === "hurt")
  ) {
    size = isLargeDevice ? 2 : 3.25;
  }

  if (characterType === 4 && characterState === "attack") {
    size = isLargeDevice ? 2 : 2.5;
  }

  if (characterType === 4 && characterState === "attack-2") {
    size = isLargeDevice ? 2 : 3.5;
  }

  if (
    characterType === 5 &&
    (characterState === "walk" ||
      characterState === "hurt" ||
      characterState === "idle")
  ) {
    size = isLargeDevice ? 3 : 4.5;
  }

  if (characterType === 5 && characterState === "attack") {
    size = isLargeDevice ? 2 : 2.75;
  }

  if (characterType === 5 && characterState === "attack-2") {
    size = isLargeDevice ? 2 : 3.5;
  }

  if (
    (characterState === "attack-2" || characterState === "attack") &&
    characterType === 1
  ) {
    size = isLargeDevice ? 2 : 4.8;
  }

  const { src, width, height } = getCharacter(
    characterState,
    size,
    characterType,
  );

  return (
    <>
      <Image
        src={src}
        alt=""
        width={width}
        height={height}
        id="character"
        className="absolute -left-20 top-[105px] z-40 md:top-[375px] lg:-left-40 lg:bottom-[105px] lg:top-auto"
        unoptimized
      />
    </>
  );
};
