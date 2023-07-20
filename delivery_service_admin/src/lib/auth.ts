import axios from "axios";
import { NextAuthOptions, User, getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { redirect } from "next/navigation";

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        code: { type: "text", label: "Code" },
        password: { type: "password", label: "Password" },
      },
      async authorize(credentials) {
        if (!credentials || !credentials.code || !credentials.password) {
          return null;
        }
        const { data } = await axios.post(`${process.env.NEXT_API_URL}/auth`, {
          code: credentials.code,
          password: credentials.password,
        });

        if (!data) {
          return null;
        }

        if (data && !data.success) {
          throw new Error(data.msg);
        } else {
          return data as User;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60 * 24,
  },
  callbacks: {
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ token, user, session }) {
      session.user = token;

      return session;
    },
  },
};

export async function loginIsRequired() {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/auth");
  }
}
