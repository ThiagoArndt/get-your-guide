"use client";
import TripCard from "@components/TripCard";
import { getCurrentUser } from "@libs/session";
import { getImageFromBuffer } from "@services/imageHelper";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
interface ProfileTripsContentInterface {
  trips: ProfileTripInterface[];
}

const dummyData = [1, 2, 3, 4, 5, 6];

function ProfileTripsContent(props: ProfileTripsContentInterface) {
  const { trips } = props;
  const { data: session, status } = useSession();

  const router = useRouter();

  const handleRouting = (id: string) => {
    router.push(`/trips/${id}`); // Replace '/target-page' with your target route
  };

  return (
    <div>
      <div className="grid grid-cols-4 gap-6 w-full">
        {trips.map((item, index) => (
          <button
            onClick={() => handleRouting(item.id)}
            className="flex justify-start items-start"
            key={"1"}
          >
            <TripCard
              id={item.id}
              createdBy={item.created_by}
              destination={item.destination}
              image={getImageFromBuffer(item.image)}
              userLikes={item.userLikes}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProfileTripsContent;
