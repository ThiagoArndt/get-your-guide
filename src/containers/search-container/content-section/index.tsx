import React, { useEffect, useState } from "react";
import jsonData from "@libs/utils/dummy_data.json";
import TripCard from "@components/TripCard";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { getImageFromBuffer } from "@services/imageHelper";

interface ContentSectionProps {
  destination?: string;
  checkInDate?: Date;
  checkOutDate?: Date;
  maxPeople?: number;
  trips: CardTrip[];
}

function ContentSection(props: ContentSectionProps) {
  const { checkInDate, checkOutDate, destination, maxPeople, trips } = props;
  const router = useRouter();

  const handleRouting = (id: string) => {
    router.push(`/trips/${id}`); // Replace '/target-page' with your target route
  };

  return (
    <div className="flex flex-col pt-10 gap-9">
      <div className="grid grid-cols-4 gap-6 w-full">
        {trips.map((item, index) => (
          <button
            className="flex justify-start items-start"
            onClick={() => handleRouting(item.id!)}
            key={item.id}
          >
            <TripCard
              id={item.id!}
              createdBy={item.created_by}
              userLikes={item.userLikes}
              checkInDate={item.checkInDate?.toString()}
              checkOutDate={item.checkOutDate?.toString()}
              destination={item.destination}
              image={getImageFromBuffer(item.image)}
              maxPeople={item.maxPeople}
              price={item.price}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default ContentSection;
