import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";

import { db as prisma } from "@db/client";

import bcrypt from "bcrypt";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma as any),
  providers: [
    CredentialProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req): Promise<any> {
        console.log("Authorize method", credentials);

        if (!credentials?.email || !credentials?.password)
          throw new Error("Dados de Login necessarios");

        let selectedUser;

        const user = await prisma.users.findFirst({
          where: { email: credentials.email },
        });

        console.log("USER", user);

        const agent = await prisma.agents.findFirst({
          where: { email: credentials.email },
        });

        console.log("AGENT", agent);

        if (agent != null) {
          selectedUser = agent;
        } else if (user != null) {
          selectedUser = user;
        } else {
          throw new Error("Usuário não encontrado");
        }

        if (!selectedUser.password) {
          throw new Error("Usuários não registrado através de credenciais");
        }

        const matchPassword = await bcrypt.compare(
          credentials.password,
          selectedUser.password
        );
        if (!matchPassword) throw new Error("Senha incorreta");

        return selectedUser;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    // async session({ session, token, user }) {
    //   const getToken = await prisma.users.findFirst({
    //     where: {
    //       id: user.id,
    //     },
    //   });

    //   let accessToken: string | null = null;
    //   if (getToken) {
    //     accessToken = getToken.access_token!;
    //   }

    //   session.user.token = accessToken;
    //   return session;
    // },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
      }
      if (account) {
        token.accessToken = account.access_token;
      }
      return token;
    },
  },
  secret: process.env.SECRET,
  debug: process.env.NODE_ENV === "development",
  pages: {
    signIn: "/login",
    error: "/login",
  },
};
