import React from "react";
import Image from "next/image";
import coolImage1 from "../../../../public/cool-image1.jpg";
import coolImage2 from "../../../../public/cool-image2.jpg";
import coolImage3 from "../../../../public/cool-image3.webp";

interface ImagesSectionProps {
  imageOne: string;
  imageTwo: string;
  imageThree: string;
  imageFour: string;
  imageFive: string;
}

function ImagesSection() {
  return (
    <div className="flex flex-col grow gap-10">
      <div className="relative w-full h-[450px]">
        <Image
          layout="fill"
          quality={100}
          className="rounded-[70px]"
          objectFit="cover"
          src={coolImage1}
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
            src={coolImage2}
            alt=""
          />
        </div>
        <div className="relative w-full h-[400px]">
          <Image
            layout="fill"
            quality={100}
            className="rounded-[70px]"
            objectFit="cover"
            src={coolImage3}
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
          src={coolImage1}
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
            src={coolImage1}
            alt=""
          />
        </div>
        <div className="relative w-full h-[450px]">
          <Image
            layout="fill"
            quality={100}
            className="rounded-[70px]"
            objectFit="cover"
            src={coolImage2}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default ImagesSection;
