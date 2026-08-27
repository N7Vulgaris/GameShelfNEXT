import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen mx-auto container px-4">
      <div className="mx-auto text-center">
        <Image
          className="mb-6"
          loading="eager"
          src="/images/gameBanner.jpg"
          alt="Games"
          width={800}
          height={800}
        />
        <h1>The Game Shelf</h1>
        <h2>Find your next favorite game here!</h2>
      </div>
    </div>
  );
}
