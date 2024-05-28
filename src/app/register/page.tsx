"use client";
import FormContent from "@containers/auth-container/register-form-content";
import ImageContent from "@containers/auth-container/image-content";
import { useState } from "react";
import axios, { AxiosError } from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { RolesEnum } from "@entities/interfaces";

function RegisterPage() {
  const router = useRouter();

  const handleRegister = async (
    email: string,
    username: string,
    role: RolesEnum,
    password: string,
    profile_image: string
  ) => {
    try {
      const res = await axios.post("/api/register", {
        email: email,
        username: username,
        role: role,
        password: password,
        profile_image: profile_image,
      });
      toast.success(res.statusText);
      router.push("/login");
    } catch (e) {
      if (axios.isAxiosError(e)) {
        toast.error(e.message);
      } else {
        toast.error("Oops, algo de errado aconteceu");
      }
    }
  };

  return (
    <div className="flex flex-row px-24">
      <ImageContent />
      <FormContent handleRegister={handleRegister} />
    </div>
  );
}

export default RegisterPage;
