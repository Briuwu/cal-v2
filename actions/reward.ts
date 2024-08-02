"use server";

import { db } from "@/db";
import { userCharacters, users } from "@/db/schema";
import { handleAuth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cache } from "react";

export const handleRewardChest = cache(
  async (coins: number, level: number, hasCharacter?: number) => {
    const userId = handleAuth();

    const profileData = await db.query.users.findFirst({
      where: eq(users.userId, userId),
    });

    if (!profileData) {
      throw new Error("Profile not found");
    }

    if (hasCharacter) {
      await db
        .update(users)
        .set({
          coins: profileData.coins + coins,
          currentLevel: profileData.currentLevel + level,
        })
        .where(eq(users.userId, userId));

      await db.insert(userCharacters).values({
        userId,
        characterId: hasCharacter,
      });
    } else {
      await db
        .update(users)
        .set({
          coins: profileData.coins + coins,
          currentLevel: profileData.currentLevel + level,
        })
        .where(eq(users.userId, userId));
    }

    revalidatePath("/game");
  },
);
