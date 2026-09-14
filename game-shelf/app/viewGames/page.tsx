import GamesManager from "@/components/games-manager";
import connectDB from "@/lib/db";
import { Game } from "@/lib/models";
import { Game as GameType } from "@/lib/models/models.types";

export async function getGames(): Promise<GameType[]> {
  await connectDB();
  const games: GameType[] = await Game.find({}).lean();

  const serializedGames: GameType[] = games.map((game: GameType) => ({
    ...game,
    _id: game._id.toString(),
    releaseDate: new Date(game.releaseDate),
  }));

  return serializedGames;
}

//TODO: Switch from State Lifting (Game Manager Wrapper) to URL Search parameters for searching and sorting

export default async function ViewGamesPage() {
  const games = await getGames();

  return (
    <div>
      <GamesManager initialGames={games} />
    </div>
  );
}
