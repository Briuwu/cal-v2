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
  let size = isLargeDevice ? 2.25 : 3.95;
  if (
    characterType === 3 &&
    (characterState === "idle" ||
      characterState === "walk" ||
      characterState === "hurt")
  ) {
    size = isLargeDevice ? 3 : 5;
  }

  if (characterState === "attack-2" || characterState === "attack") {
    size = isLargeDevice ? 2 : 4.5;
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
