"use client";
import { Game as GameType } from "@/lib/models/models.types";
import { useMemo, useState } from "react";
import GamesSearchbar from "./games-searchbar";
import GamesList from "./games-list";
import game from "@/lib/models/game";

export default function GamesManager({
  initialGames,
}: {
  initialGames: GameType[];
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortMethod, setSortMethod] = useState("");

  const filteredGames = useMemo(() => {
    const lowerQuery = searchQuery.toLowerCase();

    let games = initialGames;

    if (lowerQuery) {
      games = initialGames.filter((game) => {
        const matchText = [game.title, game.developer, game.publisher].some(
          (field) => field.toLowerCase().includes(lowerQuery),
        );

        const matchArray = [...game.genre, ...game.platform].some((item) =>
          item.toLowerCase().includes(lowerQuery),
        );

        return matchText || matchArray;
      });
    }

    return [...games].sort((a, b) => {
      switch (sortMethod) {
        case "newest":
          return b.title.localeCompare(a.title);
        case "oldest":
          return a.title.localeCompare(b.title);
        case "az":
          return (
            new Date(b.releaseYear).getTime() -
            new Date(a.releaseYear).getTime()
          );
        case "za":
          return (
            new Date(a.releaseYear).getTime() -
            new Date(b.releaseYear).getTime()
          );
        default:
          break;
      }
      return 0;
    });
  }, [searchQuery, initialGames, sortMethod]);

  const handleSearch = (query: string) => setSearchQuery(query);

  const handleSort = (method: string) => setSortMethod(method);

  return (
    <div className="flex flex-col items-center w-full mt-16">
      <GamesSearchbar onSearch={handleSearch} sortGames={handleSort} />
      <GamesList games={filteredGames} />
    </div>
  );
}
