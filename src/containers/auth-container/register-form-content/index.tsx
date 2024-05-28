"use client";
import Button from "@components/Button";
import InputField from "@components/InputField";
import { User, Lock, Mail, ChevronRight, ImageIcon } from "lucide-react";
import React, { useCallback, useState } from "react";
import toast from "react-hot-toast";
import Dropdown from "@components/Dropdown";
import { useForm, SubmitHandler, FieldErrors } from "react-hook-form";
import { getStringToRole } from "@services/roleFormatter";
import { RolesEnum } from "entities/interfaces";
import { useDropzone } from "react-dropzone";
import Image from "next/image";

interface RegisterFormContentProps {
  handleRegister: (
    email: string,
    username: string,
    role: RolesEnum,
    password: string,
    profile_image: string
  ) => Promise<void>;
}

interface IFormValues {
  Email: string;
  "Nome de usuário": string;
  "Tipo de usuário": string;
  Senha: string;
  "Confirme sua senha": string;
}

function RegisterFormContent(props: Readonly<RegisterFormContentProps>) {
  const { handleRegister } = props;

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [userRole, setUserRole] = useState<"Agente" | "Usuário" | null>(null);
  const [profileImage, setProfileImage] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormValues>();

  const onSubmit: SubmitHandler<IFormValues> = async (data) => {
    if (profileImage == "") {
      toast.error("Imagem não pode ser vazia");
      return;
    }

    if (!["Usuário", "Agente"].includes(userRole!)) {
      toast.error("Tipo de usuário inválido");
      return;
    }

    if (confirmPassword !== password) {
      toast.error("Confirmação de senha deve ser igual a senha");
      return;
    }

    await handleRegister(
      data.Email,
      data["Nome de usuário"],
      getStringToRole(userRole!)!,
      data.Senha,
      profileImage
    );
  };

  const onError = (errors: FieldErrors<IFormValues>) => {
    console.log(errors);
    if (errors["Nome de usuário"]) {
      toast.error("Nome de usuário é obrigatório, deve ter entre 6 e 20 caracteres");
    } else if (errors.Email) {
      toast.error("Email é obrigatório e precisa ser válido");
    } else if (errors["Tipo de usuário"]) {
      toast.error("Tipo de Usuário é obrigatório");
    } else if (errors.Senha) {
      toast.error("Senha é obrigatória");
    } else if (errors["Confirme sua senha"]?.type === "required") {
      toast.error("Confirmação de senha é obrigatória");
    } else if (errors["Confirme sua senha"]?.type === "minLength") {
      toast.error("Confirmação de senha deve ter no mínimo 6 caracteres");
    }
  };

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0]; // Only handle the first file

    const reader = new FileReader();

    reader.onload = (e: ProgressEvent<FileReader>) => {
      if (e.target && typeof e.target.result === "string") {
        setProfileImage(e.target.result);
      }
    };

    reader.readAsDataURL(file);
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxFiles: 1, // Only allow one file
  });

  return (
    <div className="w-full flex flex-col gap-7 pr-52">
      <div>
        <h1 className="font-bold text-4xl">Registre-se</h1>
        <h2 className="font-extralight text-greyApp text-2xl">Venha viver aventuras incríveis!</h2>
      </div>
      <div className="px-6 w-full flex flex-col gap-6">
        <div className="flex flex-col gap-6">
          <div {...getRootProps()} className="flex justify-center items-center w-full">
            {profileImage !== "" ? (
              <div className="flex gap-2 mt-2">
                <div className="cursor-pointer relative rounded-[13px] aspect-square w-[100px]">
                  <input {...getInputProps()} />
                  <Image
                    src={profileImage}
                    alt="Profile"
                    className="rounded-[13px]"
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </div>
            ) : (
              <div className=" justify-center flex-shrink-0 flex items-center cursor-pointer border-2 border-dashed border-blackApp rounded-[13px] aspect-square w-[100px]">
                <input {...getInputProps()} />
                <ImageIcon size={25} />
              </div>
            )}
          </div>

          <InputField
            {...register("Nome de usuário", {
              required: "Nome de usuário é obrigatório",
            })}
            setInput={setUsername}
            input={username}
            title="Nome de usuário"
            placeHolder="Marcos Relix"
            icon={<User />}
            borderColor="black"
          />
          <Dropdown
            {...register("Tipo de usuário", {})}
            input={userRole}
            setInput={setUserRole}
            icon={<ChevronRight />}
            options={["Usuário", "Agente"]}
            title="Tipo de usuário"
          />
          <div className="bg-blackApp w-full h-[1px]"></div>
          <InputField
            {...register("Email", {
              required: "Email é obrigatório",
              pattern: {
                value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                message: "Email inválido",
              },
            })}
            setInput={setEmail}
            input={email}
            title="Email"
            placeHolder="marcosrelix@gmail.com"
            icon={<Mail />}
            borderColor="black"
          />
          <InputField
            {...register("Senha", {
              required: "Senha é obrigatória",
              minLength: {
                value: 6,
                message: "Senha deve ter no mínimo 6 caracteres",
              },
            })}
            setInput={setPassword}
            input={password}
            title="Senha"
            placeHolder="********"
            icon={<Lock />}
            borderColor="black"
            type="password"
          />
          <InputField
            {...register("Confirme sua senha", {
              required: "Confirmação de senha é obrigatória",
              minLength: {
                value: 6,
                message: "Confirmação de senha deve ter no mínimo 6 caracteres",
              },
            })}
            setInput={setConfirmPassword}
            input={confirmPassword}
            title="Confirme sua senha"
            placeHolder="********"
            icon={<Lock />}
            borderColor="black"
            type="password"
          />
        </div>
        <div>
          <Button
            onPressed={handleSubmit(onSubmit, onError)}
            type="submit"
            className="py-3 w-full"
            backgroundColor="black"
            text="Registre-se"
          />
        </div>
      </div>
    </div>
  );
}

export default RegisterFormContent;
