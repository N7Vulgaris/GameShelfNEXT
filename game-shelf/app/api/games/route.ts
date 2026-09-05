import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("game-shelf");
    const games = await db.collection("games").find({}).toArray();

    return NextResponse.json(games, { status: 200 });
  } catch {
    return NextResponse.json(
      {
        error: "Failed to fetch games",
      },
      { status: 500 },
    );
  }
}
