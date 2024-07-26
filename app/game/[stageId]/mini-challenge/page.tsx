import Image from "next/image";
import { Game } from "./components/game";
import { getLevel } from "@/actions/stages";
import { redirect } from "next/navigation";

async function ChallengePage({
  searchParams,
}: {
  searchParams: { levelNumber: number; stageId: number };
}) {
  const level = await getLevel(searchParams.stageId, searchParams.levelNumber);

  if (!level) {
    redirect("/stages");
  }

  if (level.type !== "mini-challenge") {
    redirect("/stages");
  }

  return (
    <main className="grid min-h-dvh place-content-center bg-green-300">
      <div className="relative border-2 border-black">
        <Image src="/stages/bg-1.png" alt="" width={925} height={660} />
        <Game level={level} />
      </div>
    </main>
  );
}
export default ChallengePage;
