import { db as prisma } from "@db/client";
import { NextResponse } from "next/server";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { getCurrentUser } from "@libs/session";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    const createdAgentTrips = await prisma.agents.findFirst({
      where: { id: id },
      select: { created_trips: true },
    });

    if (createdAgentTrips == null) {
      return NextResponse.json(
        { error: "Não foi possível encontrar este usuário" },
        { status: 401 }
      );
    }

    return NextResponse.json(createdAgentTrips, {
      status: 200,
      statusText: "Viagens criadas pelo agente encontradas com sucesso!",
    });
  } catch (error) {
    console.error("Erro ao encontrar agente:", error);
    return NextResponse.json(
      { error: "Erro ao encontrar agente" },
      { status: 500 }
    );
  }
}
