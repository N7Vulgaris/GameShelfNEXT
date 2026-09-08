export interface Game {
  _id: string;
  title: string;
  platform: string[];
  releaseYear: Date;
  coverImageUrl?: string;
  developer: string;
  publisher: string;
  genre: string[];
  reviewScore?: number;
}
