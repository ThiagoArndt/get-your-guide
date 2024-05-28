// app/header.tsx

// Import necessary modules
import Link from "next/link";

// Define the Header component
export default function Header() {
  return (
    <header className="bg-gray-900 text-white py-4 sticky top-0 z-50">
      {/* Header container */}
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Website title */}
        <h1 className="text-xl font-semibold">Pinto</h1>
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
      <a
        href="https://twitter.com/Jordan_Thirkle"
        target="_blank"
        rel="noopener noreferrer"
      >
        <p>teste</p>
      </a>
      {/* GitHub icon */}
      <a
        href="https://github.com/jordan-thirkle"
        target="_blank"
        rel="noopener noreferrer"
      >
        <p>teste</p>
      </a>
      {/* Add more social media icons as needed */}
    </div>
  );
}
