"use client";
import React, { useState } from "react";
import Image from "next/image";
import avatar from "../../../../public/avatar.webp";
import { Calendar } from "lucide-react";
import Button from "@components/Button";
function ContentSection() {
  const [isShowMore, setIsShowMore] = useState<boolean>(false);

  const handleShowMore = () => {
    setIsShowMore(!isShowMore);
  };
  return (
    <div className="flex flex-col w-full gap-10">
      <div className="flex flex-col gap-4">
        <h1 className="font-bold text-4xl">Lorem ipsum sili dolor</h1>
        <div className="flex flex-row gap-3 items-center">
          <div className="relative w-[60px] aspect-square ">
            <Image src={avatar} className="rounded-full" layout="fill" objectFit="cover" alt="" />
          </div>
          <h1 className="text-greyApp text-2xl">Lorem ipsum sili dolor</h1>
        </div>
        <h1 className="text-blackApp text-4xl font-bold">$200 / diária</h1>
      </div>
      <div className="flex flex-row items-center cursor-pointer">
        <div className="flex items-center justify-start w-[350px] mr-[150px] h-11 bg-white px-8 py-8  border-2 border-greyApp hover:bg-lightGreyApp rounded-full">
          <h1 className="font-semibold text-xl">Checar disponibilidade</h1>
        </div>
        <div className="flex items-center justify-center rounded-full relative right-[220px]  w-[70px] aspect-square bg-black">
          <Calendar className="text-white" />
        </div>
      </div>
      <div className="mr-[150px] flex flex-col gap-6 items-start">
        <h1 className={`${isShowMore ? "line-clamp-none" : "line-clamp-6"} text-lg`}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque id arcu vitae neque
          interdum suscipit. Suspendisse nisl turpis, vulputate vel mi nec, blandit pharetra leo.
          Mauris vulputate bibendum erat. Fusce tempus justo sed varius cursus. Nulla elit metus,
          finibus at facilisis ac, hendrerit at diam. Mauris dapibus tempus malesuada. Proin id
          velit ac velit volutpat pharetra a pharetra elit. In hac habitasse platea dictumst.
          Curabitur sagittis vel orci ac rutrum. Donec luctus ante iaculis, posuere felis eu, fri
        </h1>
        <button onClick={handleShowMore} className="font-bold underline text-lg cursor-pointer">
          {isShowMore ? "Mostrar menos" : "Mostrar mais"}
        </button>
      </div>
      <Button className="py-4 text-[16pt]" backgroundColor="black" text="Check-out" />

      <div className="w-full bg-greyApp h-[1px] rounded-full"></div>
    </div>
  );
}

export default ContentSection;
