import { auth } from "@/auth";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { SessionProvider } from "next-auth/react";
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
            <div className="flex-1 flex items-center justify-center">
              <h1 className="text-4xl sm:text-6xl font-bold text-center">
                {greeting}, {session?.user?.name || "Guest"}!
              </h1>
            </div>
            <footer className="text-sm text-gray-500 text-center pb-4">
              This is a demo project. No money is deducted/added.
            </footer>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </SessionProvider>
  );
}
