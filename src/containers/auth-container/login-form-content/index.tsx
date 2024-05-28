"use client";
import Button from "@components/Button";
import InputField from "@components/InputField";
import { User, Lock } from "lucide-react";
import React, { useState } from "react";

interface LoginFormContentProps {
  handleLogin: (email: string, password: string) => Promise<void>;
}

function LoginFormContent(props: Readonly<LoginFormContentProps>) {
  const { handleLogin } = props;

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  return (
    <div className="w-full flex flex-col gap-7 pr-52 pt-24">
      <div>
        <h1 className="font-bold text-4xl">Login</h1>
        <h2 className="font-extralight text-greyApp text-2xl">Viaje para lugares incríveis</h2>
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
            type="password"
          />
        </div>

        <Button
          onPressed={async () => await handleLogin(email, password)}
          className="py-3 w-full"
          backgroundColor="black"
          text="Login"
        />
      </div>
    </div>
  );
}

export default LoginFormContent;
