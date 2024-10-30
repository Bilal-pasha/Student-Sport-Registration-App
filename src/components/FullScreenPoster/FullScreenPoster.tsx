"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { RxCrossCircled } from "react-icons/rx";

const FullScreenPoster = () => {
  const { data: session } = useSession();
  const [showPoster, setShowPoster] = useState(false);

  useEffect(() => {
    if (session) {
      setShowPoster(true); // Show the poster only when the user is signed in
    }
  }, [session]);

  const handleClose = () => {
    setShowPoster(false);
  };

  if (!showPoster) return null;

  return (
    <div className="fixed inset-0 z-50 flex flex-col  items-center justify-center bg-black bg-opacity-80">
      <div className="w-full flex justify-end  max-w-xl">
        <button
          onClick={handleClose}
          className=" text-white focus:outline-none"
        >
          <RxCrossCircled className="h-10 w-10 text-white bg-gray-800 rounded-full p-1 hover:bg-gray-600 transition-colors duration-200 ease-in-out" />
        </button>
      </div>
      <div className="relative w-full max-w-5xl h-[80vh] sm:h-[90vh] lg:h-[80vh] p-4 md:p-8 rounded-lg shadow-xl flex items-center justify-center overflow-hidden">
        <Image
          src="/assets/poster.jpeg"
          alt="Poster"
          layout="fill"
          objectFit="contain"
          className="rounded-lg"
          priority
        />
      </div>
    </div>
  );
};

export default FullScreenPoster;
