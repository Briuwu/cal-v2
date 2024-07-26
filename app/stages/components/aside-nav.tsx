"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

export const StagesAside = () => {
  const pathname = usePathname();
  const choices = [
    {
      label: "Learn",
      link: "/stages",
      icon: "/stages/learn-icon.png",
      active: pathname === "/stages",
    },
    {
      label: "Leaderboard",
      link: "/stages/leaderboard",
      icon: "/stages/leaderboard-icon.png",
      active: pathname === "/stages/leaderboard",
    },
    {
      label: "Achievements",
      link: "/stages/achievements",
      icon: "/stages/achievements-icon.png",
      active: pathname === "/stages/achievements",
    },
    {
      label: "Daily Quests",
      link: "/stages/daily-quests",
      icon: "/stages/daily-quest-icon.png",
      active: pathname === "/stages/daily-quests",
    },
  ];
  return (
    <aside className="sticky left-0 hidden w-[300px] border-r-2 border-black p-5 lg:block">
      <nav>
        <ul className="space-y-3">
          {choices.map((choice) => (
            <li
              key={choice.label}
              className={cn("rounded", choice.active && "bg-green-300")}
            >
              <Button
                asChild
                variant={"ghost"}
                className={cn(
                  "w-full justify-start gap-2",
                  choice.active && "font-bold",
                )}
              >
                <span>
                  <Image
                    src={choice.icon}
                    alt=""
                    width={40}
                    height={30}
                    className="object-contain"
                  />
                  <Link href={choice.link}>{choice.label}</Link>
                </span>
              </Button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
