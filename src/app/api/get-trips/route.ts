import { NextApiRequest, NextApiResponse } from "next/types";
import { db as prisma } from "@db/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const destination = req.nextUrl.searchParams.get("destination");
  const checkInDate = req.nextUrl.searchParams.get("checkInDate");
  const checkOutDate = req.nextUrl.searchParams.get("checkOutDate");
  const maxPeople = req.nextUrl.searchParams.get("maxPeople");

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

    if (destination) {
      filteredTrips = filteredTrips.filter((trip) =>
        trip.location
          .toLocaleLowerCase()
          .trim()
          .includes(destination.toLocaleLowerCase().trim())
      );
    }

    if (checkInDate || checkOutDate) {
      const checkIn = checkInDate ? new Date(checkInDate) : null;
      const checkOut = checkOutDate ? new Date(checkOutDate) : null;

      filteredTrips = filteredTrips.filter((trip) => {
        const tripStart = new Date(trip.date_initial);
        const tripEnd = new Date(trip.date_final);

        if (checkIn && checkOut) {
          return tripStart <= checkIn && tripEnd >= checkOut;
        } else if (checkIn) {
          return tripStart <= checkIn && checkIn <= tripEnd;
        } else if (checkOut) {
          return tripStart <= checkOut && checkOut <= tripEnd;
        }
        return true;
      });
    }

    if (maxPeople) {
      filteredTrips = filteredTrips.filter(
        (trip) => trip.number_people >= parseInt(maxPeople)
      );
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
