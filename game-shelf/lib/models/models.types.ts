export interface Game {
  _id: string;
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
