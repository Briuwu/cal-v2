import { cn } from "@/lib/utils";
import { Levels } from "./levels";
import { getAllStages } from "@/actions/stages";

export const AllStages = async () => {
  const stages = await getAllStages();
  const stageColors = [
    "bg-green-500",
    "bg-yellow-500",
    "bg-blue-500",
    "bg-pink-500",
    "bg-purple-500",
  ];

  const stagesWithColors = stages.map((stage, index) => ({
    ...stage,
    color: stageColors[index],
  }));

  return (
    <div className="space-y-10">
      {stagesWithColors.map((stage) => (
        <div key={stage.id} className="space-y-5">
          <div
            className={cn(
              "rounded-md border-2 border-black p-10 text-white",
              stage.color,
            )}
          >
            <h1 className="text-lg font-bold md:text-xl lg:text-2xl">
              {stage.stageName}
            </h1>
          </div>
          <Levels levels={stage.levels} userProgress={stage.userProgress} />
        </div>
      ))}
    </div>
  );
};
