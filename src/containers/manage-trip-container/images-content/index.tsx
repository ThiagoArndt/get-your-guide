"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Image as ImageIcon, X } from "lucide-react";
import Card from "@components/Card";
import Image from "next/image";
import toast from "react-hot-toast";
import { UseFormRegister } from "react-hook-form";
import { CreateTripFormValues } from "@app/create-trip/page";

interface ImagesContentProps {
  images: string[];
  setImages: React.Dispatch<React.SetStateAction<string[]>>;
}

function ImagesContent(props: ImagesContentProps) {
  const { images, setImages } = props;

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (images.length > 5) {
        toast.error("Máximo de imagens atingido");
        return;
      }

      if (acceptedFiles.length === 0) return;

      const files = acceptedFiles.slice(0, 6 - images.length); // Only add up to 6 images

      files.forEach((file) => {
        const reader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target && typeof e.target.result === "string") {
            setImages((prevImages: any) => [...prevImages, e.target!.result]);
          }
        };

        reader.readAsDataURL(file);
      });
    },
    [images]
  );

  const handleImageRemove = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg"],
    },
    maxFiles: 6 - images.length,
  });

  return (
    <div className="flex flex-col gap-4 w-full">
      <h1 className="font-bold text-2xl">Description</h1>
      <Card className="flex flex-col gap-5">
        <div className="flex flex-col overflow-x-auto">
          <div className="flex flex-row gap-2">
            <div
              {...getRootProps()}
              className="cursor-pointer border-2 border-dashed border-blackApp rounded-[13px] aspect-square w-[100px] flex items-center justify-center flex-shrink-0"
            >
              <input {...getInputProps()} />
              <ImageIcon size={25} />
            </div>
            {images.map((src: string, index: number) => (
              <div
                key={index}
                className="relative w-[100px] h-[100px] flex-shrink-0"
              >
                <div className="relative w-full h-full object-cover rounded-[13px]">
                  <X className="z-10" />
                  <h1 className="text-blue-500">aaaa</h1>
                  <Image
                    src={src}
                    alt=""
                    layout="fill"
                    objectFit="cover"
                    className="w-full z-0 h-full object-cover rounded-[13px]"
                  />
                  <X
                    onClick={() => handleImageRemove(index)}
                    className="absolute top-1 right-1 z-10 text-white cursor-pointer"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="h-2"></div>
        </div>
      </Card>
    </div>
  );
}

export default ImagesContent;
