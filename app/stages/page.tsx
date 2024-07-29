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

  const hasCharacter = await db.query.users.findFirst({
    where: eq(users.email, user.emailAddresses[0].emailAddress),
  });

  if (!hasCharacter) {
    redirect("/character-selection");
  }
  return (
    <main className="p-5">
      <AllStages />
    </main>
  );
};
export default StagesPage;
