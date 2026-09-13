"use server";

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

export async function createVideogame(data: VideoGameData) {
  const session = await getSession();

  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  if (session?.user.role !== "admin") {
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

export async function deleteVideogame(id: string) {
  const session = await getSession();

  if (!session?.user) {
    return { error: "Unathorized" };
  }

  if (session?.user.role !== "admin") {
    return { error: "Unauthorized" };
  }

  const videogame = await Game.findById(id);

  if (!videogame) {
    return { error: "Game not found" };
  }

  await Game.deleteOne({ _id: id });

  return { success: true };
}

export async function updateVideogame(
  id: string,
  updates: {
    title: string;
    platform: string[];
    releaseYear: Date;
    coverImageUrl?: string;
    developer: string;
    publisher: string;
    genre: string[];
    reviewScore?: number;
  },
) {
  const session = await getSession();

  if (!session?.user) {
    return { error: "Unauthorized" };
  }

  if (session?.user.role !== "admin") {
    return { error: "Unauthorized" };
  }

  const videogame = await Game.findById(id);

  if (!videogame) {
    return { error: "Job application not found" };
  }

  const { ...otherUpdates } = updates;

  const updatesToApply: Partial<{
    title: string;
    platform: string[];
    releaseYear: Date;
    coverImageUrl?: string;
    developer: string;
    publisher: string;
    genre: string[];
    reviewScore?: number;
  }> = otherUpdates;

  const updated = await Game.findByIdAndUpdate(id, updatesToApply, {
    new: true,
  });

  return { data: JSON.parse(JSON.stringify(updated)) };
}
