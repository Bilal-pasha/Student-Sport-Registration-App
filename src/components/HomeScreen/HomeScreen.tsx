"use client";
import React from "react";
import Navbar from "@/components/Navbar/Navbar";
import MadrasaTable from "../RegisteredMadrasasTable/RegisteredMadrasasTable";
import { Carousel } from "flowbite-react";
import Image from "next/image";
import banner from "/public/assets/banner.jpeg";

const HomeScreen: React.FC = () => {
  return (
    <>
      {/* <Navbar /> */}
      <main className="flex flex-col justify-center items-center">
        <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 w-full">
          <div>
            <Image
              src={banner}
              alt="banner"
              layout="responsive"
              width={500} // Adjust width as necessary
              height={300} // Adjust height as necessary
            />
          </div>
        </div>

        {/* Uncomment if needed */}
        <div className="container mx-auto p-6">
          <h1 className="text-2xl font-bold mb-4 text-slate-200">
            Registered Schools
          </h1>
          <MadrasaTable />
        </div>
      </main>
    </>
  );
};

export default HomeScreen;
