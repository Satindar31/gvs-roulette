import { auth } from "@/auth";
import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const grade = searchParams.get("grade");
  if (!grade) {
    return new Response("Missing grade", { status: 400 });
  }

  const subjects = await prisma.subject.findMany({
    where: {
      grades: {
        some: {
          grade: {
            grade: Number(grade),
          },
        },
      },
    },
    orderBy: {
      name: "asc",
    },
  });
  return Response.json(subjects);
}

export async function POST(req: Request) {
  const { subjects, email }: { subjects: []; email: string } = await req.json();

  const session = await auth();
  if (email == session?.user?.email) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  try {
    const updatedUser = await prisma.user.update({
      where: {
        email: email,
      },
      data: {
        subjects: {
          set: subjects,
        },
      },
    });
    return new NextResponse(JSON.stringify(updatedUser), { status: 201 });
  } catch (err) {
    return new NextResponse(
      JSON.stringify({ error: "Failed to update user" }),
      { status: 500 }
    );
  }
}
