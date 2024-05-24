import { NextApiRequest, NextApiResponse } from "next";
import { db as prisma } from "@db/client";
import bcrypt from "bcrypt";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Método não permitido" });
  }

  const { email, password, role, username } = req.body as SignUpInterface;

  var userExist = prisma.users.findFirst({ where: { email: email } });
  var agentExist = prisma.agents.findFirst({ where: { email: email } });

  console.log(userExist);
  console.log(agentExist);

  if (agentExist != null || userExist != null) {
    return res.status(401).json({ error: "Usuário já existe" });
  }

  try {
    switch (role) {
      case RolesEnum.AGENT:
        prisma.agents.create({
          data: {
            email: email,
            password: await bcrypt.hash(password, 10),
            username: username,
          },
        });
        break;
      case RolesEnum.USER:
        prisma.users.create({
          data: {
            email: email,
            password: await bcrypt.hash(password, 10),
            username: username,
          },
        });
        break;
      default:
        return res.status(401).json({ error: "Tipo de usuário não definido" });
    }

    return res.status(200).json({ error: "Usuário registrado com sucesso!" });
  } catch (error) {
    console.error("Erro ao se registrar:", error);
    return res.status(500).json({ error: "Erro no servidor" });
  }
}
