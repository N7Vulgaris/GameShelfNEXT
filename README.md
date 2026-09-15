# Game Shelf

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.x-black?style=for-the-badge&logo=next.js" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-4EA94B?style=for-the-badge&logo=mongodb" alt="MongoDB" />
</p>

Game Shelf NEXT is a modern game discovery and catalog management app built with Next.js. It helps users browse a library of games, filter by platform and genre, and test their game knowledge through a lightweight quiz. Admin users can manage the catalog by adding, editing, and deleting game entries.

It also serves as a before and after comparison with **The Game Shelf**, an older version of the same concept (https://github.com/N7Vulgaris/TheGameShelf)

## Overview

This project combines a responsive front end with a MongoDB-backed data layer and authentication flow. It is designed for game enthusiasts who want a simple, polished way to track and explore games in one place.

## Features

- Browse and search a live game catalog
- Filter results by title, developer, publisher, genre, and platform
- Sort by newest, oldest, and alphabetical order
- Sign in and sign up with email/password authentication
- Access a quiz experience to test game knowledge
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

### How to run
(Will add a link to a deployed version)

## Available Scripts

```bash
npm run dev     # start local development server
npm run build   # create production build
npm run start   # run production build
npm run lint    # run ESLint checks
```

## Usage

- Visit the home page to see the landing experience.
- Go to the game browser to search and sort the catalog.
- Sign up or sign in to unlock quiz-based discovery.
- Use the management panel to add or update entries if you have admin access.

## Things to improve and features to add

- General UI polish
- Better mobile responsiveness
- A detailed videogame view
- Allow the user to add games to a list of favorites
- Switch from State Lifting to URL Search parameters when searching and sorting games
