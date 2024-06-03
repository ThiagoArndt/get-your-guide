import React from "react";
import Image from "next/image";
import coolImage1 from "../../../../public/cool-image1.jpg";
import coolImage2 from "../../../../public/cool-image2.jpg";
import coolImage3 from "../../../../public/cool-image3.webp";
import { getImageFromBuffer } from "@services/imageHelper";

interface ImagesSectionProps {
  images: Buffer[];
}

function ImagesSection(props: ImagesSectionProps) {
  const { images } = props;
  return (
    <div className="flex flex-col grow gap-10">
      <div className="relative w-full h-[450px]">
        <Image
          layout="fill"
          quality={100}
          className="rounded-[70px]"
          objectFit="cover"
          src={getImageFromBuffer(images[0])}
          alt=""
        />
      </div>
      <div className="flex flex-row gap-10">
        <div className="relative w-full h-[400px]">
          <Image
            layout="fill"
            quality={100}
            className="rounded-[70px]"
            objectFit="cover"
            src={getImageFromBuffer(images[1])}
            alt=""
          />
        </div>
        <div className="relative w-full h-[400px]">
          <Image
            layout="fill"
            quality={100}
            className="rounded-[70px]"
            objectFit="cover"
            src={getImageFromBuffer(images[2])}
            alt=""
          />
        </div>
      </div>
      <div className="relative w-full h-[250px]">
        <Image
          layout="fill"
          quality={100}
          className="rounded-[70px]"
          objectFit="cover"
          src={getImageFromBuffer(images[3])}
          alt=""
        />
      </div>
      <div className="flex flex-row gap-10">
        <div className="relative w-full h-[450px]">
          <Image
            layout="fill"
            quality={100}
            className="rounded-[70px]"
            objectFit="cover"
            src={getImageFromBuffer(images[4])}
            alt=""
          />
        </div>
        <div className="relative w-full h-[450px]">
          <Image
            layout="fill"
            quality={100}
            className="rounded-[70px]"
            objectFit="cover"
            src={getImageFromBuffer(images[5])}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default ImagesSection;
