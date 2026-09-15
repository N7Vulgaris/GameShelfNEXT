import GameDetailView from "@/components/game-detail-view";
import { getGameById } from "@/lib/services/gameServices";
import { notFound } from "next/navigation";

interface GamePageProps {
  params: Promise<{ id: string }>;
}

export default async function GamePage({ params }: GamePageProps) {
  const { id } = await params;
  const game = await getGameById(id);

  if (!game) {
    notFound();
  }

  return <GameDetailView game={game} />;
}