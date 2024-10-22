import React from 'react'
import Image from "next/image";

export const FallBackComponent = () => {
  return (
    <div className='h-screen w-screen flex justify-center items-center'>
         <Image
          src="https://arabiaislamia.org/static/media/Logo.d8177b439b150086839e.png"
          alt="Jamia Arabia Islamia Logo"
          width={150}
          height={150}
          priority
        />
    </div>
  )
}
