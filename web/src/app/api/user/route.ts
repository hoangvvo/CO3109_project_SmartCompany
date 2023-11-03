import { authService } from "@/backend/services";
import { User } from "@/types/user";
import { cookies } from "next/headers";

export interface ApiUserGetResponse {
  user: User | null;
}

export async function GET(request: Request) {
  const authTokenCookie = cookies().get("authToken");
  if (!authTokenCookie) {
    return Response.json({ user: null });
  }

  const authUser = await authService.getUserBySession(authTokenCookie.value);
  return Response.json({
    user: authUser,
  });
}
