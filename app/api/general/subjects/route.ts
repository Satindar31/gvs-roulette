import { prisma } from "@/prisma";

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
