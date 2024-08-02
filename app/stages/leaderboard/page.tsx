import { getLeaderboardProfiles } from "@/actions/profile";

async function LeaderboardPage() {
  const leaderboard = await getLeaderboardProfiles();

  if (!leaderboard) {
    return <div>Wow... so empty, start playing to be on the leaderboard!</div>;
  }
  return (
    <div>
      {leaderboard?.map((player) => <p key={player.id}>{player.username}</p>)}
    </div>
  );
}
export default LeaderboardPage;
