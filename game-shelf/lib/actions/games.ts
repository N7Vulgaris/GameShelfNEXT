"use server";

import { v2 as cloudinary } from "cloudinary";
import { getSession } from "../auth/auth";
import connectDB from "../db";
import { Game } from "../models";
import mongoose from "mongoose";

cloudinary.config();

interface VideoGameData {
  title: string;
  platform: string[];
  releaseDate: Date;
  coverImageUrl?: string;
  coverImageId?: string;
  developer: string;
  publisher: string;
  genre: string[];
  reviewScore?: number;
}

export async function createVideogame(data: VideoGameData) {
  const session = await getSession();

  if (!session?.user) {
    return { error: "Unauthorized. You are not logged in", status: 401 };
  }
  if (session?.user.role !== "admin") {
    return { error: "Unauthorized. You are not an admin", status: 401 };
  }

  await connectDB();

  const {
    title,
    platform,
    releaseDate,
    coverImageUrl,
    developer,
    publisher,
    genre,
    reviewScore,
  } = data;

  if (!title) {
    return { error: "Missing required field: title", status: 400 };
  }
  if (!platform.length) {
    return { error: "Missing required field: platform", status: 400 };
  }
  if (!releaseDate) {
    return { error: "Missing required field: release date", status: 400 };
  }
  if (!developer) {
    return { error: "Missing required field: developer", status: 400 };
  }
  if (!publisher) {
    return { error: "Missing required field: publisher", status: 400 };
  }
  if (!genre.length) {
    return { error: "Missing required field: genre", status: 400 };
  }

  let finalCoverImageUrl = undefined;
  let finalCoverId = undefined;

  try {
    if (coverImageUrl && coverImageUrl.startsWith("data:image")) {
      const uploadResult = await cloudinary.uploader.upload(coverImageUrl, {
        folder: "game_covers",
        quality: "auto",
        fetch_format: "auto",
        upload_preset: "game_covers_preset",
      });

      finalCoverImageUrl = uploadResult.secure_url;
      finalCoverId = uploadResult.public_id;
    }

    const newGame = await Game.create({
      title,
      platform,
      releaseDate,
      developer,
      publisher,
      genre,
      reviewScore,
      coverImageUrl: finalCoverImageUrl,
      coverImageId: finalCoverId,
    });

    return {
      success: true,
      status: 200,
      data: JSON.parse(JSON.stringify(newGame)),
    };
  } catch (error: unknown) {
    if (error instanceof Error) {
      return { error: error.message };
    }
    return { error: "Failed to create game in database", status: 500 };
  }
}

export async function deleteVideogame(id: string) {
  const session = await getSession();

  if (!session?.user) {
    return { error: "Unathorized" };
  }
  if (session?.user.role !== "admin") {
    return { error: "Unauthorized" };
  }

  await connectDB();

  if (!mongoose.isValidObjectId(id)) {
    return { error: "Id is not a valid mongoose id", status: 404 };
  }

  const videogame = await Game.findById(id);

  if (!videogame) {
    return { error: "Game does not exist in the database", status: 404 };
  }

  if (videogame.coverImageId) {
    await cloudinary.uploader.destroy(videogame.coverImageId);
  }

  await Game.deleteOne({ _id: id });

  return { success: true, status: 200 };
}

export async function updateVideogame(
  id: string,
  updates: {
    title: string;
    platform: string[];
    releaseDate: Date;
    coverImageUrl?: string;
    coverImageId?: string;
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

  await connectDB();

  if (!mongoose.isValidObjectId(id)) {
    return { error: "Id is not a valid mongoose id", status: 404 };
  }

  const videogame = await Game.findById(id);

  if (!videogame) {
    return { error: "Game does not exist in database", status: 404 };
  }

  const newCoverImage = updates.coverImageUrl;
  const hasNewCoverImage = newCoverImage?.startsWith("data:image");
  let finalCoverImageUrl: string | undefined;
  let finalCoverId: string | undefined;

  if (hasNewCoverImage && newCoverImage) {
    const uploadResult = await cloudinary.uploader.upload(
      newCoverImage,
      {
        folder: "game_covers",
        quality: "auto",
        fetch_format: "auto",
        upload_preset: "game_covers_preset",
      },
    );

    finalCoverImageUrl = uploadResult.secure_url;
    finalCoverId = uploadResult.public_id;

    if (videogame.coverImageId) {
      await cloudinary.uploader.destroy(videogame.coverImageId);
    }
  }

  const otherUpdates = { ...updates };
  delete otherUpdates.coverImageId;
  delete otherUpdates.coverImageUrl;

  const updatesToApply: Partial<{
    title: string;
    platform: string[];
    releaseDate: Date;
    coverImageUrl?: string;
    coverImageId?: string;
    developer: string;
    publisher: string;
    genre: string[];
    reviewScore?: number;
  }> = otherUpdates;

  if (hasNewCoverImage) {
    updatesToApply.coverImageUrl = finalCoverImageUrl;
    updatesToApply.coverImageId = finalCoverId;
  }

  const updated = await Game.findByIdAndUpdate(id, updatesToApply, {
    new: true,
    runValidators: true,
  });

  return {
    success: true,
    status: 200,
    data: JSON.parse(JSON.stringify(updated)),
  };
}
