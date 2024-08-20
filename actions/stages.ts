"use server";

import { db } from "@/db";
import { achievements, levels, userProgress, users } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cache } from "react";
import { handleRewardLevel } from "./level";
import { handleAuth } from "@/lib/auth";
import { handleAchievementComplete } from "./achievements";

export const getAllStages = cache(async () => {
  const data = await db.query.stages.findMany({
    with: {
      levels: {
        orderBy: (levels, { asc }) => [asc(levels.levelNumber)],
      },
      userProgress: true,
    },
  });

  revalidatePath("/stages");
  return data;
});

export const getLevel = cache(async (stageId: number, levelNumber: number) => {
  const data = await db.query.levels.findFirst({
    where: and(
      eq(levels.stageId, Number(stageId)),
      eq(levels.levelNumber, Number(levelNumber)),
    ),
    with: {
      stage: true,
    },
  });

  revalidatePath("/game");
  return data;
});

export const nextLevel = cache(
  async (stageId: number, nextLevel: number, isReward?: boolean) => {
    const data = await db.query.levels.findFirst({
      where: and(
        eq(levels.stageId, Number(stageId)),
        eq(levels.levelNumber, Number(nextLevel)),
      ),
    });

    if (!data) {
      throw new Error("No next level found");
    }

    if (isReward) {
      await handleCompleteLevel(Number(stageId) - 1, Number(nextLevel) - 1);
      await handleUnlockLevel(Number(stageId), Number(nextLevel));
    } else {
      await handleCompleteLevel(Number(stageId), Number(nextLevel) - 1);
      await handleUnlockLevel(Number(stageId), Number(nextLevel));
    }

    await handleRewardLevel();

    revalidatePath("/game");
    redirect(
      `/game/${data.id}/${data.type}/${data.stageId}/${data.levelNumber}`,
    );
  },
);

export const handleCompleteLevel = cache(
  async (stageId: number, levelNumber: number) => {
    const userId = handleAuth();

    const achievement = await db.query.achievements.findFirst({
      where: eq(achievements.rewardedAt, levelNumber),
    });

    if (achievement) {
      const currentUser = await db.query.users.findFirst({
        where: eq(users.userId, userId),
      });

      if (!currentUser) {
        throw new Error("User not found");
      }

      await handleAchievementComplete(achievement.id);

      await db
        .update(users)
        .set({
          coins: currentUser.coins + achievement.coins,
          currentLevel: currentUser.currentLevel + achievement.lvl,
        })
        .where(eq(users.userId, userId));
    }

    await db
      .update(userProgress)
      .set({
        stageId,
        levelNumber,
        status: "completed",
      })
      .where(
        and(
          eq(userProgress.userId, userId),
          eq(userProgress.levelNumber, Number(levelNumber)),
        ),
      );
  },
);

export const handleUnlockLevel = cache(
  async (stageId: number, levelNumber: number) => {
    const userId = handleAuth();

    await db.insert(userProgress).values({
      userId,
      stageId,
      levelNumber,
      status: "unlocked",
    });
  },
);
