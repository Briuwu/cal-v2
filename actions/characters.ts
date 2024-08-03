"use server";
import { db } from "@/db";
import { characters, userCharacters, users } from "@/db/schema";
import { handleAuth } from "@/lib/auth";
import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cache } from "react";

export const getAllCharacters = cache(async () => {
  return await db.query.characters.findMany({
    orderBy: (characters, { asc }) => [asc(characters.id)],
  });
});

export const getOwnedCharacters = cache(async () => {
  let userId = handleAuth();

  return await db.query.userCharacters.findMany({
    where: eq(userCharacters.userId, userId),
  });
});

export const handleEquippedCharacter = cache(async (characterId: number) => {
  let userId = handleAuth();

  await db
    .update(users)
    .set({
      selectedCharacter: characterId,
    })
    .where(eq(users.userId, userId));

  revalidatePath("/stages/shop");
});

export const handleBuyCharacter = cache(
  async (characterId: number, coins: number) => {
    let userId = handleAuth();

    const characterData = await db.query.characters.findFirst({
      where: eq(characters.id, characterId),
    });

    const profileData = await db.query.users.findFirst({
      where: eq(users.userId, userId),
    });

    if (!profileData) {
      throw new Error("Profile not found");
    }

    if (!characterData) {
      throw new Error("Character not found");
    }

    if (profileData.coins < coins) {
      throw new Error("Not enough coins");
    } else {
      await db.insert(userCharacters).values({
        userId,
        characterId: characterData.id,
      });

      await db
        .update(users)
        .set({
          selectedCharacter: characterData.id,
          coins: profileData.coins - coins,
        })
        .where(eq(users.userId, userId));
    }

    revalidatePath("/stages/shop");
  },
);
