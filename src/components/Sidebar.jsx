import React from 'react'
import { BiBook, BiHome, BiLibrary } from 'react-icons/bi'
import { CgProfile } from 'react-icons/cg'
import { NavLink } from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className=' py-6 px-10 w-[20%] min-h-[95vh]'>
        <h1 className=' text-3xl title tracking-wider'>Book<span className='text-[#393280] ml-1'>Wave</span></h1>
        <section className='mt-10 sidebar'>
            <NavLink className={({ isActive }) => isActive ? "text-[#1a1a1a] font-medium" : "text-[#5f5f5f]"} to="/" end><BiHome /><span className='ml-3'>Home</span></NavLink>
            <NavLink className={({ isActive }) => isActive ? "text-[#1a1a1a] font-medium" : "text-[#5f5f5f]"} to="/books"><BiBook /><span className='ml-3'>Books</span></NavLink>
            <NavLink className={({ isActive }) => isActive ? "text-[#1a1a1a] font-medium" : "text-[#5f5f5f]"} to="/mylibrary"><BiLibrary /><span className='ml-3'>My Library</span></NavLink>
            <NavLink className={({ isActive }) => isActive ? "text-[#1a1a1a] font-medium" : "text-[#5f5f5f]"} to="/profile"><CgProfile /><span className='ml-3'>My Profile</span></NavLink>
        </section>
    </div>
  )
}

export default Sidebar