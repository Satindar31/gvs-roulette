import { prisma } from "@/prisma";

export async function POST(request: Request) {
  const { name, dob, grade, email } = await request.json();

  if (!name || !dob || !grade || !email) {
    return new Response("Missing required fields", { status: 400 });
  }

  try {
    const user = await prisma.user.create({
      data: {
        name,
        dob: new Date(dob),
        grade: {
          connect: {
            grade: Number(grade)
          },
        },
        email,
      },
    });
    return new Response(JSON.stringify(user), {
      status: 200,
    });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.code === 'P2002') {
      return new Response("User already exists", { status: 409 });
    }
    console.error("Error creating user:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
