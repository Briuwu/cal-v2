import { Button } from "@/components/ui/button";
import { db } from "@/db";
import { users } from "@/db/schema";
import { handleAuth, handleCurrentUser } from "@/lib/auth";
import { SignOutButton } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";

async function StartPage() {
  const userId = handleAuth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await db.query.users.findFirst({
    where: eq(users.userId, userId),
  });

  if (!user) {
    redirect("/sign-in");
  }

  console.log(user);

  let pvpLocked = user.currentLevel < 30;

  console.log(pvpLocked);
  return (
    <main
      style={{
        backgroundImage: "url('/start/bg.png')",
      }}
      className="grid min-h-dvh place-content-center bg-cover bg-bottom"
    >
      <div className="space-y-10">
        <div className="text-center font-bold uppercase">
          <h1 className="text-xl md:text-2xl lg:text-5xl">
            Ctrl + Alt + Learn
          </h1>
          <p>The Adventure of Learning</p>
        </div>
        <div className="mx-auto flex max-w-sm flex-col items-center space-y-5">
          <Button
            asChild
            className="w-full border border-black bg-green-500 py-7 font-bold uppercase hover:bg-green-300"
          >
            <Link href="character-selection">Start Game</Link>
          </Button>
          {pvpLocked ? (
            <Button
              disabled={pvpLocked}
              className="w-full border border-black bg-white py-7 font-bold uppercase text-black hover:bg-black hover:text-white"
            >
              PvP (Speed Run) requires level 30
            </Button>
          ) : (
            <Button
              asChild
              disabled={pvpLocked}
              className="w-full border border-black bg-white py-7 font-bold uppercase text-black hover:bg-black hover:text-white"
            >
              <Link href="/pvp" aria-disabled={pvpLocked}>
                PvP (Speed Run)
              </Link>
            </Button>
          )}
          <Button
            asChild
            className="w-full border border-black bg-red-500 py-7 font-bold uppercase hover:bg-red-300"
          >
            <SignOutButton>Logout</SignOutButton>
          </Button>
        </div>
      </div>
    </main>
  );
}
export default StartPage;
