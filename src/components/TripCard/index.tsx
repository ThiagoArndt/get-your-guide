"use client";
import React from "react";
import Image from "next/image";
import { getInfoDateFormatter } from "@libs/utils/dateFormatter";

interface TripCardProps {
  image: string;
  destination: string;
  distance: number;
  check_in_date: string;
  check_out_date: string;
  price: number;
  max_people: number;
}

function TripCard(props: TripCardProps) {
  const { check_in_date, check_out_date, destination, distance, image, max_people, price } = props;
  return (
    <div className="p-4 w-full flex flex-col gap-2 rounded-3xl py-10 px-5 cursor-pointer hover:bg-blackApp hover:bg-opacity-5">
      <div className="relative w-full h-[300px]">
        <Image layout="fill" objectFit="cover" className="rounded-3xl " src={image} alt="" />
      </div>

      <div className="flex flex-row justify-between">
        <p className="font-extrabold text-2xl">{destination}</p>
        <p className="font-bold text-greenApp text-2xl">Destaque</p>
      </div>
      <p className="text-greyApp font-light text-lg">{distance}km de distância</p>
      <p className="text-greyApp font-light text-lg">
        {getInfoDateFormatter(new Date(check_in_date), new Date(check_out_date))}
      </p>
      <p className="text-greyApp font-light text-lg">{max_people.toString()} Pessoas</p>
      <p className="text-black text-lg">
        <span className="font-extrabold text-2xl">R${price.toString()}</span> noite
      </p>
    </div>
  );
}

export default TripCard;
