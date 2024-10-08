"use"
import React from 'react';
import Image from 'next/image';
import Typewriter from '@/components/TypeWritter/TypeWritter';
import Navbar from '@/components/Navbar/Navbar';
import MadrasaTable from '../RegisteredMadrasasTable/RegisteredMadrasasTable';


const HomeScreen: React.FC = () => {
  return (
    <>
      {/* <Navbar /> */}
      <main className="flex flex-col justify-center items-center">
      <div className="container mx-auto p-6">
        <h1 className="text-2xl font-bold mb-4">Registered Schools</h1>
        <MadrasaTable />
      </div>
        {/* <div className="pb-12">
          <Image
            src="https://arabiaislamia.org/static/media/Logo.d8177b439b150086839e.png"
            alt="Jamia Arabia Islamia Logo"
            width={150}
            height={150}
            priority
          />
        </div>
        <Typewriter text="Welcome To Jamia Arabia Islamia" speed={100} /> */}
      </main>
    </>
  );
};

export default HomeScreen;
