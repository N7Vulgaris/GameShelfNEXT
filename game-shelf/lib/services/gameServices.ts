import connectDB from "@/lib/db";
import { Game } from "@/lib/models";
import { Game as GameType } from "@/lib/models/models.types";
import mongoose from "mongoose";

function serializeGame(game: GameType): GameType {
  return {
    ...game,
    _id: game._id.toString(),
    releaseDate: new Date(game.releaseDate),
  };
}

export async function getGames(): Promise<GameType[]> {
  await connectDB();
  const games: GameType[] = await Game.find({}).lean();

  return games.map((game: GameType) => serializeGame(game));
}

export async function getGameById(id: string): Promise<GameType | null> {
  if (!mongoose.isValidObjectId(id)) {
    return null;
  }

  await connectDB();
  const game = await Game.findById(id).lean();

  return game ? serializeGame(game as GameType) : null;
}
