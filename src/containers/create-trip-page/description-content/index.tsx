"use client";
import Card from "@components/Card";
import InputField from "@components/InputField";
import React, { useState } from "react";

function DescriptionContent() {
  const [product, setProduct] = useState<string | null>("");

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-2xl">Description</h1>
      <Card>
        <div>
          <h1 className="font-bold text-greyApp">Product name</h1>
          <InputField
            input={product}
            setInput={setProduct}
            borderColor="grey"
            placeHolder="Apple Juice"
          />
        </div>
      </Card>
    </div>
  );
}

export default DescriptionContent;
