"use client";
import Button from "@components/Button";
import InputField from "@components/InputField";
import { User, Lock, Mail, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import toast from "react-hot-toast";
import Dropdown from "@components/Dropdown";
import { useForm, SubmitHandler } from "react-hook-form";

interface RegisterFormContentProps {
  handleRegister: (
    email: string,
    username: string,
    role: RolesEnum,
    password: string
  ) => Promise<void>;
}

interface IFormValues {
  Email: string;
  "Nome de usuário": string;
  "Tipo de usuário": string;
  Senha: string;
  "Confirme sua senha": string;
}

function RegisterFormContent(props: RegisterFormContentProps) {
  const { handleRegister } = props;

  const [email, setEmail] = useState<string | null>("");
  const [password, setPassword] = useState<string | null>("");
  const [confirmPassword, setConfirmPassword] = useState<string | null>("");
  const [username, setUsername] = useState<string | null>("");
  const [userRole, setUserRole] = useState<"Agente" | "Usuário" | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>();

  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    if (!["Usuário", "Agente"].includes(userRole!)) {
      toast.error("Tipo de usuário inválido");
      return;
    }

    if (confirmPassword !== password) {
      toast.error("Confirmação de senha deve ser igual a senha");
    }

    if (Object.keys(errors).length > 0) {
      if (errors.Email) {
        toast.error("Email é obrigatório e precisa ser válido");
      } else if (errors["Nome de usuário"]) {
        toast.error(
          "Nome de usuário é obrigatório, deve ter entre 6 e 20 caracteres"
        );
      } else if (errors.Senha) {
        toast.error("Senha é obrigatória");
      } else if (errors["Confirme sua senha"]?.type === "required") {
        toast.error("Confirmação de senha é obrigatória");
      } else if (errors["Confirme sua senha"]?.type === "minLength") {
        toast.error("Confirmação de senha deve ter no mínimo 6 caracteres");
      }
      return;
    }
    await handleRegister(
      email!,
      username!,
      getStringToRole(userRole!)!,
      password!
    );
  };

  return (
    <div className="w-full flex flex-col gap-7 pr-52">
      <div>
        <h1 className="font-bold text-4xl">Registre-se</h1>
        <h2 className="font-extralight text-greyApp text-2xl">
          Venha viver aventuras incríveis!
        </h2>
      </div>
      <div className="px-6 w-full flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          <InputField
            {...register("Nome de usuário", {
              required: true,
              maxLength: 20,
              minLength: 6,
            })}
            setInput={setUsername}
            input={username}
            title="Nome de usuário"
            placeHolder="Marcos Relix"
            icon={<User />}
            borderColor="black"
          />
          <Dropdown
            {...register("Tipo de usuário")}
            input={userRole}
            setInput={setUserRole}
            icon={<ChevronRight />}
            options={["Usuário", "Agente"]}
            title="Tipo de usuário"
          />
          <div className="bg-blackApp w-full h-[1px]"></div>
          <InputField
            {...register("Email")}
            setInput={setEmail}
            input={email}
            title="Email"
            placeHolder="marcosrelix@gmail.com"
            icon={<Mail />}
            borderColor="black"
          />
          <InputField
            {...register("Senha")}
            setInput={setPassword}
            input={password}
            title="Senha"
            placeHolder="********"
            icon={<Lock />}
            borderColor="black"
          />
          <InputField
            {...register("Confirme sua senha")}
            setInput={setConfirmPassword}
            input={confirmPassword}
            title="Confirme sua senha"
            placeHolder="********"
            icon={<Lock />}
            borderColor="black"
          />
        </div>

        <Button
          onPressed={handleSubmit(onSubmit)}
          className="py-3 w-full"
          backgroundColor="black"
          text="Registre-se"
        />
      </div>
    </div>
  );
}

export default RegisterFormContent;
