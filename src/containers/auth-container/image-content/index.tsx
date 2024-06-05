import Image from "next/image";
import React from "react";
import image from "../../../../public/auth-image.jpg";

function ImageContent() {
  return (
    <div className="relative w-full h-[700px] mr-20">
      <Image
        src={image}
        className="rounded-3xl brightness-75"
        quality={100}
        layout="fill"
        objectFit="cover"
        alt=""
      />
    </div>
  );
}

export default ImageContent;
