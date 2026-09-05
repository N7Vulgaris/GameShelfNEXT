import { NextResponse } from "next/server";
import clientPromise from "@/lib/db";

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    const client = await clientPromise;
    const db = client.db("game-shelf");

    const game = await db.collection("games").findOne({ id: id });

    if (!game) {
      return NextResponse.json({ error: "Game not found" }, { status: 404 });
    }

    return NextResponse.json(game, { status: 200 });
  } catch {
    return NextResponse.json(
      {
        error: "Failed to fetch game",
      },
      { status: 500 },
    );
  }
}
