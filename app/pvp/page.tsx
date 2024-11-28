import { Button } from "@/components/ui/button";
import { PvpMenu } from "./components/pvp-menu";
import { handleAuth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";
import { PvpGame } from "./components/pvp-game";
import { getAllPvpQuestions, getPvpLeaderboard } from "@/actions/pvp";
import { shuffle, shuffleData } from "@/lib/utils";

import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AlertDialogHeader } from "@/components/ui/alert-dialog";
import { PvpLeaderboard } from "./components/pvp-leaderboard";
import Link from "next/link";

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
    <main className="flex min-h-screen flex-col gap-5 py-10">
      <div className="container flex w-full items-center justify-between">
        <Button asChild className="gameBtn bg-red-500 text-black">
          <Link href={"/start"}>Back</Link>
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gameBtn bg-green-300 p-5 text-black">
              Leaderboard
            </Button>
          </DialogTrigger>
          <DialogContent>
            <AlertDialogHeader>
              <DialogTitle>LEADERBOARD</DialogTitle>
            </AlertDialogHeader>
            <PvpLeaderboard
              getUsername={getUsername}
              leaderboard={leaderboard}
            />
          </DialogContent>
        </Dialog>
      </div>
      <PvpGame data={shuffleData(updatedData.slice(0, 25))} userId={userId} />
    </main>
  );
}
export default PVPPage;
