import { pvpLeaderboard } from "@/db/schema";

type Props = {
  leaderboard: (typeof pvpLeaderboard.$inferSelect)[];
  getUsername: (userId: string) => Promise<string | undefined>;
};

export const PvpLeaderboard = ({ leaderboard, getUsername }: Props) => {
  return (
    <ul className="space-y-2 divide-y-2">
      {leaderboard.map((user, index) => {
        const username = getUsername(user.userId);
        const rank = index + 1;
        return (
          <li key={index} className="flex items-center">
            <span className="mr-1">{rank}.</span>
            <div>
              <span className="mr-1 font-bold">{username}</span>
              <span className="text-xs opacity-50">{user.score}pt</span>
            </div>
            <span className="ml-auto">{user.totalPoints} pts</span>
          </li>
        );
      })}
    </ul>
  );
};
