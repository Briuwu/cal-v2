import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { levels } from "@/db/schema";

type Props = {
  levels: (typeof levels.$inferSelect)[];
};

export const Levels = ({ levels }: Props) => {
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

    return (
      <Link
        href={`/game/${level.id}/${level.type}?stageId=${level.stageId}&levelNumber=${level.levelNumber}`}
        key={level.id}
        aria-disabled={
          level.status === "locked" || level.status === "completed"
        }
        className={cn(
          "relative",
          (level.status === "locked" || level.status === "completed") &&
            "pointer-events-none",
        )}
      >
        <Image
          src={
            level.status === "locked"
              ? "/stages/levels/locked-level.png"
              : level.status === "completed"
                ? "/stages/levels/completed.png"
                : imgSrc
          }
          alt=""
          width={70}
          height={65}
        />
      </Link>
    );
  });
  return (
    <div className="grid grid-flow-col justify-between [&>*:nth-child(even)]:mt-28">
      {displayLevels}
    </div>
  );
};
