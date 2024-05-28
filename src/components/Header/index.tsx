"use client";
import Link from "next/link";
import Image from "next/image";
import Button from "@components/Button";
import logo from "../../../public/logo.png";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";

import { useEffect, useState } from "react";
import axios from "axios";

export default function Header() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [imageData, setImageData] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchImage = async () => {
      if (session && session.user.profile_image_path) {
        try {
          const response = await axios.post("/api/get-image", {
            pathFile: session.user.profile_image_path,
          });
          const mimeType = response.data.mimeType;
          const base64Image = response.data.base64Image;
          setImageData(`data:${mimeType};base64,${base64Image}`);
        } catch (error) {
          console.error("Error fetching image:", error);
        } finally {
          setIsLoading(false);
        }
      } else {
        setIsLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchImage();
    } else {
      setIsLoading(false);
    }
  }, [session, status]);

  return (
    <header className="text-black top-0 mb-10">
      <div className="py-4 px-28 flex justify-between">
        <div className="flex flex-row items-center grow gap-32">
          <div className="flex flex-row gap-3 items-center">
            <Image
              className="relative"
              quality={100}
              src={logo}
              width={50}
              height={0}
              style={{ width: "auto", height: "80%" }}
              objectFit="contain"
              alt="Company logo"
            />
            <h1 className="text-3xl font-extrabold">Company</h1>
          </div>

          {/* Navigation menu */}
          <nav className="hidden md:block">
            <ul className="flex gap-x-3">
              {/* Navigation links */}
              <li>
                <Link
                  href="/"
                  className="rounded-full py-2 px-4 hover:bg-lightGreyApp"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="rounded-full py-2 px-4 hover:bg-lightGreyApp"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/portfolio"
                  className="rounded-full py-2 px-4 hover:bg-lightGreyApp"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="rounded-full py-2 px-4 hover:bg-lightGreyApp"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="rounded-full py-2 px-4 hover:bg-lightGreyApp"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        {/* Social media icons */}

        <div className="flex grow items-center justify-end gap-4">
          {isLoading ? (
            <div className="flex flex-row gap-5">
              <div className="relative aspect-square rounded-full bg-greyApp w-[50px]"></div>
              <Button
                onPressed={() => signOut()}
                backgroundColor="black"
                text="Sign Out"
              />
            </div>
          ) : session ? (
            <div className="flex flex-row gap-5">
              <div className="relative aspect-square w-[50px]">
                {imageData ? (
                  <Image
                    className="rounded-full"
                    src={imageData}
                    layout="fill"
                    objectFit="cover"
                    alt="User Image"
                  />
                ) : (
                  <div className="rounded-full bg-gray-300 w-full h-full flex items-center justify-center">
                    <div className="relative aspect-square rounded-full bg-greyApp w-[50px]"></div>
                  </div>
                )}
              </div>
              <Button
                onPressed={() => signOut()}
                backgroundColor="black"
                text="Sign Out"
              />
            </div>
          ) : (
            <>
              <Button
                onPressed={() => {
                  router.push("/login");
                }}
                backgroundColor="white"
                text="Login"
              />
              <Button
                onPressed={() => router.push("/register")}
                backgroundColor="black"
                text="Registre-se"
              />
            </>
          )}
        </div>
        {/* Add Mobile Navigation Toggle Here */}
      </div>
    </header>
  );
}
