"use server";

import { db } from "@/db";
import { levels } from "@/db/schema";
import { and, eq } from "drizzle-orm";
import { handleCompleteLevel, handleUnlockLevel } from "./stages";
import { redirect } from "next/navigation";
import { cache } from "react";
import { handleAuth } from "@/lib/auth";
import { handleRewardLevel } from "./level";

export const handleLearningComplete = cache(
  async (stageId: number, levelNumber: number) => {
    await handleCompleteLevel(Number(stageId), Number(levelNumber));
    await handleUnlockLevel(Number(stageId), Number(levelNumber) + 1);
    await handleRewardLevel();

    const data = await db.query.levels.findFirst({
      where: and(
        eq(levels.stageId, Number(stageId)),
        eq(levels.levelNumber, Number(levelNumber) + 1),
      ),
    });

    if (!data) {
      throw new Error("No next level found");
    }

    redirect(
      `/game/${data.id}/${data.type}/${data.stageId}/${data.levelNumber}`,
    );
  },
);
