"use client";
import Card from "@components/Card";
import InputField from "@components/InputField";
import React, { useState } from "react";
import { DollarSign } from "lucide-react";
import { UseFormRegister } from "react-hook-form";
import { CreateTripFormValues } from "@app/create-trip/page";

interface PricingContentInterface {
  setPrice: React.Dispatch<React.SetStateAction<string>>;
  price: string;
  register: UseFormRegister<CreateTripFormValues>;
}

function PricingContent(props: PricingContentInterface) {
  const { price, setPrice, register } = props;

  return (
    <div className="flex flex-col gap-4 flex-grow w-full">
      <h1 className="font-bold text-2xl">Description</h1>
      <Card className="flex flex-col gap-5 h-full w-full">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-greyApp">Product name</h1>
          <InputField
            {...register("Price", {
              required: true,
            })}
            icon={<DollarSign color="grey" />}
            borderColor="grey"
            input={price}
            setInput={setPrice}
          />
        </div>
      </Card>
    </div>
  );
}

export default PricingContent;
