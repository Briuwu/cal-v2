import { AllStages } from "./components/all-stages";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";
import { db } from "@/db";
import { handleAuth, handleCurrentUser } from "@/lib/auth";

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
      <AllStages />
    </main>
  );
};
export default StagesPage;
