import { Game } from "@/lib/models/models.types";
import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  return (
    <div className="flex flex-col border-2 rounded-2xl border-gray-300 p-3">
      {game.coverImageUrl ? (
        <Image src={game.coverImageUrl} alt={"Game Cover"} />
      ) : (
        <div className="flex flex-col items-center justify-center">
          <ImageIcon className="h-auto w-full" />
          No image
        </div>
      )}

      <div className="border rounded-2xl p-3 bg-gray-100 font-semibold h-full">
        <h2 className="border-b-2">Title: {game.title}</h2>
        <p className="border-b-2">Developer: {game.developer}</p>
        <p className="border-b-2">Publisher: {game.publisher}</p>
        <div className="border-b-2 flex flex-col">
          <p>Platform:</p>
          <div className="">
            {game.platform.map((pla, key) => (
              <p key={key}>{pla}</p>
            ))}
          </div>
        </div>
        {game.reviewScore && (
          <p className="border-b-2">Review score: {game.reviewScore}</p>
        )}
        <div>
          <p>Genre:</p>
          <div>
            {game.genre.map((gen, key) => (
              <p key={key}>{gen}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
