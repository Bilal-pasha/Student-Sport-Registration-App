import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { SessionWrapper } from "@/components/SessionWrapper/SessionWrapper";
import { Suspense } from "react";
import { FallBackComponent } from "@/components/FallBackComponent/FallBackComponent";
import "react-responsive-carousel/lib/styles/carousel.css";

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
      <body className="bg-white">
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
