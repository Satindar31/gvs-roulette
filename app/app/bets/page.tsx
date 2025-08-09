import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export default async function BetsPage() {
  const session = await auth();

  if (!session || !session.user?.email) {
    redirect("/login");
  }
  async function fetchClass() {
    try {
      const grade = await prisma.user.findFirst({
        where: {
          email: session!.user!.email!,
        },
        select: {
          grade: true,
          
        },
      });

      return grade!.grade;
    } catch (error) {
      console.error("Error fetching user grade:", error);
      toast.error("Failed to fetch user grade.");
      return null;
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="texttext-2xl font-bold">Bets Page</h1>
    </div>
  );
}
