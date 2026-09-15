import GameDeleteDialog from "./dialogs/game-delete-dialog";
import { Game } from "@/lib/models/models.types";
import GameEditDialog from "./dialogs/game-edit-dialog";
import { usePathname, useRouter } from "next/navigation";

interface GameEditAndDeleteProps {
  game: Game;
}

export default function GameEditAndDelete({ game }: GameEditAndDeleteProps) {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex flex-row gap-2 justify-end">
      <GameDeleteDialog
        game={game}
        onSuccess={() => {
          if (pathname === "/management") {
            router.refresh();
          } else {
            router.back();
            router.refresh();
          }
        }}
      />
      <GameEditDialog
        game={game}
        onSuccess={() => {
          router.refresh();
        }}
      />
    </div>
  );
}
