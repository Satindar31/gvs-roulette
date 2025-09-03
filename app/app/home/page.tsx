import { auth } from "@/auth";
import { AppSidebar } from "@/components/app-sidebar";
import { Button } from "@/components/ui/button";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { SessionProvider } from "next-auth/react";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await auth();
  // wish good morning/afetrnoon/evening based on time
  const currentHour = new Date().getHours();
  let greeting = "Hello";
  if (currentHour < 12) {
    greeting = "Good morning";
  } else if (currentHour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  if (session?.user?.name == null) {
    redirect("/app/onboarding");
  }

  return (
    <SessionProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
            </div>
          </header>
          <div className="flex flex-col justify-between p-4 pt-0 w-full h-full min-h-[calc(100vh-4rem)]">
            <div className="flex-1 flex flex-col items-center justify-center gap-8">
              <h1 className="text-4xl sm:text-6xl font-bold text-center text-zinc-900">
                {greeting}, {session.user.name.split(" ")[0] ?? "Guest"}!
              </h1>
              <div className="flex flex-row gap-6">
                <Button data-umami-event="Start gambling button" asChild>
                  <Link href={"/app/bets"}>Start gambling</Link>
                </Button>
                <Tooltip>
                  <TooltipTrigger className="w-fit px-4 py-1 inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive border bg-background shadow-xs hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50">
                    View history
                  </TooltipTrigger>
                  <TooltipContent>This feature is coming soon!</TooltipContent>
                </Tooltip>
              </div>
            </div>
            <footer className="text-sm text-gray-500 text-center pb-4 flex flex-col items-center">
              This is a demo project. No money is deducted/added.
            </footer>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </SessionProvider>
  );
}
