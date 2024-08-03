"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { handleAuth, handleCurrentUser } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cache } from "react";

export const getProfile = cache(async () => {
  const userId = handleAuth();

  const data = await db.query.users.findFirst({
    where: eq(users.userId, userId),
    with: {
      selectedCharacter: true,
    },
  });

  return data;
});

export const getLeaderboardProfiles = cache(async () => {
  const data = await db.query.users.findMany({
    orderBy: (users, { desc }) => [desc(users.currentLevel)],
    limit: 10,
  });

  revalidatePath("/stages/leaderboard");
  return data;
});
