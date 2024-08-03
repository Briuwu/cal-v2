"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

type Props = {
  dialogue: {
    name: string;
    text: string;
  };
  onNextDialogue: () => void;
  onSkipDialogue: () => void;
  playerName: string;
};
export const Dialogue = ({
  dialogue,
  onNextDialogue,
  onSkipDialogue,
  playerName,
}: Props) => {
  return (
    <div className="flex flex-col gap-2 rounded-md bg-white p-4 text-sm md:text-base">
      <p className="font-bold uppercase">{playerName}</p>
      <hr />
      <p className="text-black/75">{dialogue.text}</p>
      <div className="flex items-center justify-between text-xs">
        <AlertDialog>
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
        </AlertDialog>
        <Button
          onClick={onNextDialogue}
          variant={"ghost"}
          className="text-xs transition hover:scale-105 active:scale-95"
        >
          Next
        </Button>
      </div>
    </div>
  );
};
