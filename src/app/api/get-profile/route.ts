import { NextResponse } from "next/server";
import { db as prisma } from "@db/client";

export async function POST(req: Request) {
  const { id } = await req.json();

  try {
    let data;
    let trips;
    data = await prisma.agents.findFirst({ where: { id: id } });

    if (data == null) {
      data = await prisma.users.findFirst({ where: { id: id } });
      if (data == null) {
        return NextResponse.json(
          {},
          {
            status: 401,
            statusText: "Usuário inexistente",
          }
        );
      }

      trips = await prisma.trips.findMany({
        where: { id: { in: data.liked_items } },
      });
    } else {
      trips = await prisma.trips.findMany({
        where: { id: { in: data.created_trips } },
      });
    }

    let transformedTrips: ProfileTripInterface[] = trips.map((item) => ({
      id: item.id,
      created_by: item.created_by,
      image: item.images[0],
      destination: item.location,
      userLikes: item.user_likes,
    }));

    let newData = {
      id: data?.id,
      username: data?.username,
      profile_image: data.profile_image,
      trips: transformedTrips,
    } as ProfileInterface;

    return NextResponse.json(newData, {
      status: 200,
    });
  } catch (e) {
    return NextResponse.json(
      {},
      {
        status: 401,
        statusText: "Erro interno no servidor",
      }
    );
  }
}
