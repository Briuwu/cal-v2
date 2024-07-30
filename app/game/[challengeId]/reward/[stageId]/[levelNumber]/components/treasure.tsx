import { cn } from "@/lib/utils";
import { useMediaQuery } from "@uidotdev/usehooks";
import Image from "next/image";

export const Treasure = () => {
  const isSmallDevice = useMediaQuery("only screen and (max-width : 768px)");
  const isLargeDevice = useMediaQuery("only screen and (min-width : 1024px)");

  const size = isSmallDevice
    ? "scale-50"
    : isLargeDevice
      ? "scale-100"
      : "scale-75";

  return (
    <>
      <Image
        src="/reward/chest.png"
        alt=""
        width={107}
        height={79}
        id="chest"
        className={cn(
          "absolute right-1/2 top-[170px] z-40 translate-x-1/2 md:top-[395px] lg:bottom-[105px] lg:top-auto",
          size,
        )}
      />
      <Image
        src="/reward/animated-chest.gif"
        alt=""
        width={107}
        height={79}
        id="animatedChest"
        className={cn(
          "absolute right-1/2 top-[160px] z-40 translate-x-1/2 opacity-0 md:top-[385px] lg:bottom-[105px] lg:top-auto",
          size,
        )}
      />
    </>
  );
};
