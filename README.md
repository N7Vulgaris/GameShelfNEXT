# Game Shelf

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.x-black?style=for-the-badge&logo=next.js" alt="Next.js 16" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-3178C6?style=for-the-badge&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/MongoDB-Atlas-4EA94B?style=for-the-badge&logo=mongodb" alt="MongoDB" />
</p>

Game Shelf is a full-stack game discovery and catalog management application. It gives players a focused way to browse, search, and sort a growing collection of games, while providing authenticated administrators with tools to maintain the catalog.

> A before-and-after evolution of [The Game Shelf](https://github.com/N7Vulgaris/TheGameShelf), rebuilt with a modern Next.js stack.

## Highlights

- Built a responsive catalog experience with search, filtering, and sorting across multiple game attributes.
- Added email/password authentication and protected management workflows with Better Auth.
- Connected the application to MongoDB with Mongoose and server-side data access.
- Integrated Cloudinary for game cover image uploads and lifecycle management.
- Created a lightweight quiz flow that turns the catalog into an interactive discovery experience.

## Screenshots

<table>
  <tr>
    <td align="center"><strong>Home page</strong><br><img src="game-shelf/public/images/homePage.png" alt="Game Shelf home page" width="320" /></td>
    <td align="center"><strong>Game catalog</strong><br><img src="game-shelf/public/images/gameCatalog.png" alt="Game Shelf catalog view" width="320" /></td>
<td align="center"><strong>Management</strong><br><img src="./game-shelf/public/images/management.png" alt="Game Shelf management view" width="320" /></td>
  </tr>
</table>

## Features

- Browse a live game catalog with cover art and game metadata
- Search and filter by title, developer, publisher, genre, and platform
- Sort by newest, oldest, and alphabetical order
- Create an account and sign in with email/password authentication
- Test game knowledge through an interactive quiz
- Add, edit, and delete games from the management panel
- Upload and remove cover images through Cloudinary

## Tech Stack

| Layer          | Tools                                          |
| -------------- | ---------------------------------------------- |
| Front end      | Next.js 16, React 19, TypeScript, Tailwind CSS |
| UI             | shadcn/ui, Base UI, Lucide React               |
| Data           | MongoDB, Mongoose                              |
| Authentication | Better Auth                                    |
| Media          | Cloudinary                                     |

## Getting Started

Link to the deployed project: https://game-shelf-next.vercel.app/

Admin account for testing:
Email: `admin@admin.com`
Password: `adminPassword`

Normal user account (if you don't want to create your own):
Email: `johnny@test.com`
Password: `test123456`

## Available Routes

| Route         | Purpose                                           |
| ------------- | ------------------------------------------------- |
| `/`           | Landing page                                      |
| `/viewGames`  | Browse, search, filter, and sort games            |
| `/quiz`       | Start the game knowledge quiz                     |
| `/management` | Manage catalog entries with an authorized account |

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

## Available Scripts

```bash
npm run dev     # Start the local development server
npm run build   # Create a production build
npm run start   # Run the production build
npm run lint    # Run ESLint checks
```

## Roadmap

- Add dedicated game detail pages
- Let users save games to a favorites list
- Move catalog search and sorting state into URL search parameters
- Continue improving mobile responsiveness and visual polish
- Let admins add / manage questions in the quiz
- Add standardized choices whem selecting genre and platform in game creation / updating
