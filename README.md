# Game Shelf

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.x-black?style=for-the-badge&logo=next.js" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-4EA94B?style=for-the-badge&logo=mongodb" alt="MongoDB" />
</p>

Game Shelf is a modern game discovery and catalog management app built with Next.js. It helps users browse a library of games, filter by platform and genre, and discover new titles through a lightweight recommendation quiz. Admin users can manage the catalog by adding, editing, and deleting game entries.

## Overview

This project combines a responsive front end with a MongoDB-backed data layer and authentication flow. It is designed for game enthusiasts who want a simple, polished way to track and explore games in one place.

## Features

- Browse and search a live game catalog
- Filter results by title, developer, publisher, genre, and platform
- Sort by newest, oldest, and alphabetical order
- Sign in and sign up with email/password authentication
- Access a quiz experience for personalized game discovery
- Manage games through an admin dashboard
- Store game metadata in MongoDB
- Use Cloudinary for cover images

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- MongoDB + Mongoose
- Better Auth
- Cloudinary
- shadcn/ui

## Project Structure

```text
game-shelf/
├── app/
│   ├── api/
│   ├── management/
│   ├── quiz/
│   ├── viewGames/
│   └── page.tsx
├── components/
│   ├── dialogs/
│   ├── ui/
│   └── ...
├── lib/
│   ├── auth/
│   ├── models/
│   ├── services/
│   ├── db.ts
│   └── utils.ts
├── public/
├── package.json
├── tsconfig.json
├── next.config.ts
├── eslint.config.mjs
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- MongoDB instance or MongoDB Atlas connection string

### Installation

1. Clone the repository

   ```bash
   git clone <your-repo-url>
   cd game-shelf
   ```

2. Install dependencies

   ```bash
   npm install
   ```

3. Create a `.env.local` file and configure your environment variables

   ```bash
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Run the development server

   ```bash
   npm run dev
   ```

5. Open http://localhost:3000 in your browser

## Available Scripts

```bash
npm run dev     # start local development server
npm run build   # create production build
npm run start   # run production build
npm run lint    # run ESLint checks
```

## Environment Variables

| Variable      | Required | Description                                               |
| ------------- | -------- | --------------------------------------------------------- |
| `MONGODB_URI` | Yes      | MongoDB connection string used by the app and auth system |

If additional auth or media configuration is added later, document it here.

## Usage

- Visit the home page to see the landing experience.
- Go to the game browser to search and sort the catalog.
- Sign up or sign in to unlock quiz-based discovery.
- Use the management panel to add or update entries if you have admin access.

## Contributing

Contributions are welcome. If you want to improve the app, feel free to open an issue or submit a pull request.

## License

This project is currently unlicensed unless otherwise specified.
