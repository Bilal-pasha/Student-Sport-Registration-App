import React from 'react';
import Image from 'next/image';
import Typewriter from '@/components/TypeWritter/TypeWritter';
import Navbar from '@/components/Navbar/Navbar';

const HomeScreen: React.FC = () => {
  return (
    <>
      <Navbar />
      <main className="flex flex-col justify-center items-center h-[70vh]">
        <div className="pb-12">
          <Image
            src="https://arabiaislamia.org/static/media/Logo.d8177b439b150086839e.png"
            alt="Jamia Arabia Islamia Logo"
            width={150}
            height={150}
            priority
          />
        </div>
        <Typewriter text="Welcome To Jamia Arabia Islamia" speed={100} />
      </main>
    </>
  );
};

export default HomeScreen;
