"use client";
import Button from "@components/Button";
import InputField from "@components/InputField";
import { User, Lock, Mail, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Dropdown from "@components/Dropdown";

function FormContent() {
  const [email, setEmail] = useState<string | null>("");
  const [password, setPassword] = useState<string | null>("");
  const [confirmPassword, setConfirmPassword] = useState<string | null>("");
  const [username, setUsername] = useState<string | null>("");
  const [userRole, setUserRole] = useState<string | null>("");

  return (
    <div className="w-full flex flex-col gap-7 pr-52">
      <div>
        <h1 className="font-bold text-4xl">Registre-se</h1>
        <h2 className="font-extralight text-greyApp text-2xl">Venha viver aventuras incríveis!</h2>
      </div>
      <div className="px-6 w-full flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          <InputField
            setInput={setEmail}
            input={email}
            title="Nome de usuário"
            placeHolder="Marcos Relix"
            icon={<User />}
            borderColor="black"
          />
          <Dropdown
            input={userRole}
            setInput={setUserRole}
            icon={<ChevronRight />}
            options={["Usuário", "Agente"]}
            title="Tipo de usuário"
          />
          <div className="bg-blackApp w-full h-[1px]"></div>
          <InputField
            setInput={setPassword}
            input={password}
            title="Email"
            placeHolder="marcosrelix@gmail.com"
            icon={<Mail />}
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
          <InputField
            setInput={setPassword}
            input={password}
            title="Confirme sua senha"
            placeHolder="********"
            icon={<Lock />}
            borderColor="black"
          />
        </div>

        <Button className="py-3 w-full" backgroundColor="black" text="Registre-se" />
      </div>
    </div>
  );
}

export default FormContent;
