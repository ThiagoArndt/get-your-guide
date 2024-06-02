"use client";
import TripCard from "@components/TripCard";
import { getCurrentUser } from "@libs/session";
import { getImageFromBuffer } from "@services/imageHelper";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";

interface ProfileTripsContentInterface {
  trips: ProfileTripInterface[];
}

const dummyData = [1, 2, 3, 4, 5, 6];

function ProfileTripsContent(props: ProfileTripsContentInterface) {
  const { trips } = props;
  const { data: session, status } = useSession();

  return (
    <div>
      <div className="grid grid-cols-4 gap-6 w-full">
        {trips.map((item, index) => (
          <button
            className="flex justify-start items-start"
            onClick={() => {}}
            key={"1"}
          >
            <TripCard
              createdBy={item.created_by}
              destination={"Teste"}
              image={"/cool-image1.jpg"}
            />
          </button>
        ))}
      </div>
    </div>
  );
}

export default ProfileTripsContent;
