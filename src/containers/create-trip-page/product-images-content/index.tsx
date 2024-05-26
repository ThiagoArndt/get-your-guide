"use client";
import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Image as ImageIcon } from "lucide-react";
import Card from "@components/Card";
import Image from "next/image";
import toast from "react-hot-toast";

interface ProductImagesContentProps {}

const ProductImagesContent: React.FC<ProductImagesContentProps> = () => {
  const [productImages, setProductImages] = useState<string[]>([]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (productImages.length > 5) {
        toast.error("Máximo de imagens atingido");
        return;
      }

      if (acceptedFiles.length === 0) return;

      const files = acceptedFiles.slice(0, 6 - productImages.length); // Only add up to 6 images

      files.forEach((file) => {
        const reader = new FileReader();

        reader.onload = (e: ProgressEvent<FileReader>) => {
          if (e.target && typeof e.target.result === "string") {
            setProductImages((prevImages: any) => [
              ...prevImages,
              e.target!.result,
            ]);
          }
        };

        reader.readAsDataURL(file);
      });
    },
    [productImages]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif"],
    },
    maxFiles: 6 - productImages.length,
  });

  return (
    <div className="flex flex-col gap-4 flex-grow w-full">
      <h1 className="font-bold text-2xl">Description</h1>
      <Card className="flex flex-col gap-5 w-[500px]">
        <div className="flex flex-col overflow-x-auto">
          <div className="flex flex-row gap-2">
            <div
              {...getRootProps()}
              className="cursor-pointer border-2 border-dashed border-blackApp rounded-[13px] aspect-square w-[100px] flex items-center justify-center flex-shrink-0"
            >
              <input {...getInputProps()} />
              <ImageIcon size={25} />
            </div>
            {productImages.map((src: string, index: number) => (
              <div
                key={index}
                className="relative w-[100px] h-[100px] flex-shrink-0"
              >
                <div className="relative w-full h-full object-cover rounded-[13px]">
                  <Image
                    src={src}
                    alt=""
                    layout="fill"
                    objectFit="cover"
                    className="w-full h-full object-cover rounded-[13px]"
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
};

export default ProductImagesContent;
