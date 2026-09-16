"use client";

import { Edit, ImageIcon } from "lucide-react";
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
import { ChangeEvent, useState } from "react";
import { Game } from "@/lib/models/models.types";
import { updateVideogame } from "@/lib/actions/games";

const MAX_COVER_IMAGE_BYTES = 5 * 1024 * 1024;

interface GameEditDialogProps {
  game: Game;
  onSuccess: () => void;
}

export default function GameEditDialog({
  game,
  onSuccess,
}: GameEditDialogProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [error, setError] = useState("");
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    title: game.title,
    platform: game.platform.join(", "),
    releaseDate: new Date(game.releaseDate).toISOString().split("T")[0],
    coverImageUrl: null as File | null,
    developer: game.developer,
    publisher: game.publisher,
    genre: game.genre.join(", "),
    reviewScore: game.reviewScore?.toString(),
  });

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];

      if (file.size > MAX_COVER_IMAGE_BYTES) {
        setError("Cover image must be 5 MB or smaller");
        e.target.value = "";
        return;
      }

      setError("");
      setFormData({ ...formData, coverImageUrl: file });
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result as string);
      fileReader.onerror = reject;
    });
  };

  async function handleUpdate(e: React.SubmitEvent) {
    e.preventDefault();
    setError("");
    setIsUpdating(true);

    try {
      const base64Image = formData.coverImageUrl
        ? await convertFileToBase64(formData.coverImageUrl)
        : undefined;

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
        releaseDate: new Date(formData.releaseDate),
        reviewScore: Number(formData.reviewScore),
        coverImageUrl: base64Image,
      });

      if (result.success) {
        setIsOpen(false);
        onSuccess?.();
      } else {
        setError(`An error occured while updating: ${result.error}`);
      }
    } catch (err) {
      setError(`An error occured while updating: ${err}`);
    } finally {
      setIsUpdating(false);
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
                value={formData.releaseDate}
                onChange={(e) =>
                  setFormData({ ...formData, releaseDate: e.target.value })
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
              <Label htmlFor="imageCover">Cover image</Label>
              <Label
                htmlFor="imageCover"
                className={`w-full flex items-center justify-center gap-2 border-dashed border-2 py-6 rounded-md cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-900 transition ${formData.coverImageUrl ? "border-green-500 bg-green-50/20" : "border-gray-300"}`}
              >
                <ImageIcon className="h-5 w-5 text-gray-400" />
                <span className="text-sm font-medium">
                  {game.coverImageUrl
                    ? `Selected ${game.coverImageUrl}`
                    : "Choose Cover Image File"}
                </span>
              </Label>
              <Input
                id="imageCover"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              ></Input>
            </div>
          </div>

          {error && (
            <div className="text-destructive bg-destructive/10 rounded-sm p-3 my-3">
              {error}
            </div>
          )}

          <DialogFooter>
            <Button
              disabled={isUpdating}
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isUpdating}
              className="bg-green-400 hover:bg-green-700 text-black"
            >
              {isUpdating ? "Updating game..." : "Update"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
