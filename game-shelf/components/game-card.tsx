"use client";

import { Game } from "@/lib/models/models.types";
import Image from "next/image";
import { Image as ImageIcon } from "lucide-react";
import GameEditAndDelete from "./game-edit-delete";
import Link from "next/link";

interface GameCardProps {
  game: Game;
  canManage: boolean;
}

export default function GameCard({ game, canManage }: GameCardProps) {
  return (
    <div className="flex h-full flex-col border-2 rounded-2xl border-gray-300 p-3">
      <Link href={`/games/${game._id}`} className="flex flex-1 flex-col mb-2">
        {game.coverImageUrl ? (
          <div className="relative h-80 w-full">
            <Image
              src={game.coverImageUrl}
              alt={`${game.title} cover`}
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
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
          <div className="flex flex-col">
            <p>Platform: {game.platform[0]}...</p>
          </div>
        </div>
      </Link>
      {canManage && <GameEditAndDelete game={game} />}
    </div>
  );
}
