import { auth, currentUser } from "@clerk/nextjs/server";
import { CharacterSelect } from "./components/character-select";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";

async function CharacterSelectionPage() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await currentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const hasCharacter = await db.query.users.findFirst({
    where: eq(users.email, user.emailAddresses[0].emailAddress),
  });

  if (hasCharacter) {
    redirect("/stages");
  }
  return (
    <main className="grid min-h-dvh place-content-center">
      <div className="space-y-10">
        <h1 className="text-center text-xl font-bold uppercase md:text-2xl lg:text-5xl">
          Character Selection
        </h1>
        <CharacterSelect />
      </div>
    </main>
  );
}
export default CharacterSelectionPage;
