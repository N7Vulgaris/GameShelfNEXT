export const PLATFORM_OPTIONS = [
  "PC",
  "PlayStation 5",
  "PlayStation 4",
  "PlayStation 3",
  "PlayStation 2",
  "PlayStation",
  "Xbox Series X|S",
  "Xbox One",
  "Xbox 360",
  "Xbox",
  "Nintendo Switch 2",
  "Nintendo Switch",
  "Wii U",
  "Wii",
  "Nintendo 3DS",
  "Nintendo DS",
  "Nintendo 64",
  "Game Boy Advance",
  "Game Boy",
  "iOS",
  "Android",
  "Linux",
  "macOS",
] as const;

export const GENRE_OPTIONS = [
  "Action",
  "Adventure",
  "Fighting",
  "Horror",
  "MMO",
  "Music",
  "Party",
  "Platformer",
  "Puzzle",
  "Racing",
  "RPG",
  "Sandbox",
  "Shooter",
  "Simulation",
  "Sports",
  "Strategy",
  "Survival",
  "Stealth",
  "Visual Novel",
] as const;

const LEGACY_VALUE_ALIASES: Record<string, string> = {
  "PS5": "PlayStation 5",
  "PS4": "PlayStation 4",
  "PS3": "PlayStation 3",
  "PS2": "PlayStation 2",
  "Playstation 5": "PlayStation 5",
  "Playstation 4": "PlayStation 4",
  "Playstation 3": "PlayStation 3",
  "Playstation 2": "PlayStation 2",
  "Xbox Series X/S": "Xbox Series X|S",
  "XBOX ONE": "Xbox One",
  "Switch": "Nintendo Switch",
  "PC (Microsoft Windows)": "PC",
};

export function normalizeGameOption(value: string) {
  const trimmedValue = value.trim();
  return LEGACY_VALUE_ALIASES[trimmedValue] ?? trimmedValue;
}
