import { useSession } from "@/lib/auth/auth-client";
import GameCard from "./game-card";
import { Game as GameType } from "@/lib/models/models.types";
import { usePathname } from "next/navigation";

interface GameListProps {
  games: GameType[];
}

export default function GamesList({ games }: GameListProps) {
  const session = useSession();
  const pathname = usePathname();

  const canManageGames =
    session.data?.user.role === "admin" && pathname !== "/viewGames";

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-4 items-stretch gap-2">
        {games.map((game) => (
          <GameCard key={game._id} game={game} canManage={canManageGames} />
        ))}
      </div>
    </div>
  );
}
