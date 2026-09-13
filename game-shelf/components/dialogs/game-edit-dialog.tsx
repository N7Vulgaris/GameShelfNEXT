import { Edit } from "lucide-react";
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
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useState } from "react";
import { Game } from "@/lib/models/models.types";
import { updateVideogame } from "@/lib/actions/games";

interface GameEditDialogProps {
  game: Game;
}

export default function GameEditDialog({ game }: GameEditDialogProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    title: game.title,
    platform: game.platform.join(", "),
    releaseYear: new Date(game.releaseYear).toISOString().split("T")[0],
    coverImageUrl: game.coverImageUrl || "",
    developer: game.developer,
    publisher: game.publisher,
    genre: game.genre.join(", "),
    reviewScore: game.reviewScore?.toString(),
  });

  async function handleUpdate(e: React.SubmitEvent) {
    e.preventDefault();

    try {
      const result = await updateVideogame(game._id, {
        ...formData,
        platform: formData.platform
          .split(",")
          .map((plat) => plat.trim())
          .filter((plat) => plat.length > 0),
        genre: formData.genre
          .split(",")
          .map((gen) => gen.trim())
          .filter((gen) => gen.length > 0),
        releaseYear: new Date(formData.releaseYear),
        reviewScore: Number(formData.reviewScore),
      });

      if (!result.error) {
        setIsOpen(false);
      } else {
        setError(`An error occured while updating: ${result.error}`);
      }
    } catch (err) {
      console.error("Failed to move job application: ", err);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={(props) => (
          <Button {...props} className="bg-blue-600 hover:bg-blue-800">
            Edit
            <Edit />
          </Button>
        )}
      ></DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit game:</DialogTitle>

          <DialogDescription>
            Fields markes with a * are required
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleUpdate}>
          <div className="flex flex-col gap-y-4">
            <div className="grid grid-cols-2 gap-2">
              <div className="flex flex-col gap-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  required
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                ></Input>
              </div>
              <div className="flex flex-col gap-y-2">
                <Label htmlFor="developer">Developer *</Label>
                <Input
                  id="developer"
                  required
                  value={formData.developer}
                  onChange={(e) =>
                    setFormData({ ...formData, developer: e.target.value })
                  }
                ></Input>
              </div>
              <div className="flex flex-col gap-y-2">
                <Label htmlFor="publisher">Publiser *</Label>
                <Input
                  id="publisher"
                  required
                  value={formData.publisher}
                  onChange={(e) =>
                    setFormData({ ...formData, publisher: e.target.value })
                  }
                ></Input>
              </div>
              <div className="flex flex-col gap-y-2">
                <Label htmlFor="platform">Platform(s) *</Label>
                <Input
                  id="platform"
                  required
                  value={formData.platform}
                  onChange={(e) =>
                    setFormData({ ...formData, platform: e.target.value })
                  }
                ></Input>
              </div>
            </div>
            <div className="flex flex-col gap-y-2">
              <Label htmlFor="releaseDate">Release date *</Label>
              <Input
                id="releaseDate"
                type="date"
                required
                value={formData.releaseYear}
                onChange={(e) =>
                  setFormData({ ...formData, releaseYear: e.target.value })
                }
              ></Input>
            </div>
            <div className="flex flex-col gap-y-2">
              <Label htmlFor="genre">Genre(s)</Label>
              <Input
                id="genre"
                value={formData.genre}
                onChange={(e) =>
                  setFormData({ ...formData, genre: e.target.value })
                }
              ></Input>
            </div>
            <div className="flex flex-col gap-y-2">
              <Label htmlFor="review">Review score</Label>
              <Input
                id="review"
                type="number"
                value={formData.reviewScore}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    reviewScore: e.target.value,
                  })
                }
              ></Input>
            </div>

            <div className="flex flex-col gap-y-2">
              <Label htmlFor="image">Cover image</Label>
              <Input
                id="image"
                type="file"
                value={formData.coverImageUrl}
                onChange={(e) =>
                  setFormData({ ...formData, coverImageUrl: e.target.value })
                }
              ></Input>
            </div>
          </div>

          {error && <div>{error}</div>}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-green-400 hover:bg-green-700 text-black"
            >
              Update
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
