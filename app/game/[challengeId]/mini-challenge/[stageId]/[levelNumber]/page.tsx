import Image from "next/image";
import { Game } from "./components/game";
import { getLevel } from "@/actions/stages";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Guidebook } from "./components/guidebook";
import { getProfile } from "@/actions/profile";

async function ChallengePage({
  params,
}: {
  params: { levelNumber: number; stageId: number };
}) {
  const level = await getLevel(
    Number(params.stageId),
    Number(params.levelNumber),
  );

  const profile = await getProfile();

  if (!level || !profile) {
    redirect("/stages");
  }

  if (level.type !== "mini-challenge") {
    redirect("/stages");
  }

  return (
    <main className="grid min-h-dvh place-content-center bg-green-300">
      <Guidebook />
      <Button asChild>
        <Link href="/stages" className="left-0 top-0 m-4 text-sm lg:absolute">
          <ChevronLeft className="w-5" />
          Go Back
        </Link>
      </Button>
      <div className="relative max-w-[375px] overflow-hidden border-2 border-black md:max-w-[768px] lg:max-w-full">
        <Image src="/stages/bg-1.png" alt="" width={925} height={660} />
        <Game
          level={level}
          characterType={profile.selectedCharacter.characterType}
        />
      </div>
    </main>
  );
}
export default ChallengePage;
