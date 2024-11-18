import Image from "next/image";
import { Game } from "./components/game";
import { getLevel } from "@/actions/stages";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getProfile } from "@/actions/profile";
import { Guidebook } from "@/app/game/[challengeId]/components/guidebook";
import { BackButton } from "@/components/back-btn";

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
      <div className="flex items-center justify-between">
        <BackButton />
        <Guidebook stageName={level.name} />
      </div>
      <div className="relative max-w-[320px] overflow-hidden border-2 border-black md:max-w-[768px] lg:max-w-full">
        <Image src={level.stage.stageBgUrl} alt="" width={925} height={660} />
        <Game
          level={level}
          characterType={profile.selectedCharacter.id}
          coins={profile.coins}
          stageId={Number(params.stageId)}
        />
      </div>
    </main>
  );
}
export default ChallengePage;
