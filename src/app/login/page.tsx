"use client";
import FormContent from "@containers/auth-container/login-form-content";
import ImageContent from "@containers/auth-container/image-content";
import toast from "react-hot-toast";
import axios from "axios";
import { RolesEnum } from "@entities/interfaces";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

function LoginPage() {
  const router = useRouter();

  const handleLogin = async (email: string, password: string) => {
    try {
      const result = await signIn("credentials", {
        callbackUrl: "/",
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        toast.error(result.error);
      } else {
        toast.success("Login successful!");
        router.push("/");
      }
    } catch (e) {
      toast.error("Oops, algo deu errado");
    }
  };

  return (
    <div className="flex flex-row px-24">
      <FormContent handleLogin={handleLogin} />
      <ImageContent />
    </div>
  );
}

export default LoginPage;
