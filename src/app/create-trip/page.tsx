import CardWrapper from "@containers/create-trip-page/card-wrapper";
import DescriptionContent from "@containers/create-trip-page/description-content";
import React from "react";

function CreateTripPage() {
  return (
    <div className="px-80">
      <CardWrapper>
        <div className="py-5">
          <DescriptionContent />
        </div>
      </CardWrapper>
    </div>
  );
}

export default CreateTripPage;
