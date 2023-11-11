import createError from "@fastify/error";

export const StateSetTimeoutError = createError(
  "STATE_SET_TIMEOUT_ERROR",
  "Does not receive state changed response from device",
  500,
);
