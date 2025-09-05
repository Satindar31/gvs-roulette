import { prisma } from "@/prisma";
import { Question } from "@prisma/client";

/**
 * Fetch questions by subject ID.
 * @param subjectID - The ID of the subject to fetch questions for.
 * @returns An array of questions associated with the given subject ID.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function getQuestionsBySubjectID(subjectID: number): Promise<any[]> {
  try {
    const questions = await prisma.question.findMany({
      where: {
        subjectId: subjectID,
      },
      include: {
        subject: true,
        Bet: true,
      }
    })

    return questions
  } catch (error) {
    console.error("Error fetching questions:", error);
    return [];
  }
}
