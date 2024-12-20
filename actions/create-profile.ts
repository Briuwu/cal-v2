"use server";
import { db } from "@/db/index";
import { userCharacters, userProgress, users } from "@/db/schema";
import { handleAuth, handleCurrentUser } from "@/lib/auth";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { cache } from "react";

export const createProfile = cache(
  async (selectedCharacter: number, username: string) => {
    const userId = handleAuth();

    const user = await handleCurrentUser();

    const userData = await db.insert(users).values({
      username,
      email: user?.emailAddresses[0].emailAddress,
      xp: 0,
      coins: 0,
      currentLevel: 1,
      userId,
      selectedCharacter,
      avatar: user?.imageUrl,
    });

    if (!userData) {
      throw new Error("User not found");
    }

    await db.insert(userProgress).values({
      userId,
      levelNumber: 1,
      stageId: 1,
      status: "unlocked",
    });

    await db.insert(userCharacters).values({
      userId,
      characterId: selectedCharacter,
    });

    redirect("/onboarding");
  },
);
