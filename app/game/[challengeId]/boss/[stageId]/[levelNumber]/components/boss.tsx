"use client";
import { getBoss } from "@/lib/boss";
import { cn } from "@/lib/utils";
import { BossState } from "@/types";
import { useMediaQuery } from "@uidotdev/usehooks";
import Image from "next/image";

export const Boss = ({
  bossState,
  bossName,
}: {
  bossState: BossState;
  bossName: string;
}) => {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 1024px)");
  let size = isSmallDevice ? 2.65 : 2;

  const { src, width, height } = getBoss(bossState, size, bossName);

  return (
    <>
      <Image
        src={src!}
        alt=""
        width={width}
        height={height}
        id="boss"
        className={cn(
          "absolute right-5 top-[100px] md:right-40 md:top-[390px] lg:bottom-[110px] lg:top-auto",
          bossName === "dragon" && "md:right-16 lg:bottom-[90px]",
        )}
      />
    </>
  );
};
