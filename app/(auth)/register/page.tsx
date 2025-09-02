import { GalleryVerticalEnd } from "lucide-react";
import Image from "next/image";
import { RegisterForm } from "@/components/auth/registerform";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function RegisterPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="bg-muted relative hidden lg:block">
        <Image
        fill
          src="/registerBg.svg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-col justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            <p>PaperBazaar</p>
          </a>
          <p className="text-sm">Illustration by <Button variant="link" asChild size="sm" className="p-0"><Link href="https://unsplash.com/@andsproject?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">ands</Link></Button> on <Button variant="link" size="sm" className="p-0"><Link href="https://unsplash.com/illustrations/girl-reaches-for-the-moon-in-a-dreamy-night-sky--ZVXDrYaN8o?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</Link></Button></p>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <RegisterForm />
          </div>
        </div>
      </div>
    </div>
  );
}
