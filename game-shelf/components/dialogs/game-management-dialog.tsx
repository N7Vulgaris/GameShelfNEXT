"use client";
import { Plus } from "lucide-react";
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
import { createVideogame } from "@/lib/actions/games";

const INITIAL_FORM_DATA = {
  title: "",
  platform: "",
  releaseYear: "",
  coverImageUrl: "",
  developer: "",
  publisher: "",
  genre: "",
  reviewScore: "",
};

export default function GameManagementDialog() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    try {
      const result = await createVideogame({
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
        setFormData(INITIAL_FORM_DATA);
        setIsOpen(false);
      } else {
        console.error("Failed to create videogame", result.error);
        setError(`Failed to create videogame ${result.error}`);
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger
        render={(props) => (
          <Button
            {...props}
            className="h-full bg-green-400 hover:bg-green-700 text-black border-2 border-black"
          >
            Add new game
            <Plus />
          </Button>
        )}
      ></DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new game:</DialogTitle>

          <DialogDescription>
            Fields markes with a * are required
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit}>
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
              Add new
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
