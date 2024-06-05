import { NextApiRequest, NextApiResponse } from "next/types";
import { db as prisma } from "@db/client";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@libs/session";

export async function POST(req: Request) {
  try {
    const { tripId } = await req.json();
    const user = await getCurrentUser();
    if (user == null) {
      return NextResponse.json(
        {},
        { status: 401, statusText: "Usuário não autenticado" }
      );
    }

    const agentData = await prisma.agents.findMany({ where: { id: user.id } });
    let agentTrips = agentData[0].created_trips;

    var index = agentTrips.indexOf(tripId);
    if (index !== -1) {
      agentTrips.splice(index, 1);
    }

    const res = await prisma.agents.updateMany({
      where: { id: user.id },
      data: {
        created_trips: agentTrips,
        email: agentData[0].email,
        password: agentData[0].password,
        profile_image: agentData[0].profile_image,
        username: agentData[0].username,
      },
    });

    const tripData = await prisma.trips.delete({
      where: {
        id: tripId,
      },
    });
    return NextResponse.json(tripData, {
      status: 200,
      statusText: "Viagem deletada com sucesso!",
    });
  } catch (error) {
    console.error("Erro ao deletar viagem:", error);
    return NextResponse.json({ error: "Erro no servidor" }, { status: 500 });
  }
}
