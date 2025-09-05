import { auth } from "@/auth";
import { prisma } from "@/prisma";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { subjectId, questionId, amount, set } = await request.json();

  const session = await auth();

  if (!subjectId || !questionId || !amount || amount <= 0) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }
  try {
    const bet = await prisma.bet.create({
      data: {
        subject: {
          connect: { id: Number(subjectId) },
        },
        question: {
          connect: { id: Number(questionId) },
        },
        amount: Number(amount),
        set: Number(set),
        user: {
          connect: session?.user?.id
            ? { id: session.user.id }
            : session?.user?.email
            ? { email: session.user.email }
            : undefined,
        },
      },
    });
    return NextResponse.json({ bet }, { status: 201 });
  } catch (error) {
    console.error("Error creating bet:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
