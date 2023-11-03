import { appUserRepository } from "@/backend/database";
import { authService } from "@/backend/services";
import { User } from "@/types/user";
import { cookies } from "next/headers";

export interface ApiUserLoginRequest {
  email: string;
  password: string;
}

export interface ApiUserLoginResponse {
  user: User;
}

export async function POST(request: Request) {
  const { email, password } = (await request.json()) as ApiUserLoginRequest;

  const user = await appUserRepository.getUserByEmail(email);

  if (!user) {
    return Response.json(
      { message: "Email or password is incorrect" },
      { status: 401 },
    );
  }

  const passwordMatch = await authService.comparePassword(
    password,
    user.password_hash,
  );

  if (!passwordMatch) {
    return Response.json({ message: "Incorrect password" }, { status: 401 });
  }

  const { token: authToken, expiresAt } = await authService.createSession(
    user.id,
  );

  cookies().set("authToken", authToken, {
    httpOnly: true,
    path: "/",
    expires: expiresAt,
  });

  return Response.json({
    user,
  });
}
