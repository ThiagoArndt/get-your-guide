"use client";
import React from "react";
import Image from "next/image";
import { getInfoDateFormatter } from "@services/dateFormatter";
import { Heart, Pen } from "lucide-react";
import { useSession } from "next-auth/react";
import { RolesEnum } from "@entities/interfaces";
interface TripCardProps {
  createdBy: string;
  image: string;
  destination: string;
  checkInDate?: string;
  checkOutDate?: string;
  price?: number;
  maxPeople?: number;
}

function TripCard(props: Readonly<TripCardProps>) {
  const { data: session } = useSession();
  const user = session?.user;

  const {
    createdBy,
    checkInDate,
    checkOutDate,
    destination,
    image,
    maxPeople,
    price,
  } = props;

  return (
    <div className="p-4 w-full  flex flex-col gap-2 rounded-3xl py-10 px-5 cursor-pointer hover:bg-blackApp hover:bg-opacity-5">
      <div className="relative w-full h-[300px]">
        {user?.role === RolesEnum.USER ? (
          <Heart
            onClick={(e) => {
              e.stopPropagation();
              return false;
            }}
            className="absolute right-4 top-3 z-20 text-white hover:fill-red-600"
          />
        ) : null}
        {user?.id == createdBy ? (
          <Pen
            onClick={(e) => {
              e.stopPropagation();
              return false;
            }}
            className="absolute right-4 top-3 z-20 text-white hover:fill-red-600"
          />
        ) : null}
        <Image
          layout="fill"
          objectFit="cover"
          className="rounded-3xl"
          src={image}
          alt=""
        />
      </div>

      <div className="flex flex-row justify-between">
        <p className="font-extrabold text-2xl">{destination}</p>
      </div>
      <div className="flex items-start flex-col">
        {checkInDate != null && checkOutDate != null ? (
          <p className="text-greyApp font-light text-lg">
            {getInfoDateFormatter(
              new Date(checkInDate),
              new Date(checkOutDate)
            )}
          </p>
        ) : null}
        {maxPeople != null ? (
          <p className="text-greyApp font-light text-lg">
            {maxPeople.toString()} Pessoas
          </p>
        ) : null}
        {price != null ? (
          <p className="text-black text-lg">
            <span className="font-extrabold text-2xl">
              R${price.toString()}
            </span>{" "}
            noite
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default TripCard;
