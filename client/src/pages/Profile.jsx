// import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef , useState} from "react";
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import {app} from "../firebase";
import {
  updateUserStart, updateUserFailure,
   updateUserSuccess, deleteUserFailure, 
  deleteUserStart, deleteUserSuccess,
signOutUserFailure, signOutUserStart, signOutUserSuccess} from "../redux/user/userSlice"
import { Link } from "react-router-dom";
export default function Profile() {
  const fileRef = useRef();
  const { currentUser , error, loading} = useSelector((state) => state.user);
  const [file, setFile]= useState(undefined); 
  const [filePerc, setFilePerc]= useState(0); 
  const [fileError, setFileError]= useState(false);
  const [formData, setFormData]= useState({});
  const [updateSuccess, setUpdateSuccess]=useState(false);
  const [showListingError, setShowListingError]= useState(false); 
  const [userListing, setUserListing]= useState([]); 
  
  const dispatch= useDispatch(); 
  console.log(file); 

  console.log(formData); 
  useEffect(()=>{
    if(file){
      handleUploadFile(file); 
    }
  },[file]); 

  const handleUploadFile=(file)=>{
      const storage= getStorage(app);
      const fileName=new Date().getTime()+ file.name; 
      const storageRef= ref(storage, fileName )
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on("state_changed", (snapshot) => {
        const progress = (snapshot.bytesTransferred /snapshot.totalBytes)*100;
       setFilePerc(Math.round(progress)); 
      //  setFormData(...formData)
      },
      (error)=>{
        setFileError(true); 
      },
      ()=>{
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl)=>{
            setFormData({...formData, avatar: downloadUrl})
        }); 
      });
  }

  //      firebase Storage
  //     allow read;
  //     allow write :if
  //     request.resource.size<2*1024*1024 &&
  //     request.resource.contentType.matches('image/.*')
  const handleChange=(e)=>{
    setFormData({...formData, [e.target.id]: e.target.value});  // update form data state
  }
  const handleSubmit= async (e)=>{
    e.preventDefault(); 
    setUpdateSuccess(false); 
    try{
      dispatch(updateUserStart());
      const res= await fetch(`/api/user/update/${currentUser._id}`,{
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(formData)
          });
          const data= await res.json();
          if(data.success===false){
            dispatch(updateUserFailure(data.message));
            return; 
          }
          dispatch(updateUserSuccess(data));
          setUpdateSuccess(true); 
       
        

    }
    catch(error){
        dispatch(updateUserFailure(error.message));
    }
    // firebase authentication
    // firebase database 
  }
  const handleDeleteUser= async ()=>{
      
      try{
        dispatch(deleteUserStart());
        const res= await fetch(`/api/user/delete/${currentUser._id}`,{
            method: 'DELETE',
           
          });
          const data= await res.json();
          if(data.success===false){
            dispatch(deleteUserFailure(data.message));
            return; 
          }
          dispatch(deleteUserSuccess(data)); 

    }catch(error){
      dispatch(deleteUserFailure(error.message));
    }
  }
  const handleSignOut=async()=>{
    try{
      dispatch(signOutUserStart());
     const res=  await fetch('/api/auth/sign-out');
     const data= res.json();
     if(data.success===false){ 

      dispatch(signOutUserFailure(data.message));
     }
      dispatch(signOutUserSuccess(data));
  
    }
    catch(error){
      dispatch(signOutUserFailure(error.message));
    }
  }

  const showListing= async()=>{
    try{

    }
    catch(e){
      setShowListingError(true); 
    }
  }
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl my-7 font-semibold text-center">Profile</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/*" />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          className="rounded-full w-24 h-24 self-center object-cover cursor-pointer mt-2 "
          alt="profile"
        />
        <p className="self-center">
          {fileError ? <span className="text-red-700">
            Error Image Upload 
          </span> : filePerc>0 && filePerc<100 ? (
            <span className="text-blue-700">
              {filePerc}% uploaded...
            </span> ): filePerc==100? (
              <span className="text-green-700">
                File Uploaded Successfully!
              </span>
            ): " "
          }
        </p>
        <input
          type="text"
          placeholder="Username"
          id="username" defaultValue={currentUser.username}
          className="border p-3 rounded-lg" onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          id="email" defaultValue={currentUser.email}
          className="border p-3 rounded-lg" onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border p-3 rounded-lg" onChange={handleChange}
        />
        <button 
        disabled={loading}
        className="bg-slate-700 text-white rounded-lg p-3 uppercase text-center hover:opacity-95">
          {loading ? "loading...": "Update"}
        </button>
        <Link
          className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95'
          to={'/create-listing'}
        >
          Create Listing
        </Link>
      </form>
      <div className="flex justify-between mt-5">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer">Delete Account</span>
        <span onClick={handleSignOut} className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
      <p className="text-red-700 mt-5">{error ? error : ""}</p>
      <p className="text-green-700 mt-5">
        {updateSuccess ? "User is Updated Successfully!" : ""}
      </p>
      <button onClick={showListing} className="text-green-700  w-full">Show Listing</button>
      <p className="text-red-700 mt-5">{showListingError? 'Error showing Listings ': ""}</p>
    </div>
  );
}
