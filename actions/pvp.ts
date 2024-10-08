"use server";

import { db } from "@/db";
import { pvpLeaderboard, pvpQuestions } from "@/db/schema";
import { calculateTotalPoints } from "@/lib/utils";
import { sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cache } from "react";

export const getAllPvpQuestions = cache(async () => {
  const data = await db.select().from(pvpQuestions).limit(25);

  return data;
});

export const submitToLeaderboard = async (
  userId: string,
  score: number,
  time: number,
) => {
  // calculate the total points by having the score and the lower time is better but the higher the score the better
  const totalPoints = Math.floor(calculateTotalPoints(score, time)) * 100;

  await db.insert(pvpLeaderboard).values({
    userId,
    score,
    time,
    totalPoints,
  });

  revalidatePath("/pvp");
};

export const getPvpLeaderboard = cache(async () => {
  const data = await db.query.pvpLeaderboard.findMany({
    orderBy: (pvpLeaderboard, { desc }) => [desc(pvpLeaderboard.totalPoints)],
  });

  return data;
});
