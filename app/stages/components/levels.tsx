import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { levels, userProgress as userProgressData } from "@/db/schema";

type Props = {
  levels: (typeof levels.$inferSelect)[];
  userProgress: (typeof userProgressData.$inferSelect)[];
};

export const Levels = ({ levels, userProgress }: Props) => {
  const displayLevels = levels.map((level) => {
    let imgSrc;
    switch (level.type) {
      case "learning":
        imgSrc = "/stages/levels/study-active.png";
        break;
      case "mini-challenge":
        imgSrc = "/stages/levels/next-level.png";
        break;
      case "boss":
        imgSrc = "/stages/levels/boss.png";
        break;
      case "reward":
        imgSrc = "/stages/levels/treasure.png";
        break;
    }

    const progress = userProgress.find(
      (progress) => progress.levelNumber === level.levelNumber,
    );

    if (progress) {
      return (
        <div key={level.id} className="relative">
          {progress.status === "unlocked" && (
            <Image
              src="/stages/levels/start-pointer.png"
              alt=""
              width={82}
              height={54}
              className="absolute -top-10 z-20 animate-bounce"
            />
          )}
          <Link
            href={`/game/${level.id}/${level.type}?stageId=${level.stageId}&levelNumber=${level.levelNumber}`}
            aria-disabled={progress.status === "completed"}
            className={cn(
              "relative",
              progress.status === "completed" &&
                "pointer-events-none opacity-50",
            )}
          >
            <Image
              src={
                progress.status === "completed"
                  ? "/stages/levels/completed.png"
                  : imgSrc
              }
              alt=""
              width={70}
              height={65}
            />
          </Link>
        </div>
      );
    } else {
      return (
        <Image
          src="/stages/levels/locked-level.png"
          alt=""
          key={level.id}
          width={70}
          height={65}
        />
      );
    }
  });
  return (
    <div className="grid grid-flow-col justify-between [&>*:nth-child(even)]:mt-28">
      {displayLevels}
    </div>
  );
};
