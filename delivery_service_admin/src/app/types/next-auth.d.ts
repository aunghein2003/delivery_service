import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    accessToken: string;
    remember: string;
  }
}
