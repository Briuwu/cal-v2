"use server";
import { db } from "@/db/index";
import { users } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export const createProfile = async (selectedCharcter: number) => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not found");
  }

  const user = await currentUser();

  if (!user) {
    throw new Error("User not found");
  }

  await db.insert(users).values({
    username: user?.fullName! || user?.emailAddresses[0].emailAddress,
    email: user?.emailAddresses[0].emailAddress,
    xp: 0,
    coins: 0,
    currentLevel: 1,
  });

  redirect("/stages");
};
