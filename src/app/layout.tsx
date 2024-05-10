import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";
import "@styles/global.css";
import Header from "@components/Header";
import Footer from "@components/Footer";

const nunito = Nunito_Sans({ subsets: ["latin"] });

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
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
