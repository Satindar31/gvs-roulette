import { auth } from "@/auth";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

import {
  BookOpen,
  Bot,
  Frame,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from "lucide-react";
import { SessionProvider } from "next-auth/react";
import { redirect, RedirectType } from "next/navigation";
import { Suspense } from "react";

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
    redirect("/app/onboarding", RedirectType.replace);
  }

  const data = {
    user: {
      name: session?.user?.name || "Guest",
      email: session?.user?.email || "guest@example.com",
      avatar: session?.user?.image || "/avatars/default.jpg",
    },
    navMain: [
      {
        title: "Playground",
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: "History",
            url: "#",
          },
          {
            title: "Starred",
            url: "#",
          },
          {
            title: "Settings",
            url: "#",
          },
        ],
      },
      {
        title: "Models",
        url: "#",
        icon: Bot,
        items: [
          {
            title: "Genesis",
            url: "#",
          },
          {
            title: "Explorer",
            url: "#",
          },
          {
            title: "Quantum",
            url: "#",
          },
        ],
      },
      {
        title: "Documentation",
        url: "#",
        icon: BookOpen,
        items: [
          {
            title: "Introduction",
            url: "#",
          },
          {
            title: "Get Started",
            url: "#",
          },
          {
            title: "Tutorials",
            url: "#",
          },
          {
            title: "Changelog",
            url: "#",
          },
        ],
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings2,
        items: [
          {
            title: "General",
            url: "#",
          },
          {
            title: "Team",
            url: "#",
          },
          {
            title: "Billing",
            url: "#",
          },
          {
            title: "Limits",
            url: "#",
          },
        ],
      },
    ],
    projects: [
      {
        name: "Design Engineering",
        url: "#",
        icon: Frame,
      },
      {
        name: "Sales & Marketing",
        url: "#",
        icon: PieChart,
      },
      {
        name: "Travel",
        url: "#",
        icon: Map,
      },
    ],
  };

  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <Suspense fallback={<p>Loading...</p>}>
        <SidebarProvider>
          <SessionProvider>
            <AppSidebar />
          </SessionProvider>
        </SidebarProvider>
      </Suspense>

      <h1 className="text-4xl font-bold">
        {greeting}, {session?.user?.name || "Guest"}!
      </h1>

      <footer className="text-sm text-gray-500">
        This is a demo project. No money is deducted/added.
      </footer>
    </div>
  );
}
