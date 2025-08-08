import { GalleryVerticalEnd } from "lucide-react"

import { LoginForm } from "@/components/auth/loginform"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex flex-col justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            GVS Roulette
          </a>
          <p className="text-sm">Illustration by <Button variant="link" asChild size="sm" className="p-0"><Link href="https://unsplash.com/@dilettadavolio?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Diletta Davolio</Link></Button> on <Button variant="link" size="sm" className="p-0"><Link href="https://unsplash.com/illustrations/heres-a-caption-drawn-daisies-in-black-and-white-QTPv_54LSjQ?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash">Unsplash</Link></Button></p>

        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <LoginForm />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <Image
          src="/loginBg.svg"
          fill={true}
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
