import { appUserRepository } from "@/backend/database";
import { authService } from "@/backend/services";
import { User } from "@/types/user";
import { cookies } from "next/headers";

export interface ApiUserSignupRequest {
  email: string;
  password: string;
  name: string;
}

export interface ApiUserSignupResponse {
  user: User;
}

export async function POST(request: Request) {
  const { email, password, name } =
    (await request.json()) as ApiUserSignupRequest;

  const user = await appUserRepository.getUserByEmail(email);

  if (user) {
    return Response.json({ message: "Email already in use" }, { status: 409 });
  }

  const passwordHash = await authService.hashPassword(password);

  const newUser = await appUserRepository.createUser({
    email,
    password_hash: passwordHash,
    name,
  });

  const { token: authToken, expiresAt } = await authService.createSession(
    newUser.id,
  );

  cookies().set("authToken", authToken, {
    httpOnly: true,
    path: "/",
    expires: expiresAt,
  });

  return Response.json({
    user: newUser,
  });
}
