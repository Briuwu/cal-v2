"use server";

import { db } from "@/db";
import { levels, userProgress } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { handleCompleteLevel, handleUnlockLevel } from "./stages";
import { redirect } from "next/navigation";

export const handleLearningComplete = async (
  stageId: number,
  levelNumber: number,
) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("You must be logged in to access this resource");
  }

  await handleCompleteLevel(stageId, levelNumber);
  await handleUnlockLevel(stageId, levelNumber + 1);

  const data = await db.query.levels.findFirst({
    where: and(
      eq(levels.stageId, stageId),
      eq(levels.levelNumber, levelNumber + 1),
    ),
  });

  if (!data) {
    throw new Error("No next level found");
  }

  redirect(`/game/3/mini-challenge?stageId=1&levelNumber=2`);
};
