import { AllStages } from "./components/all-stages";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";
import { db } from "@/db";
import { handleAuth, handleCurrentUser } from "@/lib/auth";
import { AudioPlayer } from "@/components/audio-player";

const StagesPage = async () => {
  const userId = handleAuth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await handleCurrentUser();

  if (!user) {
    redirect("/sign-in");
  }

  const hasCharacter = await db
    .select()
    .from(users)
    .where(eq(users.userId, user.id));

  if (hasCharacter.length === 0) {
    redirect("/start");
  }

  return (
    <main>
      <AudioPlayer audioId={2} />
      <h1 className="my-5 text-center font-bold uppercase text-red-500 md:text-3xl">
        All Stages are unlocked for demo purposes. Please select a stage to
        play.
      </h1>
      <AllStages />
    </main>
  );
};
export default StagesPage;
