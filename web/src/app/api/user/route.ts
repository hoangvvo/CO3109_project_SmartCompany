import { authService } from "@/backend/services";
import { User } from "@/types/user";
import { cookies } from "next/headers";

export interface ApiUserGetResponse {
  user: User | null;
}

export async function GET(request: Request) {
  const user = await authService.getUserBySession(
    cookies().get("authToken")?.value,
  );
  return Response.json({
    user,
  });
}
