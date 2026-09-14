"use server";

import { v2 as cloudinary } from "cloudinary";
import { getSession } from "../auth/auth";
import connectDB from "../db";
import { Game } from "../models";

cloudinary.config();

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

  await connectDB();

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
    !platform.length ||
    !releaseYear ||
    !developer ||
    !publisher ||
    !genre.length
  ) {
    return { error: "Missing required fields" };
  }

  let finalCoverImageUrl = undefined;

  try {
    if (coverImageUrl && coverImageUrl.startsWith("data:image")) {
      const uploadResult = await cloudinary.uploader.upload(coverImageUrl, {
        folder: "game_covers",
        quality: "auto",
        fetch_format: "auto",
        upload_preset: "game_covers_preset",
      });

      finalCoverImageUrl = uploadResult.secure_url;
    }

    const newGame = await Game.create({
      title,
      platform,
      releaseYear,
      developer,
      publisher,
      genre,
      reviewScore,
      coverImageUrl: finalCoverImageUrl,
    });

    return { success: true, data: JSON.parse(JSON.stringify(newGame)) };
  } catch (error: unknown) {
    console.log("Failed to upload new game:", error);

    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "Failed to create game in database" };
  }

  /* const videoGame = await Game.create({
    title,
    platform,
    releaseYear,
    coverImageUrl: coverImageUrl || "",
    developer,
    publisher,
    genre,
    reviewScore: reviewScore || null,
  });

  return { data: JSON.parse(JSON.stringify(videoGame)) }; */
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
