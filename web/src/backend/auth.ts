import { pool } from "@/backend/database";
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from "@/constants/environments";
import PostgresAdapter from "@auth/pg-adapter";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
} = NextAuth({
  adapter: PostgresAdapter(pool),
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],
});
