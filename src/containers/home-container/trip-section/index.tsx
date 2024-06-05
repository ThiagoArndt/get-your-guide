"use client";
import React, { useEffect, useState } from "react";
import jsonData from "@libs/utils/dummy_data.json";
import TripCard from "@components/TripCard";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import { getImageFromBuffer } from "@services/imageHelper";

function TripSection() {
  const router = useRouter();
  const [trips, setTrips] = useState<CardTrip[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const handleRouting = (id: string) => {
    router.push(`/trips/${id}`); // Replace '/target-page' with your target route
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/get-trips");
        console.log(res.data);
        setTrips(res.data);
      } catch (e) {
        if (axios.isAxiosError(e)) {
          toast.error(e.response?.statusText ?? "Erro desconhecido");
        } else {
          toast.error("Erro ao resgatar viagens");
        }
      }
      setIsLoading(false);
    };

    fetchData();
  }, []);
  if (isLoading) {
    return <p>Carregando...</p>;
  }
  return (
    <div className="z-10 flex flex-col pt-32 gap-9">
      <h1 className="text-blackApp font-extrabold text-7xl">Acomodações</h1>
      <div className="grid grid-cols-4 gap-6 w-full">
        {trips.length === 0 ? (
          <p>Nenhuma viagem encontrada</p>
        ) : (
          trips.map((item, index) => (
            <button
              className="flex justify-start items-start"
              onClick={() => handleRouting(item.id ?? "")}
              key={item.id}
            >
              <TripCard
                id={item.id ?? ""}
                createdBy={item.created_by ?? ""}
                checkInDate={item.checkInDate?.toString()}
                checkOutDate={item.checkOutDate?.toString()}
                destination={item.destination}
                image={getImageFromBuffer(item.image)}
                maxPeople={item.maxPeople}
                price={item.price}
                userLikes={item.userLikes}
              />
            </button>
          ))
        )}
      </div>
    </div>
  );
}

export default TripSection;
