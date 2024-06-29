"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getInfoDateFormatter } from "@services/dateFormatter";
import { Heart, Pen } from "lucide-react";
import { useSession } from "next-auth/react";
import { RolesEnum } from "@entities/interfaces";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
interface TripCardProps {
  id: string;
  createdBy: string;
  image: string;
  destination: string;
  checkInDate?: string;
  checkOutDate?: string;
  price?: number;
  maxPeople?: number;
  userLikes: string[];
}

function TripCard(props: Readonly<TripCardProps>) {
  const {
    id,
    createdBy,
    checkInDate,
    checkOutDate,
    destination,
    image,
    maxPeople,
    price,
    userLikes,
  } = props;

  const { data: session } = useSession();
  const router = useRouter();
  const user = session?.user;

  const [isLiked, setIsLiked] = useState<boolean>(false);

  const handleLike = async () => {
    try {
      await axios.post("/api/add-like", { userId: user?.id, tripId: id });
      toast.success("Post curtido com sucesso!");
      setIsLiked(true);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        toast.error(e.response?.statusText ?? "Erro ao dar like");
      }
    }
  };

  const handleDislike = async () => {
    try {
      await axios.post("/api/remove-like", { userId: user?.id, tripId: id });
      toast.success("Post descurtido com sucesso!");
      setIsLiked(false);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        toast.error(e.response?.statusText ?? "Erro ao dar like");
      }
    }
  };

  useEffect(() => {
    if (user) {
      if (userLikes.includes(user.id)) {
        setIsLiked(true);
      }
    }
  }, []);

  return (
    <div className="p-4 w-full  flex flex-col gap-2 rounded-3xl py-10 px-5 cursor-pointer hover:bg-blackApp hover:bg-opacity-5">
      <div className="relative w-full h-[300px]">
        {user?.role === RolesEnum.USER ? (
          <Heart
            onClick={(e) => {
              if (isLiked) {
                handleDislike();
              } else {
                handleLike();
              }
              e.stopPropagation();
              return false;
            }}
            className={`absolute right-4 top-3 z-20 ${
              !isLiked
                ? "text-white hover:fill-red-600"
                : "text-red-600 fill-red-600 hover:fill-transparent"
            }`}
          />
        ) : null}
        {user?.id == createdBy ? (
          <Pen
            onClick={(e) => {
              e.stopPropagation();
              router.push(`/edit-trip/${id}`);
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

      <div className="flex flex-row">
        <p className="font-extrabold text-2xl text-start">{destination}</p>
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
