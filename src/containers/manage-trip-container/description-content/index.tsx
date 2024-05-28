"use client";
import Card from "@components/Card";
import InputField from "@components/InputField";
import TextArea from "@components/TextArea";
import React, { useState } from "react";

function DescriptionContent() {
  const [product, setProduct] = useState<string>("");

  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="font-bold text-2xl">Description</h1>
      <Card className="flex flex-col gap-5 h-full w-full">
        <div>
          <h1 className="font-bold text-greyApp">Product name</h1>
          <InputField
            input={product}
            setInput={setProduct}
            borderColor="grey"
            placeHolder="Apple Juice"
          />
        </div>
        <div>
          <h1 className="font-bold text-greyApp">Product name</h1>
          <InputField
            input={product}
            setInput={setProduct}
            borderColor="grey"
            placeHolder="Apple Juice"
          />
        </div>
        <div>
          <h1 className="font-bold text-greyApp">Product name</h1>
          <InputField
            input={product}
            setInput={setProduct}
            borderColor="grey"
            placeHolder="Apple Juice"
            type="number"
          />
        </div>
        <h1 className="font-bold text-greyApp mb-[-10px]">Product name</h1>
        <div className="flex-grow relative">
          <TextArea className="h-full" input={product} setInput={setProduct} borderColor="grey" />
        </div>
      </Card>
    </div>
  );
}

export default DescriptionContent;
