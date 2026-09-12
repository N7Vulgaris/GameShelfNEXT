import { getSession } from "../auth/auth";
import connenctDB from "../db";
import { Game } from "../models";

interface VideoGameData {
  title: string;
  platform: string[];
  releaseYear: Date;
  coverImageUrl?: string;
  developer: string;
  publisher: string;
  genre: string[];
  reviewScore?: number;
}

export async function createJobApplication(data: VideoGameData) {
  const session = await getSession();

  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  await connenctDB();

  const {
    title,
    platform,
    releaseYear,
    coverImageUrl,
    developer,
    publisher,
    genre,
    reviewScore,
  } = data;

  if (
    !title ||
    !platform ||
    !releaseYear ||
    !developer ||
    !publisher ||
    !genre
  ) {
    return { error: "Missing required fields" };
  }

  const videoGame = await Game.create({
    title,
    platform,
    releaseYear,
    coverImageUrl: coverImageUrl || "",
    developer,
    publisher,
    genre,
    reviewScore: reviewScore || null,
  });

  return { data: JSON.parse(JSON.stringify(videoGame)) };
}
