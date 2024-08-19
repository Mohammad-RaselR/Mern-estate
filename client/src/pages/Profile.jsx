import React from 'react'
import { useSelector } from 'react-redux'

export default function Profile() {
  const {currentUser}= useSelector((state)=>state.user); 
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl my-7 font-semibold text-center'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <img src={currentUser.avatar} className='rounded-full w-24 h-24 self-center object-cover cursor-pointer mt-2 ' alt="profile" />
        <input type="text" placeholder='Username' id='username' className='border p-3 rounded-lg'/>
        <input type="email" placeholder='Email' id='emaili' className='border p-3 rounded-lg'/>
        <input type="password" placeholder='Password' id='password' className='border p-3 rounded-lg'/>
        <button className='bg-slate-700 text-white rounded-lg p-3 uppercase text-center hover:opacity-95'>
          Update
        </button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-700 cursor-pointer'>
          Delete Account
          </span>
          <span className='text-red-700 cursor-pointer'> 
            Sign Out
          </span>
      </div>


    </div>
  )
}
