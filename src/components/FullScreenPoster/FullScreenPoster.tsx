"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { ImCross } from "react-icons/im";

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div className="relative bg-white px-3 sm:py-4 md:py-6 rounded-lg max-w-2xl w-full shadow-lg space-y-4">
        <div className="flex justify-end border-b-2 border-gray-200">
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 focus:outline-none pb-3"
          >
            <ImCross className="h-5 w-5" />
          </button>
        </div>
        <div className="flex justify-center items-center">
          <Image
            src="/assets/poster.jpeg"
            alt="Poster"
            height={600}
            width={600}
            className="object-contain rounded-lg w-full h-auto"
            priority
          />
        </div>
      </div>
    </div>
  );
};

export default FullScreenPoster;
