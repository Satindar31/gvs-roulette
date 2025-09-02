import { prisma } from "@/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const subjectId = searchParams.get("subjectID");
    if (!subjectId) {
        return NextResponse.json({ error: "Missing or invalid subjectID" }, { status: 400 });
    }



}