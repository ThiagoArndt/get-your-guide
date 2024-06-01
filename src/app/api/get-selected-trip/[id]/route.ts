import { db as prisma } from "@db/client";
import { NextResponse } from "next/server";
import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { getCurrentUser } from "@libs/session";

export async function GET(req: Request, { params }: Params) {
  const id = params.id;
  try {
    const trip = await prisma.trips.findFirst({ where: { id: id } });

    if (trip == null) {
      return NextResponse.json(
        { error: "Não foi possível encontrar esta viagem" },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { data: trip },
      { status: 200, statusText: "Viagem encontrada com sucesso!" }
    );
  } catch (error) {
    console.error("Erro ao se registrar:", error);
    return NextResponse.json({ error: "Erro no servidor" }, { status: 500 });
  }
}
