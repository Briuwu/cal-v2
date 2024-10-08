"use server";
import { db } from "@/db";
import { userProgress, users } from "@/db/schema";
import { handleAuth, handleCurrentUser } from "@/lib/auth";
import { auth, currentUser } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { cache } from "react";

export const handleRewardLevel = cache(async () => {
  const userId = handleAuth();

  if (!userId) {
    throw new Error("You must be logged in to access this resource");
  }

  const user = await handleCurrentUser();

  if (!user) {
    throw new Error("No user found");
  }

  const data = await db.query.users.findFirst({
    where: eq(users.email, user.emailAddresses[0].emailAddress),
  });

  if (!data) {
    throw new Error("No user found");
  }

  await db
    .update(users)
    .set({
      coins: data.coins + 30,
      xp: data.xp + 50,
    })
    .where(eq(users.email, user.emailAddresses[0].emailAddress));
  await handleLevelUp();
});

export const handleLevelUp = cache(async () => {
  const userId = handleCurrentUser();

  if (!userId) {
    throw new Error("You must be logged in to access this resource");
  }

  const user = await handleCurrentUser();

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
    await db
      .update(users)
      .set({
        currentLevel: data.currentLevel + 1,
        xp: 0,
      })
      .where(eq(users.email, user.emailAddresses[0].emailAddress));
  }
});

export const onClueUse = cache(async () => {
  const user = await handleCurrentUser();

  const data = await db.query.users.findFirst({
    where: eq(users.email, user.emailAddresses[0].emailAddress),
  });

  if (!data) {
    throw new Error("No user found");
  }

  if (data.coins >= 10) {
    await db
      .update(users)
      .set({
        coins: data.coins - 10,
      })
      .where(eq(users.email, user.emailAddresses[0].emailAddress));
  } else {
    throw new Error("Not enough coins");
  }

  revalidatePath("/game");
});
