import mongoose, { Schema, Document } from "mongoose";

export interface IGame extends Document {
  title: string;
  platform: string[];
  releaseDate: Date;
  coverImageUrl?: string;
  coverImageId?: string;
  developer: string;
  publisher: string;
  genre: string[];
  reviewScore?: number;
  createdAt: Date;
  updatedAt: Date;
}

const GameSchema = new Schema<IGame>(
  {
    title: { type: String, required: true },
    platform: [
      {
        type: String,
        required: true,
      },
    ],
    releaseDate: { type: Date, required: true },
    coverImageUrl: { type: String },
    coverImageId: { type: String },
    developer: { type: String, required: true },
    publisher: { type: String, required: true },
    genre: [
      {
        type: String,
        required: true,
      },
    ],
    reviewScore: { type: Number },
  },
  {
    timestamps: true,
  },
);

export default mongoose.models.Game ||
  mongoose.model<IGame>("Game", GameSchema);
