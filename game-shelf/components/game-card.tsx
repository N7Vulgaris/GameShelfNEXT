import { Game } from "@/lib/models/models.types";
import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";
import { useSession } from "@/lib/auth/auth-client";
import GameEditAndDelete from "./game-edit-delete";

interface GameCardProps {
  game: Game;
}

//TODO: Use Shadcn Aspect Ratio for image display?

export default function GameCard({ game }: GameCardProps) {
  const session = useSession();

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

      <div className="flex flex-col border rounded-2xl p-3 bg-gray-100 font-semibold h-full">
        <h2 className="border-b-2">Title: {game.title}</h2>
        <p className="border-b-2">Developer: {game.developer}</p>
        <p className="border-b-2">Publisher: {game.publisher}</p>
        <div className="border-b-2 flex flex-col">
          <p>Platform:</p>
          <div className="grid grid-cols-2">
            {game.platform.map((pla, key) => (
              <p key={key}>{pla}</p>
            ))}
          </div>
        </div>
        <p className="border-b-2">
          Release date: {game.releaseYear.toLocaleDateString("en-US")}
        </p>
        {game.reviewScore && (
          <p className="border-b-2">Review score: {game.reviewScore}</p>
        )}
        <div>
          <p>Genre:</p>
          <div className="grid grid-cols-2">
            {game.genre.map((gen, key) => (
              <p key={key}>{gen}</p>
            ))}
          </div>
        </div>
        {session.data?.user && <GameEditAndDelete game={game} />}
      </div>
    </div>
  );
}
