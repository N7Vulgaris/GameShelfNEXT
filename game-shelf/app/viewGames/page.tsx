import GamesManager from "@/components/games-manager";
import { getGames } from "@/lib/services/gameServices";

export default async function ViewGamesPage() {
  const games = await getGames();

  return (
    <div>
      <GamesManager initialGames={games} />
    </div>
  );
}
