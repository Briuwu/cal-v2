"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
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
import { createProfile } from "@/actions/create-profile";

import { toast } from "sonner";

export const CharacterSelect = () => {
  const [selectedCharacter, setSelectedCharacter] = useState<1 | 2>();

  const handleConfirmSelection = async () => {
    if (!selectedCharacter) {
      toast.error("Please select a character");
      return;
    }
    toast.success("Character confirmed successfully");
    await createProfile(selectedCharacter);
  };
  return (
    <div className="grid items-center gap-5">
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        <Button
          className={cn(
            "h-auto border-2 p-10",
            selectedCharacter === 1 && "bg-gray-200",
          )}
          variant={"ghost"}
          onClick={() => setSelectedCharacter(1)}
        >
          <Image
            src="/characters/male_beginner.png"
            alt=""
            width={180}
            height={304}
          />
        </Button>
        <Button
          className={cn(
            "h-auto border-2 p-10",
            selectedCharacter === 2 && "bg-gray-200",
          )}
          variant={"ghost"}
          onClick={() => setSelectedCharacter(2)}
        >
          <Image
            src="/characters/female_beginner.png"
            alt=""
            width={160}
            height={304}
          />
        </Button>
      </div>
      {selectedCharacter && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button className="uppercase hover:bg-opacity-80">
              Confirm Selection
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will be your permanent character selection. You cannot undo
                this action.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleConfirmSelection}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
};