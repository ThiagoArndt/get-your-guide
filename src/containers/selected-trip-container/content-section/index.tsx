"use client";
import React, { useState } from "react";
import Image from "next/image";
import avatar from "../../../../public/avatar.webp";
import { Calendar } from "lucide-react";
import Button from "@components/Button";
import { getImageFromBuffer } from "@services/imageHelper";
import * as Popover from "@radix-ui/react-popover";
import { Calendar as CalendarTrip } from "@components/Calendar";
import toast from "react-hot-toast";
interface ContentSectionInterface {
  title: string;
  location: string;
  created_by: {
    id: string;
    username: string;
    profile_image: Buffer;
    email: string;
  };
  description: string;
  price: number;
  checkIn: Date;
  checkOut: Date;
}

function ContentSection(props: ContentSectionInterface) {
  const { created_by, description, location, price, title, checkIn, checkOut } =
    props;
  const [isShowMore, setIsShowMore] = useState<boolean>(false);

  const handleShowMore = () => {
    setIsShowMore(!isShowMore);
  };

  const handleCheckOut = async () => {
    await copyToClipboard(created_by.email);

    toast.success(`Contato copiado com sucesso!`, {
      duration: 3500,
    });
  };
  return (
    <div className="flex flex-col w-full gap-10">
      <div className="flex flex-col gap-4">
        <h1 className="font-bold text-4xl">{title}</h1>
        <div className="flex flex-row gap-3 items-center">
          <div className="relative w-[60px] aspect-square ">
            <Image
              src={getImageFromBuffer(created_by.profile_image)}
              className="rounded-full"
              layout="fill"
              objectFit="cover"
              alt=""
            />
          </div>
          <h1 className="text-greyApp text-2xl">{created_by.username}</h1>
        </div>
        <h1 className="text-blackApp text-4xl font-bold">${price} / diária</h1>
      </div>
      <Popover.Root>
        <Popover.Trigger>
          <div className="flex flex-row items-center cursor-pointer">
            <div className="flex items-center justify-start w-[350px] mr-[150px] h-11 bg-white px-8 py-8  border-2 border-greyApp hover:bg-lightGreyApp rounded-full">
              <h1 className="font-semibold text-xl">Checar disponibilidade</h1>
            </div>
            <div className="flex items-center justify-center rounded-full relative right-[220px]  w-[70px] aspect-square bg-black">
              <Calendar className="text-white" />
            </div>
          </div>
        </Popover.Trigger>
        <Popover.Content
          className="mt-10 z-20 rounded p-5 w-[360px] bg-white "
          sideOffset={5}
        >
          <CalendarTrip
            fromDate={checkIn}
            toDate={checkOut}
            mode="single"
            className="rounded-md border"
          />
        </Popover.Content>
      </Popover.Root>
      <div className="mr-[150px] flex flex-col gap-6 items-start">
        <h1
          className={`${
            isShowMore ? "line-clamp-none" : "line-clamp-6"
          } text-lg`}
        >
          {description}
        </h1>
        <button
          onClick={handleShowMore}
          className="font-bold underline text-lg cursor-pointer"
        >
          {isShowMore ? "Mostrar menos" : "Mostrar mais"}
        </button>
      </div>
      <Button
        onPressed={async () => handleCheckOut()}
        className="py-4 text-[16pt]"
        backgroundColor="black"
        text="Check-out"
      />

      <div className="w-full bg-greyApp h-[1px] rounded-full"></div>
    </div>
  );
}

export default ContentSection;
