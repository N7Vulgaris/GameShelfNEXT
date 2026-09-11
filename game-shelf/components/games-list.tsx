import GameCard from "./game-card";
import { Game as GameType } from "@/lib/models/models.types";

/* async function getGames(): Promise<GameType[]> {
  await connenctDB();
  const games: GameType[] = await Game.find({}).lean();

  const serializedGames: GameType[] = games.map((game: GameType) => ({
    ...game,
    _id: game._id.toString(),
    releaseYear: new Date(game.releaseYear),
  }));

  return serializedGames;
} */

interface GameListProps {
  games: GameType[];
}

export default function GamesList({ games }: GameListProps) {
  //const games = await getGames();
  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        {games.map((game) => (
          <GameCard game={game} key={game._id} />
        ))}
      </div>
    </div>
  );
}
