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
  onSuccess?: () => void;
}

export default function GameDeleteDialog({
  game,
  onSuccess,
}: GameDeleteDialogProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [error, setError] = useState("");

  async function handleDelete() {
    setIsDeleting(true);
    setError("");

    try {
      const result = await deleteVideogame(game._id);

      if (result.success) {
        setIsOpen(false);
        onSuccess?.();
      } else {
        setError(`Failed to delete videogame: ${result.error}`);
      }
    } catch (err) {
      setError(`Failed to delete videogame: ${err}`);
    } finally {
      setIsDeleting(false);
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

        {error && (
          <div className="text-destructive bg-destructive/10 rounded-sm p-3 my-3">
            {error}
          </div>
        )}

        <DialogFooter>
          <Button
            disabled={isDeleting}
            value="dotted"
            onClick={() => setIsOpen(false)}
          >
            Cancel
          </Button>
          <Button
            disabled={isDeleting}
            variant="destructive"
            onClick={() => handleDelete()}
          >
            {isDeleting ? "Deleting game..." : "Delete"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
