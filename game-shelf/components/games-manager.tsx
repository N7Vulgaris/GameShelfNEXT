"use client";
import { Game as GameType } from "@/lib/models/models.types";
import { useMemo, useState } from "react";
import GamesSearchbar from "./games-searchbar";
import GamesList from "./games-list";

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
          return (
            new Date(b.releaseDate).getTime() -
            new Date(a.releaseDate).getTime()
          );

        case "oldest":
          return (
            new Date(a.releaseDate).getTime() -
            new Date(b.releaseDate).getTime()
          );

        case "az":
          return a.title.localeCompare(b.title);
        case "za":
          return b.title.localeCompare(a.title);
        default:
          break;
      }
      return 0;
    });
  }, [searchQuery, initialGames, sortMethod]);

  const handleSearch = (query: string) => setSearchQuery(query);
  const handleSort = (method: string) => setSortMethod(method);

  return (
    <div className="flex flex-col items-center w-[80%] mx-auto mt-16 mb-4 min-h-[50vh]">
      <GamesSearchbar onSearch={handleSearch} sortGames={handleSort} />

      {filteredGames.length > 0 ? (
        <GamesList games={filteredGames} />
      ) : (
        <div className="flex flex-1 justify-center items-center">
          <p className="font-bold">No games found</p>
        </div>
      )}
    </div>
  );
}
