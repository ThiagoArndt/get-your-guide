"use client";
import Button from "@components/Button";
import InputField from "@components/InputField";
import { User, Lock } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { signIn } from "next-auth/react";

function FormContent() {
  const [email, setEmail] = useState<string | null>("");
  const [password, setPassword] = useState<string | null>("");

  const handleLogin = async () => {
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
    }
  };

  return (
    <div className="w-full flex flex-col gap-7 pr-52 pt-24">
      <div>
        <h1 className="font-bold text-4xl">Login</h1>
        <h2 className="font-extralight text-greyApp text-2xl">
          Viaje para lugares incríveis
        </h2>
      </div>
      <div className="px-6 w-full flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          <InputField
            setInput={setEmail}
            input={email}
            title="Email"
            placeHolder="user@gmail.com"
            icon={<User />}
            borderColor="black"
          />
          <InputField
            setInput={setPassword}
            input={password}
            title="Senha"
            placeHolder="********"
            icon={<Lock />}
            borderColor="black"
          />
        </div>

        <Button
          onPressed={handleLogin}
          className="py-3 w-full"
          backgroundColor="black"
          text="Login"
        />
      </div>
    </div>
  );
}

export default FormContent;
