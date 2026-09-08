import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen mx-auto container">
      <div className="flex flex-col items-center justify-center font-semibold">
        <Image
          className="my-2 shadow-xl w-full max-w-4xl h-auto"
          loading="eager"
          src="/images/gameBanner.jpg"
          alt="Games"
          width={800}
          height={800}
        />
        <h2 className="text-2xl">Find your next favorite game here!</h2>
      </div>
    </div>
  );
}
