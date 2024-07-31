"use server";
import { db } from "@/db";
import { users } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";
import { cache } from "react";

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
    await db
      .update(users)
      .set({
        currentLevel: data.currentLevel + 1,
        xp: 0,
      })
      .where(eq(users.email, user.emailAddresses[0].emailAddress));
  }
});
