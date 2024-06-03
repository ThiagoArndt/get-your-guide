"use client";
import React from "react";
import jsonData from "@libs/utils/dummy_data.json";
import TripCard from "@components/TripCard";
import { useRouter } from "next/navigation";

function TripSection() {
  const router = useRouter();
  const handleRouting = (id: number) => {
    router.push(`/trips/${id}`); // Replace '/target-page' with your target route
  };

  return (
    <div className="z-10 flex flex-col pt-32 gap-9">
      <h1 className="text-blackApp font-extrabold text-7xl">Acomodações</h1>
      <div className="grid grid-cols-4 gap-6 w-full">
        {jsonData.map((item, index) => (
          <button
            className="flex justify-start items-start"
            onClick={() => handleRouting(item.id)}
            key={item.id}
          >
            <TripCard
              createdBy={item.createdBy}
              checkInDate={item.checkInDate}
              checkOutDate={item.checkOutDate}
              destination={item.destination}
              image={item.image}
              maxPeople={item.maxPeople}
              price={item.price}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default TripSection;
