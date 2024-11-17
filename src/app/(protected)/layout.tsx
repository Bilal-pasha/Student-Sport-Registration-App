import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { Toaster } from "react-hot-toast";
import { SessionWrapper } from "@/components/SessionWrapper/SessionWrapper";
import Navbar from "@/components/Navbar/Navbar";
import { Suspense } from "react";
import { FallBackComponent } from "@/components/FallBackComponent/FallBackComponent";
import FullScreenPoster from "@/components/FullScreenPoster/FullScreenPoster";
import {MadrasaRegistrationProvider} from "@/context/useMadrasaRegistrationContext"
export const metadata: Metadata = {
  title: "Inter Deeni Madaris Scouts Camp 2024",
  description:
    "Scouts Camp 2024 Organized by Jamia Arabia Islamia Scout Coloney",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <MadrasaRegistrationProvider>
          <Suspense fallback={<FallBackComponent />}>
            <div className="relative bg-camping-image bg-blend-darken bg-cover bg-no-repeat min-h-screen">
              <div className="absolute inset-0 bg-black opacity-50"></div>
              <SessionWrapper>
                <Toaster position="top-right" />
                <Navbar />
                {/* <FullScreenPoster /> Add the FullScreenPoster here */}
                <div className="relative z-10">{children}</div>
              </SessionWrapper>
            </div>
          </Suspense>
        </MadrasaRegistrationProvider>
      </body>
    </html>
  );
}
