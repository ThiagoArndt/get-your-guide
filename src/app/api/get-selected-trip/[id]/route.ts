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
    const trip = await prisma.trips.findFirst({ where: { id: id } });

    if (trip == null) {
      return NextResponse.json(
        { error: "Não foi possível encontrar esta viagem" },
        { status: 401 }
      );
    }
    const creator = await prisma.agents.findUnique({
      where: { id: trip.created_by },
      select: { id: true, username: true, profile_image: true, email: true },
    });

    let responseTrip = {
      created_by: {
        id: creator?.id,
        profile_image: creator?.profile_image,
        username: creator?.username,
        email: creator?.email,
      },
      comments: trip.comments,
      checkInDate: trip.date_initial,
      checkOutDate: trip.date_final,
      destination: trip.location,
      id: trip.id,
      images: trip.images,
      maxPeople: trip.number_people,
      price: trip.price,
      title: trip.title,
      description: trip.description,
    } as Trip;

    return NextResponse.json(responseTrip, {
      status: 200,
      statusText: "Viagem encontrada com sucesso!",
    });
  } catch (error) {
    console.error("Erro ao se registrar:", error);
    return NextResponse.json({ error: "Erro no servidor" }, { status: 500 });
  }
}
