import React from "react";
import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
interface CardWrapperProps {
  children: React.JSX.Element;
}

function CardWrapper(props: Readonly<CardWrapperProps>) {
  const router = useRouter();
  const { children } = props;
  return (
    <div className="flex flex-col bg-white w-full rounded-[30px] px-10 py-5 h-auto">
      <div className="flex flex-row gap-3">
        <div className="border-2 flex items-center w-12 aspect-square justify-center rounded-xl">
          <ChevronLeft onClick={() => router.push("/")} />
        </div>
        <div className="flex flex-col">
          <h1 className="text-greyApp">CRIAR VIAGEM</h1>
          <h1 className="font-bold">Overview</h1>
        </div>
      </div>
      <div className=" overflow-auto">{children}</div>
    </div>
  );
}

export default CardWrapper;
