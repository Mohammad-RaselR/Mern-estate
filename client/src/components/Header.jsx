import { FaSearch } from "react-icons/fa"; 
// import { BiSearch } from "react-icons/bi"; 
// import { AiOutlineSearch } from "react-icons/ai"; 
// import React from 'react'
import { Link } from "react-router-dom";
import {useSelector} from 'react-redux'; 
export default function Header() {
  const {currentUser}= useSelector((state)=>state.user)

  return (
    <header className='bg-slate-200 shadow-md'>
        <div className='flex justify-between max-w-6xl mx-auto items-center p-3'>
            <Link to='/'>
        <h1 className='font-bold text-sm sm:text-xl flex flex-wrap '>
            <span className='text-slate-500'>Real</span>
            <span className='text-slate-700'>State</span>
        </h1>
        </Link>
        <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
      
            <input type="text" placeholder='Search.....' className='bg-transparent focus:outline-none w-24 sm:w-64'/>
          <FaSearch className="text-slate-600"/>
        </form>
        <ul className="flex gap-4">
            <Link to='/' className="hidden sm:inline text-slate-700 hover:underline ">Home</Link>
            <Link to='/about' className="hidden sm:inline text-slate-700 hover:underline ">About</Link>
            <Link to='/profile' className=" text-slate-700 hover:underline ">
            {currentUser ?(
              <img className="rounded-full h-8 w-8 object-contain"
              src={currentUser.avatar} alt="profile" />
            ):
            <li className=' text-slate-700 hover:underline'> Sign in</li>
          }
            </Link>
          
        </ul>
        </div>
       
    </header>
  )
}
