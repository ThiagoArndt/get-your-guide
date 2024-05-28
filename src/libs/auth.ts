import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import CredentialProvider from "next-auth/providers/credentials";

import { db as prisma } from "@db/client";

import bcrypt from "bcrypt";
import { saveBase64Image } from "@services/imageHelper";

// Directory to store profile images

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
          selectedUser = { ...agent, role: "agent" };
        } else if (user != null) {
          selectedUser = { ...user, role: "user" };
        } else {
          throw new Error("Usuário não encontrado");
        }

        if (!selectedUser.password) {
          throw new Error("Usuários não registrado através de credenciais");
        }

        const matchPassword = await bcrypt.compare(credentials.password, selectedUser.password);
        if (!matchPassword) throw new Error("Senha incorreta");

        // Store profile image locally
        const base64Image = selectedUser.profile_image.toString("base64");
        const profileImagePath = saveBase64Image(base64Image, selectedUser.id);
        selectedUser = { ...selectedUser, profile_image_path: profileImagePath };
        return selectedUser;
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async session({ session, token, user }) {
      console.log(session, token, user);
      if (token) {
        // Retrieve profile image path
        session.user.role = token.role;
        session.user.email = token.email;
        session.user.profile_image_path = token.profile_image_path;
      }
      return session;
    },
    async jwt({ token, user, account }) {
      console.log(token, user, account);
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.profile_image_path = user.profile_image_path;
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
