import React from 'react'
import { Outlet } from 'react-router-dom'
import bgVector from '../assets/bg_vector.png'
import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'

const Main = () => {
  return (
    <div className='main pt-6'>
      <div className='w-[98%] bg-[#fff] mx-auto rounded-md flex'>
        <Sidebar />
        <div className='py-6 px-10 bg-[#f3f3f7] w-[80%] rounded-tr-md rounded-br-md'>
          <Navbar />
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Main