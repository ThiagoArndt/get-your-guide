import { RolesEnum } from "@entities/interfaces";
import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession`, and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User;
  }

  interface User {
    username?: string;
    profile_image?: Buffer;
    role?: RolesEnum;
    profile_image_path: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    profile_image_path: string;
    username?: string;
    profile_image?: string;
    role?: RolesEnum;
  }
}
