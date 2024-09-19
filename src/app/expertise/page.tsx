"use client"
import CheckAuthentication from '@/components/CheckAuth/CheckAuth'
import Navbar from '@/components/Navbar/Navbar'
import React from 'react'

 const page = () => {
  return (
    <>
    {/* <Navbar/> */}
    <div className='h-[75vh] flex justify-center items-center'>
        <h2>This Page is building ! Sorry </h2>
    </div>
    </>
  )
}
export default CheckAuthentication(page)