import { User } from "@/types/user";
import argon2 from "argon2";
import { nanoid } from "nanoid";
import { appSessionRepository } from "../database";

export function comparePassword(
  password: string,
  passwordHash: string,
): Promise<boolean> {
  return argon2.verify(passwordHash, password);
}

export function hashPassword(password: string): Promise<string> {
  return argon2.hash(password);
}

export async function createSession(userId: number) {
  const token = nanoid(32);

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 7);

  await appSessionRepository.insertSession({
    user_id: userId,
    token,
    expires_at: expiresAt,
  });

  return { token, expiresAt };
}

export async function deleteSession(token: string) {
  return appSessionRepository.deleteSessionByToken(token);
}

export async function getUserBySession(token: string): Promise<User | null> {
  const res = await appSessionRepository.getUserBySessionToken(token);
  if (!res) {
    return null;
  }

  return {
    id: res.id,
    email: res.email,
    name: res.name,
    image_url: res.image_url,
  };
}
