"use client";

import SelectTripInfo from "@components/SelectTripInfo";
import React, { useState } from "react";
import Image from "next/image";
import { dateFormatter } from "@services/dateFormatter";
import { useRouter } from "next/navigation";
function HeroSection() {
  const router = useRouter();

  const [postAddress, setPostAddress] = useState<string | undefined>("");
  const [checkIn, setCheckIn] = useState<Date | undefined>(undefined);
  const [checkOut, setCheckOut] = useState<Date | undefined>(undefined);
  const [people, setPeople] = useState<number | undefined>(0);

  const handleSearch = () => {
    const query = new URLSearchParams();
    if (postAddress) query.append("address", postAddress);
    if (checkIn) query.append("checkIn", dateFormatter(checkIn));
    if (checkOut) query.append("checkOut", dateFormatter(checkOut));
    if (people) query.append("people", people.toString());

    router.push(`/trips?${query.toString()}`);
  };

  return (
    <div className="flex h-svh relative px-20 pt-32 pb-16">
      <div className="z-10 text-white flex flex-col justify-between w-full">
        <div>
          <div className="font-extrabold text-8xl flex flex-col gap-2">
            <h1>Prepare-se para</h1>
            <h1>sua melhor viagem!</h1>
          </div>
          <p className="font-light text-3xl text-white w-[50%]">
            Venha descobir lugares incríveis para você e sua família viajarem
            neste infinito universo de possibilidades.
          </p>
        </div>
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

      <Image
        src="/hero-image.jpg"
        alt=""
        layout="fill"
        objectFit="cover"
        className="rounded-[60px] brightness-75"
      />
    </div>
  );
}

export default HeroSection;
