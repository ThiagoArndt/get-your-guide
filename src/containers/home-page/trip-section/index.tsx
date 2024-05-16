import React from "react";
import jsonData from "@libs/utils/dummy_data.json";
import Image from "next/image";
import { getInfoDateFormatter } from "@libs/utils/dateFormatter";
import TripCard from "@components/TripCard";

function TripSection() {
  return (
    <div className="flex flex-col pt-32 gap-9">
      <h1 className="text-blackApp font-extrabold text-7xl">Acomodações</h1>
      <div className="grid grid-cols-4 gap-6 w-full">
        {jsonData.map((item, index) => (
          <TripCard
            key={index}
            check_in_date={item["check-in-date"]}
            check_out_date={item["check-out-date"]}
            destination={item.destination}
            distance={item.distance}
            image={item.image}
            max_people={item["max-people"]}
            price={item.price}
          />
        ))}
      </div>
    </div>
  );
}

export default TripSection;
