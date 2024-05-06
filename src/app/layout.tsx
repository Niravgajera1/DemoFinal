"use client";
import type { Metadata } from "next";
import "react-toastify/dist/ReactToastify.css";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "react-redux";
import store from "./Redux/store";
import Navbar from "./components/navbar";
import Footer from "./components/footer";
import Link from "next/link";
import { ToastContainer } from "react-toastify";

const inter = Inter({ subsets: ["latin"] });
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link
        href="https://cdn.jsdelivr.net/npm/daisyui@4.9.0/dist/full.min.css"
        rel="stylesheet"
        type="text/css"
      />
      <script src="https://cdn.tailwindcss.com"></script>
      <body className={inter.className}>
        {/* <ToastContainer /> */}
        <Provider store={store}>
          <Navbar />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
