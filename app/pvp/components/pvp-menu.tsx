import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { PvpLeaderboard } from "./pvp-leaderboard";
import { pvpLeaderboard } from "@/db/schema";

type Props = {
  leaderboard: (typeof pvpLeaderboard.$inferSelect)[];
  getUsername: (userId: string) => Promise<string | undefined>;
};

export const PvpMenu = ({ leaderboard, getUsername }: Props) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant={"ghost"} className="block lg:hidden">
          <Menu />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader className="mb-2 border-b-4 border-black pb-2">
          <SheetTitle>PVP (Speed Run) Leaderboard</SheetTitle>
        </SheetHeader>
        <PvpLeaderboard leaderboard={leaderboard} getUsername={getUsername} />
      </SheetContent>
    </Sheet>
  );
};
