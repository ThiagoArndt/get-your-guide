// app/header.tsx

// Import necessary modules
import Link from "next/link";
import Image from "next/image";
import Button from "@components/Button";
import logo from "../../../public/logo.png";

// Define the Header component
export default function Header() {
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
              alt=""
            />
            <h1 className="text-3xl font-extrabold">Company</h1>
          </div>

          {/* Navigation menu */}
          <nav className="hidden md:block">
            <ul className="flex gap-x-3">
              {/* Navigation links */}
              <li>
                <Link href="/" className="rounded-full py-2 px-4 hover:bg-lightGreyApp">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="rounded-full py-2 px-4 hover:bg-lightGreyApp">
                  About
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className="rounded-full py-2 px-4 hover:bg-lightGreyApp">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/blog" className="rounded-full py-2 px-4 hover:bg-lightGreyApp">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/contact" className="rounded-full py-2 px-4 hover:bg-lightGreyApp">
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        {/* Social media icons */}
        <div className="flex grow items-center justify-end gap-4">
          <Button backgroundColor="white" text="Login" />
          <Button backgroundColor="black" text="Registre-se" />
        </div>
        {/* Add Mobile Navigation Toggle Here */}
      </div>
    </header>
  );
}

// Define the SocialIcons component
function SocialIcons() {
  return (
    <div className="flex gap-x-4">
      {/* Twitter icon */}
      <a href="https://twitter.com/Jordan_Thirkle" target="_blank" rel="noopener noreferrer">
        <p>teste</p>
      </a>
      {/* GitHub icon */}
      <a href="https://github.com/jordan-thirkle" target="_blank" rel="noopener noreferrer">
        <p>teste</p>
      </a>
      {/* Add more social media icons as needed */}
    </div>
  );
}
