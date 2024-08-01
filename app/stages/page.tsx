import { auth, currentUser } from "@clerk/nextjs/server";
import { AllStages } from "./components/all-stages";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { users } from "@/db/schema";
import { db } from "@/db";

const StagesPage = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const user = await currentUser();

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
    <main className="py-5">
      <AllStages />
    </main>
  );
};
export default StagesPage;
