import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface User {
    accessToken: string;
    success: boolean;
  }
  interface Session extends DefaultSession {
    user?: JWT;
  }
}
