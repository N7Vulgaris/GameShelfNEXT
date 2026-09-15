"use client";

import { Game } from "@/lib/models/models.types";
import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";
import { useSession } from "@/lib/auth/auth-client";
import GameEditAndDelete from "./game-edit-delete";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface GameCardProps {
  game: Game;
}

export default function GameCard({ game }: GameCardProps) {
  const session = useSession();
  const pathname = usePathname();

  return (
    <div className="flex h-full flex-col border-2 rounded-2xl border-gray-300 p-3">
      <Link href={`/games/${game._id}`} className="flex flex-1 flex-col">
        {game.coverImageUrl ? (
          <div className="relative w-auto h-80 -z-10">
            <Image
              src={game.coverImageUrl}
              alt={`${game.title} cover`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="rounded-2xl object-cover"
            />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center w-full h-80">
            <ImageIcon className="w-auto h-full object-cover" />
            No image
          </div>
        )}

        <div className="flex flex-1 flex-col border rounded-2xl p-3 bg-gray-100 font-semibold">
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
            Release date: {game.releaseDate.toLocaleDateString("en-US")}
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
        </div>
      </Link>
      {session.data?.user.role === "admin" && pathname !== "/viewGames" && (
        <GameEditAndDelete game={game} />
      )}
    </div>
  );
}
