"use client";
import { ImageIcon, Plus } from "lucide-react";
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
import { createVideogame } from "@/lib/actions/games";

const INITIAL_FORM_DATA = {
  title: "",
  platform: "",
  releaseDate: "",
  coverImageUrl: null as File | null,
  coverImageId: "",
  developer: "",
  publisher: "",
  genre: "",
  reviewScore: "",
};

interface GameAddNewDialogProps {
  onSuccess: () => void;
}

export default function GameAddNewDialog({ onSuccess }: GameAddNewDialogProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [error, setError] = useState("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, coverImageUrl: e.target.files[0] });
    }
  };

  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result as string);
      fileReader.onerror = (error) => reject(error);
    });
  };

  async function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();
    setIsUploading(true);
    setError("");

    try {
      let base64Image = "";
      if (formData.coverImageUrl) {
        base64Image = await convertFileToBase64(formData.coverImageUrl);
      }

      const gameData = {
        title: formData.title,
        developer: formData.developer,
        publisher: formData.publisher,
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
        coverImageUrl: base64Image || undefined,
      };

      const result = await createVideogame(gameData);

      if (result.success) {
        setFormData(INITIAL_FORM_DATA);
        setIsOpen(false);
        onSuccess?.();
      } else {
        setError(`Failed to create videogame: ${result.error}`);
      }
    } catch (err) {
      setError(`An unexpected error ocurred: ${err}`);
    } finally {
      setIsUploading(false);
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

      <DialogContent className="min-w-0">
        <DialogHeader>
          <DialogTitle>Add a new game:</DialogTitle>

          <DialogDescription>
            Fields markes with a * are required
          </DialogDescription>
        </DialogHeader>

        <form className="min-w-0" onSubmit={handleSubmit}>
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
                className={`w-full flex items-center justify-center gap-2 border-dashed border-2 py-6 rounded-md 
                  cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-900 transition 
                  ${formData.coverImageUrl ? "border-green-500 bg-green-50/20" : "border-gray-300"}`}
              >
                <ImageIcon className="h-5 w-5 text-gray-400" />
                <span className="text-sm font-medium">
                  {formData.coverImageUrl
                    ? `Selected ${formData.coverImageUrl.name}`
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
              disabled={isUploading}
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isUploading}
              className="bg-green-400 hover:bg-green-700 text-black"
            >
              {isUploading ? "Uploading game..." : "Add new"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
