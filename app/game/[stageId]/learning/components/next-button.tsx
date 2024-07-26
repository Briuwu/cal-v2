"use client";
import { useRouter } from "next/navigation";
import { handleLearningComplete } from "@/actions/learning";
import { Button } from "@/components/ui/button";

export const NextButton = ({
  stageId,
  levelNumber,
}: {
  stageId: number;
  levelNumber: number;
}) => {
  const router = useRouter();
  return (
    <Button
      onClick={async () => {
        await handleLearningComplete(Number(stageId), Number(levelNumber));
        router.push("/game/3/mini-challenge?stageId=1&levelNumber=2");
      }}
    >
      Proceed to Next Level
    </Button>
  );
};
