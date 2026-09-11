import GameCard from "./game-card";
import { Game as GameType } from "@/lib/models/models.types";

interface GameListProps {
  games: GameType[];
}

export default function GamesList({ games }: GameListProps) {
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
