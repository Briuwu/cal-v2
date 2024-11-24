"use client";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
//   AlertDialogTrigger,
// } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { getNPCImage } from "@/lib/npc";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@uidotdev/usehooks";
import Image from "next/image";

type Props = {
  dialogue: {
    name: string;
    text: string;
    image?: string;
  };
  onNextDialogue: () => void;
  onPreviousDialogue: () => void;
  onSkipDialogue: () => void;
  playerName: string;
  charSrc: string;
  stageId: number;
};
export const Dialogue = ({
  dialogue,
  onNextDialogue,
  onSkipDialogue,
  playerName,
  charSrc,
  stageId,
  onPreviousDialogue,
}: Props) => {
  const npcImage = getNPCImage(stageId);
  const isLargeDevice = useMediaQuery("only screen and (min-width : 1024px)");
  return !isLargeDevice ? (
    <div className="flex flex-col gap-2 rounded-md bg-white p-4 text-sm md:text-base">
      <p className="font-bold uppercase">
        {dialogue.name === "player" ? playerName : dialogue.name}
      </p>
      <hr />
      <p className="text-black/75">{dialogue.text}</p>
      <div className="flex items-center justify-between border-t-2 border-black pt-4">
        {/* <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant={"destructive"}
              className="transition hover:scale-105 active:scale-95"
            >
              Skip Dialogue
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>
                Are you absolutely sure you want to skip the dialogue?
              </AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. You will miss out on important
                information.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={onSkipDialogue}>
                Yes, skip it
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog> */}
        <Button
          onClick={onPreviousDialogue}
          variant={"destructive"}
          className="w-fit text-xs transition hover:scale-105 active:scale-95"
        >
          Previous
        </Button>
        <Button
          onClick={onNextDialogue}
          variant={"ghost"}
          className="text-xs transition hover:scale-105 active:scale-95"
        >
          Next
        </Button>
      </div>
    </div>
  ) : (
    <div className="absolute bottom-10 left-0 right-0">
      <Image
        src={charSrc}
        alt=""
        width={125}
        height={125}
        className="relative -z-10 translate-y-16"
      />
      <Image
        src={npcImage}
        alt=""
        width={100}
        height={100}
        className="absolute right-6 top-0 translate-y-16"
      />
      <div className="relative z-[99] grid min-h-56 grid-rows-[auto,1fr,auto] rounded-xl bg-white p-5">
        <p
          className={cn(
            "font-bold uppercase",
            dialogue.name === "player"
              ? "justify-self-start"
              : "justify-self-end",
          )}
        >
          {dialogue.name === "player" ? playerName : dialogue.name}
        </p>
        <div className="p-2">
          <p className="text-center leading-relaxed tracking-wide">
            {dialogue.text}
          </p>
          {dialogue.image && (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={`/${dialogue.image}`}
              alt=""
              className="absolute left-0 right-0 top-0 mx-auto max-w-[500px] -translate-y-80 border-4 border-white"
            />
          )}
        </div>
        <div className="flex justify-between border-t-2 border-black pt-4">
          <Button
            onClick={onPreviousDialogue}
            variant={"destructive"}
            className="w-fit text-xs transition hover:scale-105 active:scale-95"
          >
            Previous
          </Button>
          <Button
            onClick={onNextDialogue}
            variant={"default"}
            className="w-fit text-xs transition hover:scale-105 active:scale-95"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
