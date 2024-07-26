import { Levels } from "./levels";
import { getAllStages } from "@/actions/stages";

export const AllStages = async () => {
  const stages = await getAllStages();

  return (
    <div className="space-y-10">
      {stages.map((stage) => (
        <div key={stage.id} className="space-y-5">
          <div className="rounded-md border-2 border-black bg-green-500 p-10 text-white">
            <h1 className="text-lg font-bold uppercase md:text-xl lg:text-2xl">
              {stage.stageName}
            </h1>
          </div>
          <Levels levels={stage.levels} userProgress={stage.userProgress} />
        </div>
      ))}
    </div>
  );
};
