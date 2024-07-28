import { getCharacter } from "@/lib/character";
import { CharacterState } from "@/types";
import { useMediaQuery } from "@uidotdev/usehooks";
import Image from "next/image";

export const Player = ({
  characterState,
}: {
  characterState: CharacterState;
}) => {
  const isLargeDevice = useMediaQuery("only screen and (min-width : 1024px)");
  let size = isLargeDevice ? 2.5 : 3.95;
  const { src, width, height } = getCharacter(characterState, size, "homeless");

  return (
    <>
      <Image
        src={src}
        alt=""
        width={width}
        height={height}
        id="character"
        className="absolute -left-20 top-[140px] z-40 md:top-[375px] lg:-left-40 lg:bottom-[105px] lg:top-auto"
        unoptimized
      />
    </>
  );
};
