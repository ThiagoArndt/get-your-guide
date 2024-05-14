"use client";
import React, { useState } from "react";
import FeatherIcon from "feather-icons-react";
import Button from "@components/Button";
import * as Popover from "@radix-ui/react-popover";
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
  Suggestion,
} from "react-places-autocomplete";

interface SelectTripInfo {
  // setDestination: React.Dispatch<React.SetStateAction<string>>;
  // setCheckIn: React.Dispatch<React.SetStateAction<string>>;
  // setCheckOut: React.Dispatch<React.SetStateAction<string>>;
  // setPeople: React.Dispatch<React.SetStateAction<number>>;
}

function SelectTripInfo(props: Readonly<SelectTripInfo>) {
  // const { setCheckIn, setCheckOut, setDestination, setPeople } = props;

  const [postAddress, setPostAddress] = useState("");
  const [suggestion, setSuggestion] = useState<Suggestion[]>([]);
  const handlePostAddressChange = (address: string) => {
    console.log(address);

    setPostAddress(address);
  };

  return (
    <div className="rounded-3xl bg-white text-black py-6 w-full h-32 px-32 items-center justify-between flex">
      <Popover.Root>
        <Popover.Trigger>
          <div className="flex flex-col cursor-pointer rounded-3xl px-4 py-2 hover:bg-lightGreyApp">
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
      <div className="flex flex-col cursor-pointer rounded-3xl px-4 py-2 hover:bg-lightGreyApp">
        <div className="flex flex-row gap-2">
          <h1 className="font-bold">Check-in</h1>
          <FeatherIcon icon="chevron-down" className="text-greenApp" />
        </div>
        <p>Escolha as datas</p>
      </div>
      <div className="w-[1px] bg-blackApp h-full"></div>
      <div className="flex flex-col cursor-pointer rounded-3xl px-4 py-2 hover:bg-lightGreyApp">
        <div className="flex flex-row gap-2">
          <h1 className="font-bold">Check-out</h1>
          <FeatherIcon icon="chevron-down" className="text-greenApp" />
        </div>
        <p>Escolha as datas</p>
      </div>
      <div className="w-[1px] bg-blackApp h-full"></div>
      <div className="flex flex-col cursor-pointer rounded-3xl px-4 py-2 hover:bg-lightGreyApp">
        <div className="flex flex-row gap-2">
          <h1 className="font-bold">Pessoas</h1>
          <FeatherIcon icon="chevron-down" className="text-greenApp" />
        </div>
        <p>Quantas pessoas?</p>
      </div>
      <div className="w-[1px] bg-blackApp h-full"></div>

      <Button bgColor="black" text="Pesquisar" />
    </div>
  );
}

export default SelectTripInfo;
