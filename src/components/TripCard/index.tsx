"use client";
import React from "react";
import Image from "next/image";
import { getInfoDateFormatter } from "@libs/utils/dateFormatter";

interface TripCardProps {
  image: string;
  destination: string;
  distance: number;
  checkInDate: string;
  checkOutDate: string;
  price: number;
  maxPeople: number;
}

function TripCard(props: Readonly<TripCardProps>) {
  const { checkInDate, checkOutDate, destination, distance, image, maxPeople, price } = props;

  return (
    <div className="p-4 w-full  flex flex-col gap-2 rounded-3xl py-10 px-5 cursor-pointer hover:bg-blackApp hover:bg-opacity-5">
      <div className="relative w-full h-[300px]">
        <Image layout="fill" objectFit="cover" className="rounded-3xl " src={image} alt="" />
      </div>

      <div className="flex flex-row justify-between">
        <p className="font-extrabold text-2xl">{destination}</p>
        <p className="font-bold text-greenApp text-2xl">Destaque</p>
      </div>
      <div className="flex items-start flex-col">
        <p className="text-greyApp font-light text-lg">{distance}km de distância</p>
        <p className="text-greyApp font-light text-lg">
          {getInfoDateFormatter(new Date(checkInDate), new Date(checkOutDate))}
        </p>
        <p className="text-greyApp font-light text-lg">{maxPeople.toString()} Pessoas</p>
        <p className="text-black text-lg">
          <span className="font-extrabold text-2xl">R${price.toString()}</span> noite
        </p>
      </div>
    </div>
  );
}

export default TripCard;
