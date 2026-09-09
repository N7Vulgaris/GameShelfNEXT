import { Game } from "@/lib/models/models.types";
import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <div className="flex flex-col">
      {game.coverImageUrl ? (
        <Image src={game.coverImageUrl} alt={"Game Cover"} />
      ) : (
        <div className="flex flex-col items-center justify-center">
          <ImageIcon className="h-auto w-full" />
          No image
        </div>
      )}

      <div>
        <h2>Title: {game.title}</h2>
        <p>Developer: {game.developer}</p>
        <p>Publisher: {game.publisher}</p>
        <p>Genre: {game.genre}</p>
      </div>
    </div>
  );
}
