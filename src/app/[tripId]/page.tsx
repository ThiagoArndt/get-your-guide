import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { notFound } from "next/navigation";

const dummyData: Trip[] = [
  {
    id: 1,
    image: "/placeholder-image.jpg",
    destination: "Urubici, Brasil",
    distance: 300,
    checkInDate: "2024-05-12T12:00:00",
    checkOutDate: "2024-10-15T12:00:00",
    price: 320,
    maxPeople: 4,
  },
  {
    id: 2,
    image: "/placeholder-image.jpg",
    destination: "Urubici, Brasil",
    distance: 300,
    checkInDate: "2024-05-12T12:00:00",
    checkOutDate: "2024-10-15T12:00:00",
    price: 320,
    maxPeople: 4,
  },
  // Add more data objects as needed
];

async function Page({ params }: Readonly<{ params: Params }>) {
  const data: Trip | undefined = await getData({ params });

  if (!data) {
    return <div>Loading...</div>;
  }

  return <p>{data.destination}</p>;
}

const getData = async ({ params }: Readonly<{ params: Params }>) => {
  const tripId = parseInt(params.tripId);
  const trip = dummyData.find((trip) => trip.id === tripId);
  if (!trip) {
    notFound();
  }
  return trip;
};

export default Page;
