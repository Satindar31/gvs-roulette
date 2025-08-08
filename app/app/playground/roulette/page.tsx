// Make a super cool and modern funky looking coming soon page with theme only

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ComingSoon() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-7xl font-extrabold text-zinc-800 drop-shadow-lg">Coming Soon</h1>
      <p className="mt-4 text-lg text-black drop-shadow-md">We&apos;re working hard to get this page ready for you.</p>
      <Button variant="link" asChild>
        <Link href="/">Go back home</Link>
      </Button>
    </div>
  );
}
