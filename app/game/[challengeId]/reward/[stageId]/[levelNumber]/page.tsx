import Image from "next/image";
import { Game } from "./components/game";
import { getLevel } from "@/actions/stages";
import { redirect } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { getProfile } from "@/actions/profile";
import { backgroundImg, backgroundStage } from "@/lib/backgrounds";

async function RewardPage({
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

  if (level.type !== "reward") {
    redirect("/stages");
  }

  return (
    <main className="relative grid min-h-dvh place-content-center bg-green-300">
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element*/}
        <Image
          fill
          src={backgroundStage[level.stageId as keyof typeof backgroundStage]}
          alt="Background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black opacity-70"></div>
      </div>
      <Button asChild>
        <Link href="/stages" className="left-0 top-0 m-4 text-sm lg:absolute">
          <ChevronLeft className="w-5" />
          Go Back
        </Link>
      </Button>
      <div className="relative max-w-[375px] overflow-hidden border-2 border-white md:max-w-[768px] lg:max-w-full">
        <Image
          src={backgroundImg[level.levelNumber as keyof typeof backgroundImg]}
          alt=""
          width={925}
          height={660}
        />
        <Game
          level={level}
          characterType={profile.selectedCharacter.id}
          stageId={Number(params.stageId)}
        />
      </div>
    </main>
  );
}
export default RewardPage;
