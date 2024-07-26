import Image from "next/image";
import { Game } from "./components/game";
import { getLevel } from "@/actions/stages";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

async function ChallengePage({
  params,
}: {
  params: { levelNumber: number; stageId: number };
}) {
  const level = await getLevel(
    Number(params.stageId),
    Number(params.levelNumber),
  );

  if (!level) {
    redirect("/stages");
  }

  if (level.type !== "mini-challenge") {
    redirect("/stages");
  }

  return (
    <main className="grid min-h-dvh place-content-center bg-green-300">
      <Button asChild>
        <Link href="/stages" className="absolute left-0 top-0 m-4 text-sm">
          <ChevronLeft className="w-5" />
          Go Back
        </Link>
      </Button>
      <div className="relative border-2 border-black">
        <Image src="/stages/bg-1.png" alt="" width={925} height={660} />
        <Game level={level} />
      </div>
    </main>
  );
}
export default ChallengePage;
