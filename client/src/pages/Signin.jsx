// import React from 'react'
import { Link , useNavigate} from 'react-router-dom'
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInStart, signInFailure, signInSuccess } from '../redux/user/userSlice';
export default function Signin() {
  const [formData, setFormData]= useState({}); 
  // const [error, setError]= useState(null); 
  // const [loading, setLoading]= useState(false); 
  const {error, loading}= useSelector((state)=> state.user)
  const navigate= useNavigate(); 
  const dispatch= useDispatch(); 

  const handleChange=(e)=>{
    setFormData ({
      ...formData,
      [e.target.id]: e.target.value
    });
  };
   const handleSubmit=async (e)=>{
    e.preventDefault(); 
    try{
      dispatch(signInStart()); 
    // form validation herecons
    const res= await fetch('api/auth/sign-in', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(formData)
    });
    const data= await res.json(); 
    if(data.success===false){
     dispatch(signInFailure(data.message)); 
      return;
    }
    dispatch(signInSuccess(data));
    navigate('/'); 
  
    }catch(error){
      dispatch(signInFailure(error.message));
    }
  }
    
  // console.log(formData); 
  return (
    <div className='p-3 max-w-lg mx-auto'>
     <h1 className='text-3xl text-center font-semibold my-7'>Sign Up</h1>
     <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
    
      <input type="email" placeholder='Email' className='border p-3 rounded-lg' id='email' onChange={handleChange}/>
      <input type="Password" placeholder='Password' onChange={handleChange} className='border p-3 rounded-lg' id='password' />
      <button disabled={loading} className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80'>{loading ? 'Loading...': "sign In " }</button>
     </form>
     <div className='flex gap-2 mt-4'>
      <p>Havent an Account?</p>
      <Link to={"/sign-up "}>
      <span className='text-blue-700'>Sign Up</span>
      </Link>
     </div>
     {error && <p className='text-red-500' >{error}</p>}
    </div>
  )
}
