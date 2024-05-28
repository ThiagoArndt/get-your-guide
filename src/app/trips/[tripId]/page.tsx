import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { notFound } from "next/navigation";
import dummyData from "@libs/utils/dummy_data.json";
import ImagesSection from "@containers/selected-trip-container/images-section";
import ContentSection from "@containers/selected-trip-container/content-section";
import CommentsSection from "@containers/selected-trip-container/comments-section";

async function TripId({ params }: Readonly<{ params: Params }>) {
  const data: Trip | undefined = await getData({ params });

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-row w-full justify-between gap-40">
      <div className="flex flex-col gap-10 w-[600px]">
        <ContentSection />
        <CommentsSection />
      </div>
      <ImagesSection />
    </div>
  );
}

const getData = async ({ params }: Readonly<{ params: Params }>) => {
  const tripId = parseInt(params.tripId);
  const trip = dummyData.find((trip) => trip.id === tripId);
  if (!trip) {
    notFound();
  }
  return trip;
};

export default TripId;
