import { Params } from "next/dist/shared/lib/router/utils/route-matcher";
import { notFound } from "next/navigation";
import Image from "next/image";
import dummyData from "@libs/utils/dummy_data.json";
import coolImage1 from "../../../public/cool-image1.jpg";
async function Page({ params }: Readonly<{ params: Params }>) {
  const data: Trip | undefined = await getData({ params });

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-row">
      <div className="flex flex-col w-[800px] bg-black">
        <h1>oioi</h1>
      </div>
      <div className="w-full">
        <div className="relative w-full h-[300px]">
          <Image layout="fill" objectFit="cover" src={coolImage1} alt="" />
        </div>
      </div>
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

export default Page;
