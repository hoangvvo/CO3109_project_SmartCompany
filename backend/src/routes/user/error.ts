import createError from "@fastify/error";

export const InvalidCredentialsError = createError(
  "INVALID_CREDENTIALS",
  "The email or password you entered is incorrect",
  401,
);

export const DuplicateEmailError = createError(
  "DUPLICATE_EMAIL",
  "Email already in use",
  409,
);
