import Image from "next/image";
import { Game } from "./components/game";
import { getLevel } from "@/actions/stages";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getProfile } from "@/actions/profile";
import { Guidebook } from "@/app/game/[challengeId]/components/guidebook";

async function BossPage({
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

  if (level.type !== "boss") {
    redirect("/stages");
  }

  return (
    <main className="grid min-h-dvh place-content-center bg-green-300">
      <div className="flex items-center justify-between">
        <Button asChild>
          <Link href="/stages" className="left-0 top-0 m-4 text-sm lg:absolute">
            <ChevronLeft className="w-5" />
            Go Back
          </Link>
        </Button>
        <Guidebook stageName={level.name} />
      </div>
      <div className="relative max-w-[320px] overflow-hidden border-2 border-black md:max-w-[768px] lg:max-w-full">
        <Image src={level.stage.stageBgUrl} alt="" width={925} height={660} />
        <Game
          level={level}
          characterType={profile.selectedCharacter.id}
          coins={profile.coins}
        />
      </div>
    </main>
  );
}
export default BossPage;
