"use client";
import { getCurrentUser } from "@libs/session";
import { getImageFromBuffer } from "@services/imageHelper";
import axios from "axios";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect } from "react";

interface ProfileContentInterface {
  username: string;
  image: Buffer;
}

function ProfileContent(props: ProfileContentInterface) {
  const { username, image } = props;
  const { data: session, status } = useSession();

  return (
    <div>
      <div className="flex flex-row items-center gap-5">
        <div className="relative w-[300px] aspect-square rounded-full">
          <Image
            src={getImageFromBuffer(image)}
            className="rounded-full"
            alt=""
            layout="fill"
            objectFit="cover"
          />
        </div>
        <p className="text-5xl">{username}</p>
      </div>
    </div>
  );
}

export default ProfileContent;
