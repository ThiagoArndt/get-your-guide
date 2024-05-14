import type { Metadata } from "next";
import "@styles/global.css";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { Nunito } from "next/font/google";
import Script from "next/script";

const nunito = Nunito({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GetYourGuide",
  description: "Created by GetYourGuideTM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={nunito.className}>
        <Header />
        <main className="px-10">{children}</main>
        <Footer />
        <Script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD67pfU2JP1ZlJ9MLIfhy6vykcl-ZJ0MNI&libraries=places" />
      </body>
    </html>
  );
}
