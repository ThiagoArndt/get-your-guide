"use client";

import CardWrapper from "@containers/manage-trip-container/card-wrapper";
import DatesContent from "@containers/manage-trip-container/dates-content";
import DescriptionContent from "@containers/manage-trip-container/description-content";
import ProductImagesContent from "@containers/manage-trip-container/product-images-content";
import PricingContent from "@containers/manage-trip-container/pricing-content";
import React from "react";
import Button from "@components/Button";

function CreateTripPage() {
  return (
    <div className="px-80">
      <CardWrapper>
        <div className="flex flex-col justify-between h-full">
          <div className="py-5">
            <div className="flex flex-row gap-5 min-w-[500px]">
              <DescriptionContent />
              <div className="flex flex-col gap-5 min-w-[500px]">
                <ProductImagesContent />
                <DatesContent />
                <PricingContent />
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-5 w-full justify-end mt-10">
            <Button
              hasBorder
              backgroundColor="white"
              onPressed={() => {}}
              text="Cancelar"
            />
            <Button
              hasBorder
              backgroundColor="white"
              onPressed={() => {}}
              text="Cancelar"
            />
          </div>
        </div>
      </CardWrapper>
    </div>
  );
}

export default CreateTripPage;
