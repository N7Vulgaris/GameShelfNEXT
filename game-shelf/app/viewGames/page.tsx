import GamesManager from "@/components/games-manager";
import { getGames } from "@/lib/services/gameServices";

//TODO: Switch from State Lifting (Game Manager Wrapper) to URL Search parameters for searching and sorting

export default async function ViewGamesPage() {
  const games = await getGames();

  return (
    <div>
      <GamesManager initialGames={games} />
    </div>
  );
}
