"use client";
import ContentSection from "@containers/search-container/content-section";
import FilterSection from "@containers/search-container/filter-section";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";

function Content() {
  const searchParams = useSearchParams();

  let destinationSearch = searchParams?.get("address");
  let checkInDateSearch = searchParams?.get("checkIn");
  let checkOutDateSearch = searchParams?.get("checkOut");
  let maxPeopleSearch = searchParams?.get("people");

  let destination = destinationSearch ?? "";
  let checkInDate =
    checkInDateSearch != undefined ? new Date(checkInDateSearch) : undefined;
  let checkOutDate =
    checkOutDateSearch != undefined ? new Date(checkOutDateSearch) : undefined;
  let maxPeople =
    maxPeopleSearch != undefined ? parseInt(maxPeopleSearch) : undefined;

  const [trips, setTrips] = useState<CardTrip[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/api/get-trips");

        setTrips(res.data);
      } catch (e) {
        if (axios.isAxiosError(e)) {
          toast.error(e.response?.statusText ?? "Erro desconhecido");
        } else {
          toast.error("Erro ao resgatar viagens");
        }
      }
    };
    fetchData();
    setIsLoading(false);
  }, []);
  if (isLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <div>
      <FilterSection
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        destination={destination}
        maxPeople={maxPeople}
        setTrips={setTrips}
      />
      <ContentSection
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        destination={destination}
        maxPeople={maxPeople}
        trips={trips}
      />
    </div>
  );
}

function Trips() {
  return (
    <Suspense fallback={<p>Carregando...</p>}>
      <Content></Content>
    </Suspense>
  );
}

export default Trips;
