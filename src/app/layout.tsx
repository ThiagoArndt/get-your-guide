"use client";
import "@styles/global.css";
import Header from "@components/Header";
import Footer from "@components/Footer";
import { Nunito } from "next/font/google";
import Script from "next/script";
import { Provider } from "react-redux";
import store from "@store/store";
import { Toaster } from "react-hot-toast";
import { SessionProvider } from "next-auth/react";

const nunito = Nunito({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <Provider store={store}>
        <html lang="pt-BR">
          <body className={nunito.className}>
            <Header />
            <main className="px-20">{children}</main>
            <Toaster position="bottom-center" />
            <Footer />
            <Script src={process.env.GOOGLE_API_KEY} />
          </body>
        </html>
      </Provider>
    </SessionProvider>
  );
}
