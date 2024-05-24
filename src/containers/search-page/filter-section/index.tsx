import SelectTripInfo from "@components/SelectTripInfo";
import React, { useState } from "react";

interface FilterSectionProps {
  destination?: string;
  checkInDate?: Date;
  checkOutDate?: Date;
  maxPeople?: number;
}

function FilterSection(props: Readonly<FilterSectionProps>) {
  const { checkInDate, checkOutDate, destination, maxPeople } = props;

  const [postAddress, setPostAddress] = useState<string | undefined>(destination ?? "");
  const [checkIn, setCheckIn] = useState<Date | undefined>(checkInDate ?? undefined);
  const [checkOut, setCheckOut] = useState<Date | undefined>(checkOutDate ?? undefined);
  const [people, setPeople] = useState<number | undefined>(maxPeople ?? 0);

  return (
    <div>
      {" "}
      <SelectTripInfo
        checkIn={checkIn}
        checkOut={checkOut}
        people={people}
        postAddress={postAddress}
        setCheckIn={setCheckIn}
        setCheckOut={setCheckOut}
        setPeople={setPeople}
        setPostAddress={setPostAddress}
      />
    </div>
  );
}

export default FilterSection;
