import Typewriter from '@/components/TypeWritter/TypeWritter'
import React from 'react'

 const Page = () => {
  return (
    <>
    <div className='flex flex-col justify-center items-center h-[70vh]'>
      <div className='pb-12'>
      <img src="https://arabiaislamia.org/static/media/Logo.d8177b439b150086839e.png" alt="" className='w-full h-full' />
      </div>
      <Typewriter text="Welcome To Jamia Arabia Islamia" speed={100}/>
    </div>
    </>
  )
}
export default Page