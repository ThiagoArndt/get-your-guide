import { db as prisma } from "@db/client";
import bcrypt from "bcrypt";
import { SignUpInterface, RolesEnum } from "@entities/interfaces";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log(req);
  const { email, password, role, username, profile_image } = (await req.json()) as SignUpInterface;

  var userExist = await prisma.users.findFirst({ where: { email: email } });
  var agentExist = await prisma.agents.findFirst({ where: { email: email } });

  console.log(userExist);
  console.log(agentExist);

  if (agentExist != null || userExist != null) {
    return NextResponse.json({ error: "Usuário já existe" }, { status: 401 });
  }

  let userData;

  try {
    switch (role) {
      case RolesEnum.AGENT:
        userData = await prisma.agents.create({
          data: {
            email: email,
            password: await bcrypt.hash(password, 10),
            username: username,
            profile_image: Buffer.from(profile_image, "base64"),
            created_trips: [],
          },
        });
        break;
      case RolesEnum.USER:
        userData = await prisma.users.create({
          data: {
            email: email,
            password: await bcrypt.hash(password, 10),
            username: username,
            profile_image: Buffer.from(profile_image, "base64"),
            liked_items: [],
          },
        });
        break;
      default:
        return NextResponse.json({ error: "Tipo de usuário não definido" }, { status: 401 });
    }

    return NextResponse.json(
      { data: userData },
      { status: 200, statusText: "Usuário registrado com sucesso!" }
    );
  } catch (error) {
    console.error("Erro ao se registrar:", error);
    return NextResponse.json({ error: "Erro no servidor" }, { status: 500 });
  }
}
