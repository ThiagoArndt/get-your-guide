"use client";
import Button from "@components/Button";
import Card from "@components/Card";
import React, { useEffect } from "react";
import * as Popover from "@radix-ui/react-popover";
import { Calendar } from "@components/Calendar";
import { dateFormatter } from "@services/dateFormatter";
import { UseFormRegister } from "react-hook-form";
import { CreateTripFormValues } from "@app/create-trip/page";

interface DatesContentInterface {
  setCheckInDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setCheckOutDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  checkInDate: Date | undefined;
  checkOutDate: Date | undefined;
}

function DatesContent(props: DatesContentInterface) {
  const { checkInDate, checkOutDate, setCheckInDate, setCheckOutDate } = props;

  useEffect(() => {
    if (checkInDate && checkOutDate && checkOutDate < checkInDate) {
      setCheckOutDate(undefined);
    }
  }, [checkInDate, checkOutDate, setCheckOutDate]);

  return (
    <div className="flex flex-col gap-4 flex-grow w-full">
      <h1 className="font-bold text-2xl">Description</h1>
      <Card className="flex flex-col gap-5 h-full w-full">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-greyApp">Product name</h1>
          <div className="grid grid-cols-2 grid-rows-2 gap-5 justify-items-start items-center">
            <Popover.Root>
              <Popover.Trigger>
                <Button
                  className="text-greyApp !px-6 border-lightGreyApp"
                  onPressed={() => {}}
                  backgroundColor="white"
                  text="Data inicial"
                  hasBorder={true}
                />
              </Popover.Trigger>

              <Popover.Content
                className="mt-10 z-20 rounded p-5 w-[360px] bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
                sideOffset={5}
              >
                <Calendar
                  fromDate={new Date()}
                  toDate={checkOutDate}
                  mode="single"
                  selected={checkInDate}
                  onSelect={setCheckInDate}
                  className="rounded-md border"
                />
              </Popover.Content>
            </Popover.Root>
            {checkInDate === undefined ||
            new Date(checkInDate).getTime() === new Date().getTime() ? (
              <h1></h1>
            ) : (
              <h1>{dateFormatter(new Date(checkInDate))}</h1>
            )}
            <Popover.Root>
              <Popover.Trigger>
                <Button
                  className="text-greyApp border-lightGreyApp"
                  onPressed={() => {}}
                  backgroundColor="white"
                  text="Data final"
                  hasBorder={true}
                />
              </Popover.Trigger>

              <Popover.Content
                className="mt-10 z-20 rounded p-5 w-[360px] bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
                sideOffset={5}
              >
                <Calendar
                  fromDate={checkInDate ?? new Date()}
                  toDate={undefined}
                  mode="single"
                  selected={checkOutDate}
                  onSelect={setCheckOutDate}
                  className="rounded-md border"
                />
              </Popover.Content>
            </Popover.Root>
            {checkOutDate === undefined ||
            new Date(checkOutDate).getTime() === new Date().getTime() ? (
              <h1></h1>
            ) : (
              <h1>{dateFormatter(new Date(checkOutDate))}</h1>
            )}
          </div>
        </div>
      </Card>
    </div>
  );
}

export default DatesContent;
