"use server";

import { db } from "@/db";
import { levels, userProgress } from "@/db/schema";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { handleCompleteLevel, handleUnlockLevel } from "./stages";
import { redirect } from "next/navigation";
import { cache } from "react";

export const handleLearningComplete = cache(
  async (stageId: number, levelNumber: number) => {
    const { userId } = auth();

    if (!userId) {
      throw new Error("You must be logged in to access this resource");
    }

    await handleCompleteLevel(Number(stageId), Number(levelNumber));
    await handleUnlockLevel(Number(stageId), Number(levelNumber) + 1);

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
