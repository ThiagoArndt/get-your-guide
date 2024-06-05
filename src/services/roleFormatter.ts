import { RolesEnum } from "@entities/interfaces";

export const getRoleToString = (role: RolesEnum) => {
  if (role === RolesEnum.AGENT) {
    return "Agente";
  } else if (role === RolesEnum.USER) {
    return "Usuário";
  }
};

export const getStringToRole = (input: "Usuário" | "Agente") => {
  if (input.toLocaleLowerCase() === "usuário") {
    return RolesEnum.USER;
  } else if (input.toLocaleLowerCase() === "agente") {
    return RolesEnum.AGENT;
  }
};
