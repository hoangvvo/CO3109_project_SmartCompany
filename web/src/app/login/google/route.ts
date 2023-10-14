import { signIn } from "@/backend/auth";

export const GET = () => {
  return signIn("google");
};
