import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen mx-auto container px-4">
      <div className="mx-auto text-center font-semibold">
        <Image
          className="my-2 shadow-xl h-auto"
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
