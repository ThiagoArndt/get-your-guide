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

    //Remove userId from userLikes in trip table
    const userLikesTrip = await prisma.trips.findFirst({
      select: { user_likes: true },
      where: { id: tripId },
    });

    let newUserLikes = userLikesTrip?.user_likes;
    const index = newUserLikes!.indexOf(userId);
    if (index > -1) {
      newUserLikes!.splice(index, 1);
    }
    const tripData = await prisma.trips.update({
      data: {
        user_likes: newUserLikes,
      },
      where: { id: tripId },
    });

    //Remove likedItems tripid from users

    const userLikesItems = await prisma.users.findFirst({
      select: { liked_items: true },
      where: { id: userId },
    });
    let newUserLikesItems = userLikesItems?.liked_items;
    const indexUsr = newUserLikesItems!.indexOf(tripId);
    if (indexUsr > -1) {
      newUserLikesItems!.splice(indexUsr, 1);
    }

    const userData = await prisma.users.update({
      where: { id: user.id },
      data: {
        email: undefined,
        password: undefined,
        profile_image: undefined,
        username: undefined,
        liked_items: newUserLikesItems,
      },
    });

    return NextResponse.json(
      { trip: tripData, user: userData },
      {
        status: 200,
        statusText: "Viagem criada com sucesso!",
      }
    );
  } catch (error) {
    console.error("Erro ao criar viagem", error);
    return NextResponse.json(
      {},
      { status: 401, statusText: "Erro ao criar viagem!" }
    );
  }
}
