"use server"

import { auth } from "@/auth";
import { SignIn } from "@/components/auth/signin";
import { SignOut } from "@/components/auth/signout";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function Home() {
  const session = await auth();
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="text-5xl lg:text-9xl font-extrabold text-center mt-4">GVS Roulette</div>
      <div className="flex flex-col items-center gap-8">
        {/* <Image
          src="/roulette.png"
          alt="Roulette"
          width={300}
          height={300}
          className="rounded-lg shadow-lg"
        /> */}
        <p className="text-4lg font-bold text-center">
          Welcome to GVS Roulette! Spin the wheel and try your luck!
        </p>
          {session ? (
            <div className="flex flex-row items-center gap-4">
                <Button variant="secondary" asChild>
                  <Link href="/app/home">Go to dashboard</Link>
                </Button>
                <SignOut />
            </div>
          ) : <SignIn />}
      </div>
      <footer className="text-sm text-gray-500">
        This is a demo project. No money is deducted/added.
      </footer>
    </div>
  );
}
