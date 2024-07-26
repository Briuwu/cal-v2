import { getCharacter } from "@/lib/character";
import { CharacterState } from "@/types";
import Image from "next/image";

export const Player = ({
  characterState,
}: {
  characterState: CharacterState;
}) => {
  const { src, width, height } = getCharacter(characterState, "homeless");

  return (
    <>
      <Image
        src={src}
        alt=""
        width={width}
        height={height}
        id="character"
        className="absolute -left-40 bottom-[105px] z-40"
      />
    </>
  );
};
