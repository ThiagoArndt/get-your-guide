import { NextApiRequest, NextApiResponse } from "next/types";
import { db as prisma } from "@db/client";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  {
    params,
  }: {
    params?: {
      destination?: string;
      checkInDate?: Date;
      checkOutDate?: Date;
      maxPeople?: number;
    };
  }
) {
  try {
    const tripsData = await prisma.trips.findMany({
      select: {
        id: true,
        date_initial: true,
        date_final: true,
        images: true,
        location: true,
        number_people: true,
        price: true,
        created_by: true,
        user_likes: true,
      },
    });

    // Apply filters
    let filteredTrips = tripsData;
    if (params) {
      const { checkInDate, checkOutDate, destination, maxPeople } = params;
      if (destination) {
        filteredTrips = filteredTrips.filter((trip) =>
          trip.location
            .toLocaleLowerCase()
            .trim()
            .includes(destination.toLocaleLowerCase().trim())
        );
      }

      if (checkInDate) {
        const checkIn = new Date(checkInDate);
        filteredTrips = filteredTrips.filter(
          (trip) => new Date(trip.date_initial) >= checkIn
        );
      }

      if (checkOutDate) {
        const checkOut = new Date(checkOutDate);
        filteredTrips = filteredTrips.filter(
          (trip) => new Date(trip.date_final) <= checkOut
        );
      }

      if (maxPeople) {
        filteredTrips = filteredTrips.filter(
          (trip) => trip.number_people <= maxPeople
        );
      }
    }

    const newData = filteredTrips.map((item) => ({
      id: item.id,
      checkInDate: item.date_initial,
      checkOutDate: item.date_final,
      destination: item.location,
      maxPeople: item.number_people,
      price: item.price,
      image: item.images[0],
      created_by: item.created_by,
      userLikes: item.user_likes,
    }));

    return NextResponse.json(newData, {
      status: 200,
      statusText: "Viagens resgatadas com sucesso!",
    });
  } catch (error) {
    console.error("Erro ao resgatar viagens", error);
    return NextResponse.json(
      { error: "Erro ao resgatar viagens" },
      { status: 401 }
    );
  }
}
