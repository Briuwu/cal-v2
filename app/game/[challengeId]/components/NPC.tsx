"use client";
import { getNPC } from "@/lib/npc";
import { NPCState } from "@/types";
import { useMediaQuery } from "@uidotdev/usehooks";
import Image from "next/image";

export const NPC = ({
  NPCState,
  stage,
}: {
  NPCState: NPCState;
  stage: number;
}) => {
  const isLargeDevice = useMediaQuery("only screen and (min-width : 1024px)");
  let size = isLargeDevice ? 2.5 : 3.95;
  const { src, width, height } = getNPC(NPCState, size, stage);

  return (
    <>
      <Image
        src={src}
        alt=""
        width={width}
        height={height}
        id="npc"
        className="absolute right-20 top-[110px] z-40 scale-x--1 md:top-[375px] lg:bottom-[105px] lg:right-40 lg:top-auto"
        unoptimized
      />
    </>
  );
};
