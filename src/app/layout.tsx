import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { SessionWrapper } from "@/components/SessionWrapper/SessionWrapper";
import Navbar from "@/components/Navbar/Navbar";
import { Suspense } from "react";
import { FallBackComponent } from "@/components/FallBackComponent/FallBackComponent";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Arabia Fees System",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200
    <html lang="en">
      <body className="bg-yellow-300">
        <Suspense fallback={<FallBackComponent />}>
          <SessionWrapper>
            <Toaster position="top-right" />
            {children}
          </SessionWrapper>
        </Suspense>
      </body>
    </html>
  );
}
