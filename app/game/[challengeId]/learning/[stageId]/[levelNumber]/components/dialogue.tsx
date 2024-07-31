"use client";

import { Button } from "@/components/ui/button";

type Props = {
  dialogue: {
    name: string;
    text: string;
  };
  onNextDialogue: () => void;
};
export const Dialogue = ({ dialogue, onNextDialogue }: Props) => {
  return (
    <div className="flex flex-col gap-2 rounded-md bg-white p-4 text-sm md:text-base">
      <p className="font-bold uppercase">{dialogue.name}</p>
      <hr />
      <p className="text-black/75">{dialogue.text}</p>
      <Button
        onClick={onNextDialogue}
        variant={"ghost"}
        className="self-end text-xs transition hover:scale-105 active:scale-95"
      >
        Next
      </Button>
    </div>
  );
};
