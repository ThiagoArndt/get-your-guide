// app/header.tsx

// Import necessary modules
import Link from "next/link";
import Image from "next/image";
// Define the Header component
export default function Header() {
  return (
    <header className="text-black sticky top-0">
      <div className="py-10 px-28 flex justify-between">
        <div>
          <Image src="/logo.png" width={500} height={500} alt="Picture of the author" />
          <h1 className="text-xl font-semibold">Jordan Thirkle</h1>
        </div>

        {/* Navigation menu */}
        <nav className="hidden md:block">
          <ul className="flex gap-x-6">
            {/* Navigation links */}
            <li>
              <Link href="/" className="hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-gray-300">
                About
              </Link>
            </li>
            <li>
              <Link href="/portfolio" className="hover:text-gray-300">
                Portfolio
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-gray-300">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-gray-300">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
        {/* Social media icons */}
        <div className="hidden md:block">
          <SocialIcons />
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
