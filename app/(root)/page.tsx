import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

function Home() {
  return (
    <main className="container">
      <div className="grid grid-cols-2 place-items-center">
        <div className="flex flex-col gap-4">
          <h2 className="text-center text-xl font-bold uppercase md:text-left md:text-3xl lg:text-7xl">
            Learn by <br /> doing
          </h2>
          <p className="max-w-md">
            An immersive and engaging web-based 2D learning gamified platform
            that enhances your Web Development Skills!
          </p>
          <SignedIn>
            <Button
              variant={"default"}
              className="drop-shadow-small border border-black bg-green-300 font-bold uppercase text-black hover:opacity-80"
              asChild
            >
              <Link href="character-selection">Continue Playing</Link>
            </Button>
          </SignedIn>
          <SignedOut>
            <Button
              variant={"default"}
              className="drop-shadow-small border border-black bg-green-300 font-bold uppercase text-black hover:opacity-80"
              asChild
            >
              <Link href="/sign-in">Play Now</Link>
            </Button>
          </SignedOut>
        </div>
        <Image src="/hero-banner.png" alt="" width={518} height={699} />
      </div>
    </main>
  );
}
export default Home;
