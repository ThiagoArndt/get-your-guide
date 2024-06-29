import SelectTripInfo from "@components/SelectTripInfo";
import { dateFormatter, stringToDate } from "@services/dateFormatter";
import axios from "axios";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import toast from "react-hot-toast";

interface FilterSectionProps {
  destination: string | null;
  checkInDate?: string | null;
  checkOutDate?: string | null;
  maxPeople?: number | null;
  setTrips: Dispatch<SetStateAction<CardTrip[]>>;
}

function FilterSection(props: Readonly<FilterSectionProps>) {
  const { checkInDate, checkOutDate, destination, maxPeople, setTrips } = props;

  const [postAddress, setPostAddress] = useState<string | undefined>(
    destination ?? ""
  );
  const [checkIn, setCheckIn] = useState<Date | undefined>(
    checkInDate != null ? stringToDate(checkInDate) : undefined
  );
  const [checkOut, setCheckOut] = useState<Date | undefined>(
    checkOutDate != null ? stringToDate(checkOutDate) : undefined
  );
  const [people, setPeople] = useState<number | undefined>(maxPeople ?? 0);

  console.log(checkInDate);

  const handleSearch = async () => {
    try {
      let tratedPostAddress = postAddress == "" ? null : postAddress;
      let treatedCheckIn = checkIn == undefined ? null : checkIn;
      let treatedCheckOut = checkOut == undefined ? null : checkOut;
      let tretatedPeople = people == 0 ? null : people;
      const res = await axios.get("/api/get-trips", {
        params: {
          destination: tratedPostAddress,
          checkInDate: treatedCheckIn,
          checkOutDate: treatedCheckOut,
          maxPeople: tretatedPeople,
        },
      });

      setTrips(res.data);
    } catch (e) {
      if (axios.isAxiosError(e)) {
        toast.error(e.response?.statusText ?? "Erro desconhecido");
      } else {
        toast.error("Erro ao resgatar viagens");
      }
    }
  };

  return (
    <div>
      {" "}
      <SelectTripInfo
        checkIn={checkIn}
        checkOut={checkOut}
        people={people}
        postAddress={postAddress}
        setCheckIn={setCheckIn}
        setCheckOut={setCheckOut}
        setPeople={setPeople}
        setPostAddress={setPostAddress}
        handleSearch={handleSearch}
      />
    </div>
  );
}

export default FilterSection;
