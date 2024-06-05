import { NextApiRequest, NextApiResponse } from "next/types";
import { db as prisma } from "@db/client";
import { RolesEnum, TripInterface } from "@entities/interfaces";
import { validateUser } from "@services/sessionHelper";
import { NextResponse } from "next/server";
import { getCurrentUser } from "@libs/session";

export async function POST(req: Request) {
  const { userId, tripId } = await req.json();

  try {
    const user = await getCurrentUser();
    if (user == null) {
      return NextResponse.json(
        {},
        { status: 401, statusText: "Usuário não autenticado" }
      );
    }
    if (user.role != RolesEnum.USER) {
      return NextResponse.json(
        {},
        {
          status: 401,
          statusText: "Este tipo de usuário não pode realizar esta operação",
        }
      );
    }

    const tripData = await prisma.trips.update({
      data: {
        created_by: undefined,
        date_final: undefined,
        date_initial: undefined,
        description: undefined,
        location: undefined,
        price: undefined,
        title: undefined,
        images: undefined,
        comments: undefined,
        number_people: undefined,
        user_likes: { push: userId },
      },
      where: { id: tripId },
    });

    await prisma.users.update({
      where: { id: user.id },
      data: {
        email: undefined,
        password: undefined,
        profile_image: undefined,
        username: undefined,
        liked_items: { push: tripId },
      },
    });

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
