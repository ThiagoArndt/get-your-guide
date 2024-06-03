import { NextApiRequest, NextApiResponse } from "next/types";
import { db as prisma } from "@db/client";
import { TripInterface } from "@entities/interfaces";
import { validateUser } from "@services/sessionHelper";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@libs/session";

export async function POST(req: Request) {
  const {
    date_final,
    date_initial,
    description,
    images,
    location,
    price,
    title,
    number_people,
  } = (await req.json()) as TripInterface;

  try {
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

    const tripData = await prisma.trips.create({
      data: {
        created_by: user.id,
        date_final: date_final,
        date_initial: date_initial,
        description: description,
        location: location,
        price: price,
        title: title,
        images: imagesBuffer,
        comments: [],
        number_people: number_people,
      },
    });
    if (tripData) {
      const res = await prisma.agents.findMany({
        where: { id: user.id },
        select: {
          created_trips: true,
        },
      });

      await prisma.agents.updateMany({
        where: { id: user.id },
        data: { created_trips: [...res[0].created_trips, tripData.id] },
      });
    }
    return NextResponse.json(tripData, {
      status: 200,
      statusText: "Viagem criada com sucesso!",
    });
  } catch (error) {
    console.error("Erro ao criar viagem", error);
    return NextResponse.json(
      {},
      { status: 401, statusText: "Erro ao criar viagem!" }
    );
  }
}
