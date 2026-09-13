import { DeleteIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useState } from "react";
import { Game } from "@/lib/models/models.types";
import { deleteVideogame } from "@/lib/actions/games";

interface GameDeleteDialogProps {
  game: Game;
}

export default function GameDeleteDialog({ game }: GameDeleteDialogProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  async function handleDelete() {
    try {
      const result = await deleteVideogame(game._id);

      if (result.error) {
        console.error("Failed to delete videogame:", result.error);
      } else {
        setIsOpen(false);
      }
    } catch (err) {
      console.error("Failed to move videogame: ", err);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={(props) => (
          <Button {...props} className="bg-destructive hover:bg-destructive/50">
            Delete
            <DeleteIcon />
          </Button>
        )}
      ></DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete {game.title}?</DialogTitle>
          <DialogDescription>
            This action permanently deletes the game from the database. Are you
            sure?
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button value="dotted" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" onClick={() => handleDelete()}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
