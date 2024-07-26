"use server";

import { db } from "@/db";
import { levels, userProgress, users } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cache } from "react";

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
  });

  revalidatePath("/game");
  return data;
});

export const nextLevel = cache(async (stageId: number, nextLevel: number) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("You must be logged in to access this resource");
  }

  console.log(stageId, nextLevel);

  const data = await db.query.levels.findFirst({
    where: and(eq(levels.stageId, stageId), eq(levels.levelNumber, nextLevel)),
  });

  if (!data) {
    throw new Error("No next level found");
  }

  await handleRewardLevel();
  await handleCompleteLevel(stageId, nextLevel - 1);
  await handleUnlockLevel(stageId, nextLevel);

  redirect(
    `/game/${data.id}/${data.type}?stageId=${data.stageId}&levelNumber=${data.levelNumber}`,
  );
});

export const handleCompleteLevel = cache(
  async (stageId: number, levelNumber: number) => {
    const { userId } = auth();

    if (!userId) {
      throw new Error("You must be logged in to access this resource");
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
          eq(userProgress.levelNumber, levelNumber),
        ),
      );
  },
);

export const handleUnlockLevel = cache(
  async (stageId: number, levelNumber: number) => {
    const { userId } = auth();

    if (!userId) {
      throw new Error("You must be logged in to access this resource");
    }

    await db.insert(userProgress).values({
      userId,
      stageId,
      levelNumber,
      status: "unlocked",
    });
  },
);

export const handleRewardLevel = cache(async () => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("You must be logged in to access this resource");
  }

  const user = await currentUser();

  if (!user) {
    throw new Error("No user found");
  }

  const data = await db.query.users.findFirst({
    where: eq(users.email, user.emailAddresses[0].emailAddress),
  });

  if (!data) {
    throw new Error("No user found");
  }

  await handleLevelUp();
  await db.update(users).set({
    coins: data.coins + 30,
    xp: data.xp + 50,
  });
});

export const handleLevelUp = cache(async () => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("You must be logged in to access this resource");
  }

  const user = await currentUser();

  if (!user) {
    throw new Error("No user found");
  }

  const data = await db.query.users.findFirst({
    where: eq(users.email, user.emailAddresses[0].emailAddress),
  });

  if (!data) {
    throw new Error("No user found");
  }

  if (data.xp >= 100) {
    await db.update(users).set({
      currentLevel: data.currentLevel + 1,
      xp: 0,
    });
  }
});
