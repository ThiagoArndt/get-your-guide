import { NextApiRequest, NextApiResponse } from "next/types";
import { db as prisma } from "@db/client";
import { TripInterface } from "@entities/interfaces";
import { getCurrentUser } from "@libs/session";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const {
    tripId,
    created_by,
    date_final,
    date_initial,
    description,
    images,
    location,
    price,
    title,
  } = await req.json();

  const user = await getCurrentUser();
  if (user == null) {
    return NextResponse.json(
      {},
      { status: 401, statusText: "Usuário não autenticado" }
    );
  }

  let imagesBuffer = [];
  for (var i in images) {
    let bufferItem = Buffer.from(images[i], "base64");
    imagesBuffer.push(bufferItem);
  }

  try {
    const tripData = await prisma.trips.updateMany({
      data: {
        created_by: created_by,
        date_final: date_final,
        date_initial: date_initial,
        description: description,
        location: location,
        price: price,
        title: title,
        images: imagesBuffer,
      },
      where: { id: tripId },
    });
    return NextResponse.json(tripData, {
      status: 200,
      statusText: "Viagem atualizada com sucesso!",
    });
  } catch (error) {
    console.error("Erro ao atualizar viagem", error);
    return NextResponse.json({ error: "Erro no servidor" }, { status: 500 });
  }
}
