export const unauthorizedResponse = Response.json(
  { message: "You must be logged in to access this resource" },
  { status: 401 },
);
