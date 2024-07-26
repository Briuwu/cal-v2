"use client";
import { handleLearningComplete } from "@/actions/learning";
import { Button } from "@/components/ui/button";

function LearningPage({
  searchParams: { stageId, levelNumber },
}: {
  searchParams: {
    stageId: string;
    levelNumber: string;
  };
}) {
  return (
    <main className="grid min-h-dvh place-content-center">
      <div className="flex flex-col items-center gap-5 rounded-md bg-red-500 p-5">
        <h1 className="text-xl uppercase text-white">Soon to be implemented</h1>
        <Button
          onClick={async () =>
            await handleLearningComplete(Number(stageId), Number(levelNumber))
          }
        >
          Proceed to Next Level
        </Button>
      </div>
    </main>
  );
}
export default LearningPage;
