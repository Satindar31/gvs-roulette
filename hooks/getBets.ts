import { prisma } from "@/prisma";
import { Bet } from "@/types/bets";

/**
 * Fetch bets by subject ID.
 * @param subjectID - The ID of the subject to fetch bets for.
 * @returns An array of bets associated with the given subject ID.
 */
export async function getBetsBySubjectID(subjectID: number): Promise<Bet[]> {
  try {
    const bets = await prisma.bet.findMany({
      where: {
        question: {
          subject: {
            id: Number(subjectID),
          },
        },
      },
      include: {
        question: {
          include: {
            subject: true,
          },
        },
      },
      cacheStrategy: {
        ttl: 60,
        swr: 30,
      },
    });

    return bets;
  } catch (error) {
    console.error("Error fetching bets:", error);
    return [];
  }
}
