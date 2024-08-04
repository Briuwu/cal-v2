import { getBoss } from "@/lib/boss";
import { BossState } from "@/types";
import { useMediaQuery } from "@uidotdev/usehooks";
import Image from "next/image";

export const Boss = ({ bossState }: { bossState: BossState }) => {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 1024px)");
  let size = isSmallDevice ? 2.75 : 1.75;

  const { src, width, height } = getBoss(bossState, size);

  return (
    <>
      <Image
        src={src}
        alt=""
        width={width}
        height={height}
        id="boss"
        className="absolute right-5 top-[100px] md:right-10 md:top-[390px] lg:bottom-[110px] lg:top-auto"
        unoptimized
      />
    </>
  );
};
