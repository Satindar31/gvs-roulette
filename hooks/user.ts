import { prisma } from "@/prisma";
import { Session } from "next-auth";

export async function checkUserAdmin(session: Session | null) {
  if (!session || !session.user) {
    return false;
  }

  try {
    // Check if the user has admin privileges
    const userPrisma = await prisma.user.findUnique({
      where: {
        email: session.user.email!.toString(),
      },
      cacheStrategy: {
        ttl: 60 * 30,
        swr: 60,
      },
    });

    const admin = userPrisma?.admin;

    return {
      isAdmin: admin,
      user: userPrisma,
    };
  } catch (error) {
    console.error("Error checking user admin status:", error);
    return {
      isAdmin: false,
      user: null,
    };
  }
}

export async function userDOBSet(session: Session | null) {
  if (!session || !session.user) {
    return false;
  }
  try {
    const userPrisma = await prisma.user.findUnique({
      where: {
        email: session.user.email!.toString(),
      },
    });
    return userPrisma?.dob != null;
  } catch (error) {
    console.error("Error checking user DOB status:", error);
    return false;
  }
}
