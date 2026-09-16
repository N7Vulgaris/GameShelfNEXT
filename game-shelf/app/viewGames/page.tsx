import GamesManager from "@/components/games-manager";
import { getGames } from "@/lib/services/gameServices";

export const dynamic = "force-dynamic";

export default async function ViewGamesPage() {
  const games = await getGames();

  return (
    <div>
      <GamesManager initialGames={games} />
    </div>
  );
}
