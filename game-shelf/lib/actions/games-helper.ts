import { getSession } from "../auth/auth";
import { v2 as cloudinary } from "cloudinary";

const MAX_COVER_IMAGE_BYTES = 5 * 1024 * 1024;
const SUPPORTED_COVER_IMAGE_PATTERN =
  /^data:image\/(?:jpeg|png|webp|gif);base64,/i;

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

export function isDataImageUrl(value?: string) {
  return Boolean(value && SUPPORTED_COVER_IMAGE_PATTERN.test(value));
}

function getBase64ImageSize(value: string) {
  const base64 = value.slice(value.indexOf(",") + 1);
  const padding = base64.endsWith("==") ? 2 : base64.endsWith("=") ? 1 : 0;

  return Math.floor((base64.length * 3) / 4) - padding;
}

export function normalizeArray(values?: string[]) {
  return (values ?? []).map((value) => value.trim()).filter(Boolean);
}

export function stringifyDocument<T>(document: T) {
  return JSON.parse(JSON.stringify(document));
}

export function validateGameData(data: Partial<VideoGameData>) {
  const title = data.title?.trim();
  const developer = data.developer?.trim();
  const publisher = data.publisher?.trim();
  const platform = normalizeArray(data.platform);
  const genre = normalizeArray(data.genre);

  if (!title) {
    return "Missing required field: title";
  }

  if (!platform.length) {
    return "Missing required field: platform";
  }

  if (!data.releaseDate) {
    return "Missing required field: release date";
  }

  if (!developer) {
    return "Missing required field: developer";
  }

  if (!publisher) {
    return "Missing required field: publisher";
  }

  if (!genre.length) {
    return "Missing required field: genre";
  }

  return null;
}

export async function ensureAdminAccess(): Promise<{
  success: false;
  status: 401 | 403;
  error: string;
} | null> {
  const session = await getSession();

  if (!session?.user) {
    return {
      success: false,
      status: 401,
      error: "Unauthorized. You are not logged in",
    };
  }

  if (session.user.role !== "admin") {
    return {
      success: false,
      status: 403,
      error: "Unauthorized. You are not an admin",
    };
  }

  return null;
}

export async function uploadCoverImageIfNeeded(image?: string) {
  if (!image) {
    return {
      coverImageUrl: undefined,
      coverImageId: undefined,
    };
  }

  if (!isDataImageUrl(image)) {
    throw new Error("Cover image must be a JPEG, PNG, WebP, or GIF");
  }

  if (getBase64ImageSize(image) > MAX_COVER_IMAGE_BYTES) {
    throw new Error("Cover image must be 5 MB or smaller");
  }

  const uploadResult = await cloudinary.uploader.upload(image, {
    folder: "game_covers",
    quality: "auto",
    fetch_format: "auto",
    upload_preset: "game_covers_preset",
  });

  return {
    coverImageUrl: uploadResult.secure_url,
    coverImageId: uploadResult.public_id,
  };
}
