"use server";

import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";
import connectDB from "../db";
import { Game } from "../models";
import {
  ensureAdminAccess,
  normalizeArray,
  stringifyDocument,
  uploadCoverImageIfNeeded,
  validateGameData,
} from "./games-helper";

cloudinary.config();

export interface VideoGameData {
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

export type ActionResult<T = null> =
  | { success: true; status: number; data: T }
  | { success: false; status: number; error: string };

export async function createVideogame(
  data: VideoGameData,
): Promise<ActionResult<unknown>> {
  const authError = await ensureAdminAccess();

  if (authError) {
    return authError;
  }

  const validationError = validateGameData(data);

  if (validationError) {
    return {
      success: false,
      status: 400,
      error: validationError,
    };
  }

  await connectDB();

  const normalizedData = {
    ...data,
    title: data.title.trim(),
    developer: data.developer.trim(),
    publisher: data.publisher.trim(),
    platform: normalizeArray(data.platform),
    genre: normalizeArray(data.genre),
  };

  let uploadedCoverImage: { coverImageUrl?: string; coverImageId?: string } =
    {};

  try {
    uploadedCoverImage = await uploadCoverImageIfNeeded(
      normalizedData.coverImageUrl,
    );

    const newGame = await Game.create({
      ...normalizedData,
      coverImageUrl: uploadedCoverImage.coverImageUrl,
      coverImageId: uploadedCoverImage.coverImageId,
    });

    return {
      success: true,
      status: 200,
      data: stringifyDocument(newGame),
    };
  } catch (error) {
    if (uploadedCoverImage.coverImageId) {
      try {
        await cloudinary.uploader.destroy(uploadedCoverImage.coverImageId);
      } catch {
        console.error("Failed to roll back uploaded cover image.");
      }
    }

    return {
      success: false,
      status: 500,
      error:
        error instanceof Error
          ? error.message
          : "Failed to create game in database",
    };
  }
}

export async function deleteVideogame(id: string): Promise<ActionResult<null>> {
  const authError = await ensureAdminAccess();

  if (authError) {
    return authError;
  }

  await connectDB();

  if (!mongoose.isValidObjectId(id)) {
    return {
      success: false,
      status: 404,
      error: "Id is not a valid mongoose id",
    };
  }

  const videogame = await Game.findById(id);

  if (!videogame) {
    return {
      success: false,
      status: 404,
      error: "Game does not exist in the database",
    };
  }

  try {
    await Game.deleteOne({ _id: id });

    if (videogame.coverImageId) {
      await cloudinary.uploader.destroy(videogame.coverImageId);
    }

    return {
      success: true,
      status: 200,
      data: null,
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      error: error instanceof Error ? error.message : "Failed to delete game",
    };
  }
}

export async function updateVideogame(
  id: string,
  updates: VideoGameData,
): Promise<ActionResult<unknown>> {
  const authError = await ensureAdminAccess();

  if (authError) {
    return authError;
  }

  await connectDB();

  if (!mongoose.isValidObjectId(id)) {
    return {
      success: false,
      status: 404,
      error: "Id is not a valid mongoose id",
    };
  }

  const videogame = await Game.findById(id);

  if (!videogame) {
    return {
      success: false,
      status: 404,
      error: "Game does not exist in database",
    };
  }

  const validationError = validateGameData(updates);

  if (validationError) {
    return {
      success: false,
      status: 400,
      error: validationError,
    };
  }

  let uploadedCoverImage: { coverImageUrl?: string; coverImageId?: string } =
    {};

  try {
    uploadedCoverImage = await uploadCoverImageIfNeeded(updates.coverImageUrl);

    const updatesToApply = {
      ...updates,
      title: updates.title.trim(),
      developer: updates.developer.trim(),
      publisher: updates.publisher.trim(),
      platform: normalizeArray(updates.platform),
      genre: normalizeArray(updates.genre),
      coverImageUrl: uploadedCoverImage.coverImageUrl ?? updates.coverImageUrl,
      coverImageId: uploadedCoverImage.coverImageId ?? updates.coverImageId,
    };

    const updated = await Game.findByIdAndUpdate(id, updatesToApply, {
      new: true,
      runValidators: true,
    });

    if (!updated) {
      throw new Error("Failed to update the game in the database");
    }

    if (uploadedCoverImage.coverImageId && videogame.coverImageId) {
      await cloudinary.uploader.destroy(videogame.coverImageId);
    }

    return {
      success: true,
      status: 200,
      data: stringifyDocument(updated),
    };
  } catch (error) {
    if (uploadedCoverImage.coverImageId) {
      try {
        await cloudinary.uploader.destroy(uploadedCoverImage.coverImageId);
      } catch {
        console.error("Failed to roll back uploaded cover image.");
      }
    }

    return {
      success: false,
      status: 500,
      error: error instanceof Error ? error.message : "Failed to update game",
    };
  }
}
