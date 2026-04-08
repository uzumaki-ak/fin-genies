import { auth, currentUser } from "@clerk/nextjs/server";
import { db } from "@/lib/prisma";

const getDisplayName = (clerkUser) => {
  const fullName = [clerkUser.firstName, clerkUser.lastName]
    .filter(Boolean)
    .join(" ")
    .trim();

  return (
    fullName ||
    clerkUser.username ||
    clerkUser.emailAddresses?.[0]?.emailAddress?.split("@")[0] ||
    "User"
  );
};

export async function getDbUser() {
  const { userId } = await auth();
  if (!userId) {
    throw new Error("unauthorized");
  }

  const existingUser = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (existingUser) {
    return existingUser;
  }

  const clerkUser = await currentUser();
  const email = clerkUser?.emailAddresses?.[0]?.emailAddress;

  if (!clerkUser || !email) {
    throw new Error("unable to sync user profile");
  }

  return db.user.upsert({
    where: { clerkUserId: userId },
    update: {
      email,
      name: getDisplayName(clerkUser),
      imageUrl: clerkUser.imageUrl,
    },
    create: {
      clerkUserId: userId,
      email,
      name: getDisplayName(clerkUser),
      imageUrl: clerkUser.imageUrl,
    },
  });
}
