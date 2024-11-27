import { Button } from "@/components/ui/button";
import { PvpMenu } from "./components/pvp-menu";
import { handleAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";
import Link from "next/link";
import { PvpGame } from "./components/pvp-game";
import { getAllPvpQuestions, getPvpLeaderboard } from "@/actions/pvp";
import { shuffle } from "@/lib/utils";
import { PvpLeaderboard } from "./components/pvp-leaderboard";
import Image from "next/image";

async function PVPPage() {
  const userId = handleAuth();

  if (!userId) {
    redirect("/login");
  }

  const user = await db.query.users.findFirst({
    where: eq(users.userId, userId),
  });

  if (!user) {
    redirect("/login");
  }

  const data = await getAllPvpQuestions();

  const updatedData = data.map((question) => {
    return {
      ...question,
      options: shuffle(question.options),
    };
  });

  const leaderboard = await getPvpLeaderboard();

  const getUsername = async (userId: string) => {
    const user = await db.query.users.findFirst({
      where: eq(users.userId, userId),
    });

    return user?.username;
  };

  return (
    <main className="min-h-screen py-10">
      <PvpGame data={updatedData} userId={userId} />
    </main>
  );
}
export default PVPPage;
