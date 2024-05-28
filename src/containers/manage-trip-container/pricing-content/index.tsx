"use client";
import Card from "@components/Card";
import InputField from "@components/InputField";
import React, { useState } from "react";
import { DollarSign } from "lucide-react";

function PricingContent() {
  const [input, setInput] = useState<string>("");

  return (
    <div className="flex flex-col gap-4 flex-grow w-full">
      <h1 className="font-bold text-2xl">Description</h1>
      <Card className="flex flex-col gap-5 h-full w-full">
        <div className="flex flex-col gap-2">
          <h1 className="font-bold text-greyApp">Product name</h1>
          <InputField
            icon={<DollarSign color="grey" />}
            borderColor="grey"
            input={input}
            setInput={setInput}
          />
        </div>
      </Card>
    </div>
  );
}

export default PricingContent;
