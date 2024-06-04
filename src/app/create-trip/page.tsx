"use client";

import CardWrapper from "@containers/manage-trip-container/card-wrapper";
import DatesContent from "@containers/manage-trip-container/dates-content";
import DescriptionContent from "@containers/manage-trip-container/description-content";
import ProductImagesContent from "@containers/manage-trip-container/images-content";
import PricingContent from "@containers/manage-trip-container/pricing-content";
import React, { useState } from "react";
import Button from "@components/Button";
import { useSession } from "next-auth/react";
import { FieldErrors, SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { TripInterface } from "@entities/interfaces";
import { imageToBuffer } from "@services/imageHelper";
import { useRouter } from "next/navigation";

export interface CreateTripFormValues {
  Title: string;
  Location: string;
  NumberPeple: string;
  Description: string;
  CheckInDate: Date;
  CheckOutDate: Date;
  Price: string;
}

function CreateTripPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [title, setTitle] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [numberPeople, setNumberPeople] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [images, setImages] = useState<string[]>([]);
  const [checkInDate, setCheckInDate] = useState<Date | undefined>(undefined);
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>(undefined);
  const [price, setPrice] = useState<string>("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateTripFormValues>();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  const onSubmit: SubmitHandler<CreateTripFormValues> = async (data) => {
    console.log(images.length);
    if (images.length != 6) {
      toast.error("Número de imagens deve ser 6");
      return;
    }
    if (parseInt(numberPeople) > 20) {
      toast.error("Número máximo de pessoas é 20");
      return;
    }
    if (checkInDate == undefined || checkOutDate == undefined) {
      toast.error("Datas não podem ser indefinidas");
      return;
    }
    if (location.length === 0) {
      toast.error("Localização é obrigatório");
      return;
    }

    if (Number.isNaN(parseFloat(price))) {
      toast.error("Preço não é um número");
      return;
    }

    console.log(
      images.map((dataURL) => Buffer.from(dataURL.split(",")[1], "base64"))[0]
    );

    const objData = {
      date_final: checkOutDate!,
      date_initial: checkInDate!,
      description: description,
      images: images,
      location: location,
      price: parseFloat(price),
      title: title,
      number_people: parseInt(numberPeople),
    };

    try {
      const res = await axios.post("api/create-trip", objData);
      toast.success(res.statusText);
      router.push("/");
    } catch (e) {
      if (axios.isAxiosError(e)) {
        toast.error(e.response?.statusText ?? "Erro desconhecido");
      }
    }
  };

  const onError = (errors: FieldErrors<CreateTripFormValues>) => {
    console.log(errors);
    if (errors.Title) {
      toast.error("Título é obrigatório!");
    } else if (errors.NumberPeple) {
      toast.error("Número de pessoas é obrigatório");
    } else if (errors.Description) {
      toast.error("Descrição é obrigatório");
    } else if (errors.Price) {
      toast.error("Preço é obrigatório");
    }
  };

  return (
    <div className="px-80">
      <CardWrapper>
        <div className="flex flex-col justify-between h-full">
          <div className="py-5">
            <div className="flex flex-row gap-5 min-w-[500px]">
              <DescriptionContent
                register={register}
                description={description}
                location={location}
                numberPeople={numberPeople}
                title={title}
                setDescription={setDescription}
                setLocation={setLocation}
                setNumberPeople={setNumberPeople}
                setTitle={setTitle}
              />
              <div className="flex flex-col gap-5 min-w-[500px]">
                <ProductImagesContent images={images} setImages={setImages} />
                <DatesContent
                  checkInDate={checkInDate}
                  checkOutDate={checkOutDate}
                  setCheckInDate={setCheckInDate}
                  setCheckOutDate={setCheckOutDate}
                />
                <PricingContent
                  register={register}
                  price={price}
                  setPrice={setPrice}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-5 w-full justify-end mt-10">
            <Button
              hasBorder
              backgroundColor="white"
              onPressed={() => router.push("/")}
              text="Cancelar"
            />
            <Button
              hasBorder
              backgroundColor="black"
              onPressed={handleSubmit(onSubmit, onError)}
              text="Confirmar"
            />
          </div>
        </div>
      </CardWrapper>
    </div>
  );
}

export default CreateTripPage;
