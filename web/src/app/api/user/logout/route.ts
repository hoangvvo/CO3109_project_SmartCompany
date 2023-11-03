import { authService } from "@/backend/services";
import { cookies } from "next/headers";

export async function POST() {
  const authTokenCookie = cookies().get("authToken");

  if (authTokenCookie) {
    cookies().delete("authToken");
    await authService.deleteSession(authTokenCookie.value);
  }

  return new Response(null, {
    status: 204,
  });
}
