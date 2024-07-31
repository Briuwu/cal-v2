"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import { auth, currentUser } from "@clerk/nextjs/server";
import { eq } from "drizzle-orm";

export const getProfile = async () => {
  const { userId } = auth();

  if (!userId) {
    throw new Error("User not found");
  }

  const user = await currentUser();

  const data = await db.query.users.findFirst({
    where: eq(users.userId, userId),
    with: {
      selectedCharacter: true,
    },
  });

  return data;
};
