// Make a super cool and modern funky looking coming soon page with theme only

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ComingSoon() {

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {/* Add a Russian Roulette wheel */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-64 h-64 border-8 border-dashed border-gray-300 rounded-full animate-spin"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-32 h-32 border-8 border-dashed border-gray-400 rounded-full animate-spin"></div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-8 border-dashed border-gray-500 rounded-full animate-spin"></div>
        </div>
      </div>
    </div>
  );
}
