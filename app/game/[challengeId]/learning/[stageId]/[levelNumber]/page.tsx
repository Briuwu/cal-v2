import { NextButton } from "./components/next-button";

function LearningPage({
  searchParams: { stageId, levelNumber },
}: {
  searchParams: {
    stageId: number;
    levelNumber: number;
  };
}) {
  return (
    <main className="grid min-h-dvh place-content-center">
      <div className="flex flex-col items-center gap-5 rounded-md bg-red-500 p-5">
        <h1 className="text-xl uppercase text-white">Soon to be implemented</h1>
        <NextButton stageId={stageId} levelNumber={levelNumber} />
      </div>
    </main>
  );
}
export default LearningPage;
