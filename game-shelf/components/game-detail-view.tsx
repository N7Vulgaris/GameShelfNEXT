"use client";

import { Game } from "@/lib/models/models.types";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { ArrowLeft, ImageIcon } from "lucide-react";
import GameEditAndDelete from "./game-edit-delete";
import { useSession } from "@/lib/auth/auth-client";

interface GameDetailViewProps {
  game: Game;
}

export default function GameDetailView({ game }: GameDetailViewProps) {
  const session = useSession();
  const router = useRouter();

  return (
    <div className="mx-auto mt-16 w-full max-w-5xl p-4 bg-gray-100 border rounded-2xl shadow-md">
      <Button type="button" onClick={() => router.back()} className="mb-6 flex">
        <ArrowLeft />
        Back to games
      </Button>
      <div className="grid gap-8 md:grid-cols-[minmax(0,2fr)_3fr]">
        <div className="relative min-h-[28rem] overflow-hidden rounded-2xl border-2 border-gray-300">
          {game.coverImageUrl ? (
            <Image
              src={game.coverImageUrl}
              alt={`${game.title} cover`}
              fill
              sizes="(max-width: 768px) 100vw, 40vw"
              className="object-cover"
            />
          ) : (
            <div className="flex flex-col h-full items-center justify-center">
              <ImageIcon className="w-auto h-[50%]" />
              No image
            </div>
          )}
        </div>
        <section>
          <h1 className="mb-6 text-4xl font-bold">{game.title}</h1>
          <dl className="grid gap-4">
            <div>
              <dt className="font-semibold">Developer</dt>
              <dd>{game.developer}</dd>
            </div>
            <div>
              <dt className="font-semibold">Publisher</dt>
              <dd>{game.publisher}</dd>
            </div>
            <div>
              <dt className="font-semibold">Release date</dt>
              <dd>{game.releaseDate.toLocaleDateString("en-US")}</dd>
            </div>
            <div>
              <dt className="font-semibold">Platforms</dt>
              <dd>{game.platform.join(", ")}</dd>
            </div>
            <div>
              <dt className="font-semibold">Genres</dt>
              <dd>{game.genre.join(", ")}</dd>
            </div>
            {game.reviewScore !== undefined && (
              <div>
                <dt className="font-semibold">Review score</dt>
                <dd>{game.reviewScore}</dd>
              </div>
            )}
          </dl>
        </section>
      </div>

      {session.data?.user.role === "admin" && (
        <div>
          <GameEditAndDelete game={game} />
        </div>
      )}
    </div>
  );
}
