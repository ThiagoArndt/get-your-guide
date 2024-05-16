"use client";

import SelectTripInfo from "@components/TripSelectCard";
import React, { useState } from "react";
import Image from "next/image";
function HeroSection() {
  const [postAddress, setPostAddress] = useState("");
  const [checkIn, setCheckIn] = useState<Date | undefined>(undefined);
  const [checkOut, setCheckOut] = useState<Date | undefined>(undefined);
  const [people, setPeople] = useState<number>(0);

  return (
    <div className="flex h-svh relative px-20 pt-32 pb-16">
      <div className="z-10 text-white flex flex-col justify-between w-full">
        <div>
          <div className="font-extrabold text-8xl flex flex-col gap-2">
            <h1>Prepare-se para</h1>
            <h1>sua melhor viagem!</h1>
          </div>
          <p className="font-light text-3xl text-white w-[50%]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Leo bibendum, in pretium lectus
            laoreet.
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
