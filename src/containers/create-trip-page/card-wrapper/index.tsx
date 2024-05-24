import React from "react";
import { ChevronLeft } from "lucide-react";

interface CardWrapperProps {
  children: React.JSX.Element;
}

function CardWrapper(props: Readonly<CardWrapperProps>) {
  const { children } = props;
  return (
    <div className="flex flex-col bg-white w-full rounded-[30px] px-10 py-5 h-[1240px]">
      <div className="flex flex-row gap-3">
        <div className="border-2 flex items-center aspect-square justify-center rounded-xl">
          <ChevronLeft />
        </div>
        <div className="flex flex-col">
          <h1 className="text-greyApp">LOREM IPSUM</h1>
          <h1 className="font-bold">Overview</h1>
        </div>
      </div>
      {children}
    </div>
  );
}

export default CardWrapper;
