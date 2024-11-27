import Image from "next/image";
import { Game } from "./components/game";
import { getLevel } from "@/actions/stages";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getProfile } from "@/actions/profile";
import { dialogues as dataDialogues } from "@/lib/dialogues";
import { Guidebook } from "@/app/game/[challengeId]/components/guidebook";
import { backgroundImg } from "@/lib/backgrounds";

async function LearningPage({
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

  if (level.type !== "learning") {
    redirect("/stages");
  }

  const dialogues = dataDialogues[level.name as keyof typeof dataDialogues];

  return (
    <main className="relative grid min-h-dvh place-content-center bg-green-300">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element*/}
        <img
          src={level.stage.stageBgUrl}
          alt="Background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-70"></div>
      </div>
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
        <Image
          src={backgroundImg[level.levelNumber as keyof typeof backgroundImg]}
          alt=""
          width={925}
          height={660}
          className="border-2 border-white"
        />
        <Game
          level={level}
          characterType={profile.selectedCharacter.id}
          dialogues={dialogues}
          playerName={profile.username}
          stageId={Number(params.stageId)}
          charSrc={profile.selectedCharacter.characterSrc}
        />
      </div>
    </main>
  );
}
export default LearningPage;
