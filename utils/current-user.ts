import { auth } from "@/app/api/auth/options";

export const currentUser = async () => {
  const session = await auth();

  return session?.user;
};
