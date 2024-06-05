"use client";
import { CreateTripFormValues } from "@app/create-trip/page";
import Card from "@components/Card";
import InputField from "@components/InputField";
import TextArea from "@components/TextArea";
import React, { useState } from "react";
import { UseFormRegister } from "react-hook-form";
import PlacesAutocomplete from "react-places-autocomplete";

interface DescriptionContentInterface {
  title: string;
  location: string;
  numberPeople: string;
  description: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
  setNumberPeople: React.Dispatch<React.SetStateAction<string>>;
  setDescription: React.Dispatch<React.SetStateAction<string>>;
  register: UseFormRegister<CreateTripFormValues>;
}

function DescriptionContent(props: DescriptionContentInterface) {
  const {
    description,
    location,
    numberPeople,
    setDescription,
    setLocation,
    setNumberPeople,
    setTitle,
    title,
    register,
  } = props;

  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="font-bold text-2xl">Description</h1>
      <Card className="flex flex-col gap-5 h-full w-full">
        <div>
          <h1 className="font-bold text-greyApp">Título</h1>
          <InputField
            {...register("Title", {
              required: true,
            })}
            input={title}
            setInput={setTitle}
            borderColor="grey"
            placeHolder="Hotel Transilvânia"
          />
        </div>
        <div>
          <h1 className="font-bold text-greyApp">Localização</h1>
          <PlacesAutocomplete
            value={location}
            onChange={(e) => setLocation(e)}
            searchOptions={{ types: ["locality", "sublocality", "country"] }}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps }) => {
              return (
                <div className="">
                  <div className="w-full">
                    <div className="flex border-greySecondApp flex-row px-2 gap-3 py-2 w-full border-2 rounded-xl border-solid">
                      <input
                        placeholder="Boa vista, Joinville"
                        {...getInputProps()}
                        className="w-full font-medium bg-transparent overflow-y-hidden break-words outline-none"
                      />
                    </div>
                  </div>

                  {suggestions.length > 0 && (
                    <div className="absolute bg-white">
                      {suggestions.map((suggestion) => {
                        return (
                          /* eslint-disable react/jsx-key */
                          <div {...getSuggestionItemProps(suggestion, {})}>
                            <strong>
                              {suggestion.formattedSuggestion.mainText}
                            </strong>{" "}
                            <small>
                              {suggestion.formattedSuggestion.secondaryText}
                            </small>
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
        </div>
        <div>
          <h1 className="font-bold text-greyApp">Número de pessoas</h1>
          <InputField
            {...register("NumberPeple", {
              required: true,
            })}
            input={numberPeople}
            setInput={setNumberPeople}
            borderColor="grey"
            placeHolder="0"
            type="number"
          />
        </div>
        <h1 className="font-bold text-greyApp mb-[-10px]">Descrição</h1>
        <div className="flex-grow relative">
          <TextArea
            {...register("Description", {
              required: true,
            })}
            className="h-full"
            input={description}
            setInput={setDescription}
            borderColor="grey"
          />
        </div>
      </Card>
    </div>
  );
}

export default DescriptionContent;
