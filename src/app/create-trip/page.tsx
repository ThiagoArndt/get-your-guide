import CardWrapper from "@containers/create-trip-page/card-wrapper";
import DescriptionContent from "@containers/create-trip-page/description-content";
import ProductImagesContent from "@containers/create-trip-page/product-images-content";
import React from "react";

function CreateTripPage() {
  return (
    <div className="xl:px-40 px-80">
      <CardWrapper>
        <div className="py-5">
          <div className="flex flex-row gap-5">
            <DescriptionContent />
            <ProductImagesContent />
          </div>
        </div>
      </CardWrapper>
    </div>
  );
}

export default CreateTripPage;
