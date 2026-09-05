"use client";
import GamesList from "@/components/games-list";
import GamesSearchbar from "@/components/games-searchbar";

export default function ViewGamesPage() {
  return (
    <div className="flex flex-col items-center w-full mt-16">
      <GamesSearchbar />
      <GamesList />
    </div>
  );
}
