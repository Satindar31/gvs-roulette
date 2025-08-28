"use client";

import dynamic from "next/dynamic";
import { createPostgresAdapter } from "@prisma/studio-core/data/postgres-core";
import { createStudioBFFClient } from "@prisma/studio-core/data/bff";
import { useMemo, Suspense, useState } from "react";
import StudioWrapper from "@/components/admin/db/StudioWrapper";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { REGEXP_ONLY_DIGITS } from "input-otp"
import { Label } from "@/components/ui/label";

// Dynamically import Studio with no SSR to avoid hydration issues
const Studio = dynamic(
  () => import("@prisma/studio-core/ui").then((mod) => mod.Studio),
  {
    ssr: false,
  }
);

// Loading component
const StudioLoading = () => (
  <div className="flex items-center justify-center h-full">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p className="mt-4 text-gray-600">Loading Studio...</p>
    </div>
  </div>
);

// Client-only Studio component
const ClientOnlyStudio = () => {
  const adapter = useMemo(() => {
    // Create the HTTP client that communicates with our API endpoint
    const executor = createStudioBFFClient({
      url: "/api/studio",
    });

    // Create the Postgres adapter using the executor
    return createPostgresAdapter({ executor });
  }, []);

  return <Studio adapter={adapter} />;
};

export default function DbAdminPage() {
  const [pass, setPass] = useState("");
  const [auth, setAuth] = useState(false);

  // You can add authentication logic here, e.g., setAuth(true) when pass is correct
  
  if (!auth) {
    return (
      <form onSubmit={(e) => {
        e.preventDefault();
        if (pass === process.env.NEXT_PUBLIC_ADMIN_PASS) {
          setAuth(true);
        }
      }} className="h-screen flex flex-col items-center justify-center">
        <Label className="font-normal mb-2">Enter the passcode</Label>
        <InputOTP
          maxLength={6}
          value={pass}
          onChange={(value) => setPass(value)}
          pattern={REGEXP_ONLY_DIGITS}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSeparator />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSeparator />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </form>
    );
  }

  return (
    <StudioWrapper>
      <Suspense fallback={<StudioLoading />}>
        <ClientOnlyStudio />
      </Suspense>
    </StudioWrapper>
  );
}
