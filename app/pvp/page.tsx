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
    <main className="min-h-screen pb-10">
      <header className="flex items-center justify-between p-4">
        <Button asChild>
          <Link href={"/start"}>Back</Link>
        </Button>
        <PvpMenu leaderboard={leaderboard} getUsername={getUsername} />
      </header>
      <div className="container grid gap-10 lg:grid-cols-[1fr_.25fr]">
        <section
          className="rounded border-2 border-black bg-cover bg-center bg-no-repeat p-4"
          style={{
            backgroundImage: "url('./stages/stage-1.png')",
          }}
        >
          <PvpGame data={updatedData} userId={userId} />
        </section>
        <section className="hidden h-96 scroll-auto rounded border-2 border-black p-4 lg:block">
          <h1 className="mb-2 border-b-4 border-black pb-2 text-sm font-bold">
            PVP (Speed Run) Leaderboard
          </h1>
          <PvpLeaderboard leaderboard={leaderboard} getUsername={getUsername} />
        </section>
      </div>
    </main>
  );
}
export default PVPPage;
