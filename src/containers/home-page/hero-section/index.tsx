import SelectTripInfo from "@components/SelectTripInfo";
import React from "react";
import Image from "next/image";
function HeroSection() {
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
        <SelectTripInfo />
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
