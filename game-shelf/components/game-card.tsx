import { Game } from "@/lib/models/models.types";
import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <div className="flex flex-col border rounded p-3">
      {game.coverImageUrl ? (
        <Image src={game.coverImageUrl} alt={"Game Cover"} />
      ) : (
        <div className="flex flex-col items-center justify-center">
          <ImageIcon className="h-auto w-full" />
          No image
        </div>
      )}

      <div className="border rounded p-3">
        <h2>Title: {game.title}</h2>
        <p>Developer: {game.developer}</p>
        <p>Publisher: {game.publisher}</p>
        <p>Platform: {game.platform}</p>
        {game.reviewScore && <p>Review score: {game.reviewScore}</p>}
        <p>Genre: {game.genre}</p>
      </div>
    </div>
  );
}
