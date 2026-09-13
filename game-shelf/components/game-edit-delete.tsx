import GameDeleteDialog from "./dialogs/game-delete-dialog";
import { Game } from "@/lib/models/models.types";
import GameEditDialog from "./dialogs/game-edit-dialog";

interface GameEditAndDeleteProps {
  game: Game;
}

export default function GameEditAndDelete({ game }: GameEditAndDeleteProps) {
  return (
    <div className="flex flex-row justify-between mt-auto gap-2">
      <GameDeleteDialog game={game} />
      <GameEditDialog game={game} />
    </div>
  );
}
