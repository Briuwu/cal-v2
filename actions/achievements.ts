"use server";

import { db } from "@/db";
import { achievements, users, usersAchievements } from "@/db/schema";
import { handleAuth } from "@/lib/auth";
import { eq } from "drizzle-orm";

export const getAllAchievements = async () => {
  return await db.query.achievements.findMany({
    orderBy: (achievements, { asc }) => [asc(achievements.rewardedAt)],
  });
};

export const handleAchievementComplete = async (achievementId: number) => {
  const userId = handleAuth();

  const profile = await db.query.users.findFirst({
    where: eq(users.userId, userId),
  });

  if (!profile) {
    throw new Error("Profile not found");
  }

  await db.insert(usersAchievements).values({
    userId,
    achievementId,
  });
};

export const getUserAchievements = async () => {
  const userId = handleAuth();

  return await db.query.usersAchievements.findMany({
    where: eq(usersAchievements.userId, userId),
  });
};
