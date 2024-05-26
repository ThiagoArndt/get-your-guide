"use client";
import InputField from "@components/InputField";
import React, { useState } from "react";
import Card from "@components/Card";
import TextArea from "@components/TextArea";
function ProductImagesContent() {
  const [product, setProduct] = useState<string | null>("");

  return (
    <div className="flex flex-col gap-4 grow w-full">
      <h1 className="font-bold text-2xl">Description</h1>
      <Card className="flex flex-col gap-5 w-full">
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
      </Card>
    </div>
  );
}

export default ProductImagesContent;
