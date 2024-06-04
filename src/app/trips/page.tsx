"use client";
import ContentSection from "@containers/search-container/content-section";
import FilterSection from "@containers/search-container/filter-section";
import { useSearchParams } from "next/navigation";

function Trips() {
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

  return (
    <div>
      <FilterSection
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        destination={destination}
        maxPeople={maxPeople}
      />
      <ContentSection
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        destination={destination}
        maxPeople={maxPeople}
      />
    </div>
  );
}

export default Trips;
