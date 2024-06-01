import { NextApiRequest, NextApiResponse } from "next/types";
import { db as prisma } from "@db/client";
import { NextResponse } from "next/server";

export default async function GET(req: Request) {
  try {
    const tripsData = await prisma.trips.findMany();
    return NextResponse.json(
      { data: tripsData },
      { status: 200, statusText: "Viagens resgatadas com sucesso!" }
    );
  } catch (error) {
    console.error("Erro ao resgatar viagens", error);
    return NextResponse.json(
      { error: "Erro ao resgatar viagens" },
      { status: 401 }
    );
  }
}
