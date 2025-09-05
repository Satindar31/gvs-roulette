import { auth } from "@/auth";
import SubjectForm11 from "@/components/bets/classes/11";
import SubjectForm from "@/components/bets/classes/subjects";
import { prisma } from "@/prisma";
import { SessionProvider } from "next-auth/react";
import { redirect } from "next/navigation";
import { Suspense } from "react";
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
          subjects: true,
        },
      });

      return grade;
    } catch (error) {
      console.error("Error fetching user grade:", error);
      toast.error("Failed to fetch user grade.");
      return null;
    }
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold">Bets Page</h1>
      {await fetchClass().then((grade) => {
        if (grade?.subjects.length === 0) {
            return (
              <SessionProvider>
                <Suspense fallback={<div>Loading...</div>}>
                    <SubjectForm grade={grade!.grade!.grade} />
                </Suspense>
              </SessionProvider>
            )
        }
        else if (grade!.grade!.grade === 11) {
            return (
                <SubjectForm11 subjects={grade!.subjects} />
            )
        }
        // else if (grade!.grade!.grade === 12) {
        //     return (
        //         <SubjectForm12 subjects={grade.subjects} />
        //     )
        // }
      })}
    </div>
  );
}
