"use client";
import React, { useEffect } from "react";
import FeatherIcon from "feather-icons-react";
import Button from "@components/Button";
import * as Popover from "@radix-ui/react-popover";
import PlacesAutocomplete from "react-places-autocomplete";
import { Calendar } from "@components/Calendar";
import { dateFormatter } from "@libs/utils/dateFormatter";

interface SelectTripInfo {
  setPostAddress: React.Dispatch<React.SetStateAction<string>>;
  setCheckIn: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setCheckOut: React.Dispatch<React.SetStateAction<Date | undefined>>;
  setPeople: React.Dispatch<React.SetStateAction<number>>;

  postAddress: string;
  checkIn: Date | undefined;
  checkOut: Date | undefined;
  people: number;
}

function SelectTripInfo(props: Readonly<SelectTripInfo>) {
  const {
    setCheckIn,
    setCheckOut,
    setPostAddress,
    setPeople,
    postAddress,
    checkIn,
    checkOut,
    people,
  } = props;

  const handlePostAddressChange = (address: string) => {
    setPostAddress(address);
  };

  useEffect(() => {
    if (checkIn && checkOut && checkOut < checkIn) {
      setCheckOut(undefined);
    }
  }, [checkIn, checkOut, setCheckOut]);

  return (
    <div className="rounded-3xl bg-white text-black py-6 w-full h-32 px-32 items-center justify-between flex">
      <Popover.Root>
        <Popover.Trigger>
          <div className="flex flex-col items-start justify-start cursor-pointer rounded-3xl px-4 py-2 hover:bg-lightGreyApp">
            <div className="flex flex-row gap-2">
              <h1 className="font-bold">Destino</h1>
              <FeatherIcon icon="chevron-down" className="text-greenApp" />
            </div>
            <p>{postAddress == "" ? "Para onde está indo?" : postAddress}</p>
          </div>
        </Popover.Trigger>

        <Popover.Content
          className="mt-10 rounded p-5 w-[360px] bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          <PlacesAutocomplete
            value={postAddress}
            onChange={handlePostAddressChange}
            searchOptions={{ types: ["locality", "country"] }}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps }) => {
              return (
                <div className="">
                  <div className="flex flex-row w-full">
                    <input
                      {...getInputProps({
                        placeholder: "Tag the location",
                        className: "outline-none w-full",
                      })}
                    />
                    {postAddress.length > 0 && <button>x</button>}
                  </div>
                  {suggestions.length > 0 && (
                    <div>
                      {suggestions.map((suggestion) => {
                        return (
                          /* eslint-disable react/jsx-key */
                          <div {...getSuggestionItemProps(suggestion, {})}>
                            <strong>{suggestion.formattedSuggestion.mainText}</strong>{" "}
                            <small>{suggestion.formattedSuggestion.secondaryText}</small>
                          </div>
                        );
                        /* eslint-enable react/jsx-key */
                      })}
                    </div>
                  )}
                </div>
              );
            }}
          </PlacesAutocomplete>
        </Popover.Content>
      </Popover.Root>
      <div className="w-[1px] bg-blackApp h-full"></div>
      <Popover.Root>
        <Popover.Trigger>
          <div className="w-[1px] bg-blackApp h-full"></div>
          <div className="flex flex-col items-start cursor-pointer rounded-3xl px-4 py-2 hover:bg-lightGreyApp">
            <div className="flex flex-row gap-2">
              <h1 className="font-bold">Check-in</h1>
              <FeatherIcon icon="chevron-down" className="text-greenApp" />
            </div>
            {checkIn === undefined || checkIn.getTime() === new Date().getTime()
              ? "Escolha as datas"
              : dateFormatter(checkIn)}
          </div>
        </Popover.Trigger>

        <Popover.Content
          className="mt-10 rounded p-5 w-[360px] bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          <Calendar
            fromDate={new Date()}
            toDate={checkOut}
            mode="single"
            selected={checkIn}
            onSelect={setCheckIn}
            className="rounded-md border"
          />
        </Popover.Content>
      </Popover.Root>

      <div className="w-[1px] bg-blackApp h-full"></div>
      <Popover.Root>
        <Popover.Trigger>
          <div className="w-[1px] bg-blackApp h-full"></div>
          <div className="items-start flex flex-col cursor-pointer rounded-3xl px-4 py-2 hover:bg-lightGreyApp">
            <div className="flex flex-row gap-2">
              <h1 className="font-bold">Check-out</h1>
              <FeatherIcon icon="chevron-down" className="text-greenApp" />
            </div>
            {checkOut === undefined || checkOut.getTime() === new Date().getTime()
              ? "Escolha as datas"
              : dateFormatter(checkOut)}
          </div>
        </Popover.Trigger>

        <Popover.Content
          className="mt-10 rounded p-5 w-[360px] bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          <Calendar
            fromDate={checkIn ?? new Date()}
            toDate={undefined}
            mode="single"
            selected={checkOut}
            onSelect={setCheckOut}
            className="rounded-md border"
          />
        </Popover.Content>
      </Popover.Root>
      <div className="w-[1px] bg-blackApp h-full"></div>
      <Popover.Root>
        <Popover.Trigger>
          <div className="w-[1px] bg-blackApp h-full"></div>
          <div className="items-start flex flex-col cursor-pointer rounded-3xl px-4 py-2 hover:bg-lightGreyApp">
            <div className="flex flex-row gap-2">
              <h1 className="font-bold">Pessoas</h1>
              <FeatherIcon icon="chevron-down" className="text-greenApp" />
            </div>
            {people > 0 ? `${people.toString()} pessoas` : "Quantas Pessoas?"}
          </div>
        </Popover.Trigger>

        <Popover.Content
          className="mt-10 rounded p-5 w-[360px] bg-white shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2)] focus:shadow-[0_10px_38px_-10px_hsla(206,22%,7%,.35),0_10px_20px_-15px_hsla(206,22%,7%,.2),0_0_0_2px_theme(colors.violet7)] will-change-[transform,opacity] data-[state=open]:data-[side=top]:animate-slideDownAndFade data-[state=open]:data-[side=right]:animate-slideLeftAndFade data-[state=open]:data-[side=bottom]:animate-slideUpAndFade data-[state=open]:data-[side=left]:animate-slideRightAndFade"
          sideOffset={5}
        >
          <div className="w-full flex justify-between items-center gap-x-5">
            <div className="grow">
              <input
                className="w-full p-0 bg-transparent border-0 text-gray-800 focus:ring-0 dark:text-white"
                type="text"
                value={people.toString()}
                data-hs-input-number-input=""
              />
            </div>
            <div className="flex justify-end items-center gap-x-1.5">
              <button
                onClick={() => (people != 0 ? setPeople(people - 1) : null)}
                type="button"
                className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                data-hs-input-number-decrement=""
              >
                <svg
                  className="flex-shrink-0 size-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M5 12h14"></path>
                </svg>
              </button>
              <button
                onClick={() => setPeople(people + 1)}
                type="button"
                className="size-6 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-full border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800"
                data-hs-input-number-increment=""
              >
                <svg
                  className="flex-shrink-0 size-3.5"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                >
                  <path d="M5 12h14"></path>
                  <path d="M12 5v14"></path>
                </svg>
              </button>
            </div>
          </div>
        </Popover.Content>
      </Popover.Root>
      <Button bgColor="black" text="Pesquisar" />
    </div>
  );
}

export default SelectTripInfo;
