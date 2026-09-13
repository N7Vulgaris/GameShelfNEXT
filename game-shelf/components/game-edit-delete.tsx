import { Edit, Image as ImageIcon } from "lucide-react";
import { Button } from "./ui/button";
import GameDeleteDialog from "./game-delete-dialog";
import { Game } from "@/lib/models/models.types";

interface GameEditAndDeleteProps {
  game: Game;
}

export default function GameEditAndDelete({ game }: GameEditAndDeleteProps) {
  return (
    <div className="flex flex-row justify-between mt-auto gap-2">
      <GameDeleteDialog game={game} />

      <Button className="bg-blue-600">
        Edit
        <Edit />
      </Button>
    </div>
  );
}
