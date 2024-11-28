import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { levels, userProgress as userProgressData } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";

type Props = {
  levels: (typeof levels.$inferSelect)[];
  userProgress: (typeof userProgressData.$inferSelect)[];
};

export const Levels = ({ levels, userProgress }: Props) => {
  const { userId } = auth();
  const displayLevels = levels.map((level) => {
    let imgSrc;
    switch (level.type) {
      case "learning":
        imgSrc = "/stages/levels/webp/study-active.webp";
        break;
      case "mini-challenge":
        imgSrc = "/stages/levels/webp/next-level.webp";
        break;
      case "boss":
        imgSrc = "/stages/levels/webp/boss.webp";
        break;
      case "reward":
        imgSrc = "/stages/levels/webp/treasure.webp";
        break;
    }

    const progress = userProgress.find(
      (progress) =>
        progress.levelNumber === level.levelNumber &&
        progress.userId === userId,
    );

    return (
      <div key={level.id} className="relative">
        <Image
          src="/stages/levels/webp/start-pointer.webp"
          alt=""
          width={82}
          height={54}
          className="absolute -top-10 z-20 animate-bounce"
        />
        <Link
          href={`/game/${level.id}/${level.type}/${level.stageId}/${level.levelNumber}`}
          className={cn("relative")}
        >
          <Image src={imgSrc} alt="" width={70} height={65} />
        </Link>
      </div>
    );

    // if (progress) {
    //   return (
    //     <div key={level.id} className="relative">
    //       {progress.status === "unlocked" && (
    //         <Image
    //           src="/stages/levels/webp/start-pointer.webp"
    //           alt=""
    //           width={82}
    //           height={54}
    //           className="absolute -top-10 z-20 animate-bounce"
    //         />
    //       )}
    //       <Link
    //         href={`/game/${level.id}/${level.type}/${level.stageId}/${level.levelNumber}`}
    //         aria-disabled={progress.status === "completed"}
    //         className={cn(
    //           "relative",
    //           progress.status === "completed" &&
    //             "pointer-events-none opacity-50",
    //         )}
    //       >
    //         <Image
    //           src={
    //             progress.status === "completed"
    //               ? "/stages/levels/webp/completed.webp"
    //               : imgSrc
    //           }
    //           alt=""
    //           width={70}
    //           height={65}
    //         />
    //       </Link>
    //     </div>
    //   );
    // } else {
    //   return (
    //     <Image
    //       src="/stages/levels/webp/locked-level.webp"
    //       alt=""
    //       key={level.id}
    //       width={70}
    //       height={65}
    //     />
    //   );
    // }
  });
  return (
    <div className="grid grid-flow-col justify-between [&>*:nth-child(even)]:mt-28">
      {displayLevels}
    </div>
  );
};
