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
  return (
    <Button
      onClick={async () => {
        await handleLearningComplete(stageId, levelNumber);
      }}
    >
      Proceed to Next Level
    </Button>
  );
};
