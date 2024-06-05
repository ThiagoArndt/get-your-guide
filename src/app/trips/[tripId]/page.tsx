import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { notFound } from "next/navigation";
import dummyData from "@libs/utils/dummy_data.json";
import ImagesSection from "@containers/selected-trip-container/images-section";
import ContentSection from "@containers/selected-trip-container/content-section";
import CommentsSection from "@containers/selected-trip-container/comments-section";
import axios from "axios";

async function TripId({ params }: Readonly<{ params: Params }>) {
  const data: Trip | undefined = await getData({ params });

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-row w-full justify-between gap-40">
      <div className="flex flex-col gap-10 w-[600px]">
        <ContentSection
          title={data.title}
          created_by={data.created_by}
          description={data.description}
          location={data.destination}
          price={data.price}
          checkIn={data.checkInDate!}
          checkOut={data.checkOutDate!}
        />
        <CommentsSection tripId={params.tripId} comments={data.comments} />
      </div>
      <ImagesSection images={data.images} />
    </div>
  );
}

const getData = async ({ params }: Readonly<{ params: Params }>) => {
  const tripId = params.tripId;
  try {
    const trip = await axios.get(
      `http://localhost:3000/api/get-selected-trip/${tripId}`
    );

    return trip.data;
  } catch (e) {
    notFound();
  }

  // const trip = dummyData.find((trip) => trip.id === tripId);
  // if (!trip) {
  //   notFound();
  // }
};

export default TripId;
