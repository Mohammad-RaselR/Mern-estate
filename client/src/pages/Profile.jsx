// import React from "react";
import { useSelector } from "react-redux";
import { useEffect, useRef , useState} from "react";
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from "firebase/storage";
import {app} from "../firebase";

export default function Profile() {
  const fileRef = useRef();
  const { currentUser } = useSelector((state) => state.user);
  const [file, setFile]= useState(undefined); 
  const [filePerc, setFilePerc]= useState(0); 
  const [fileError, setFileError]= useState(false);
  const [formData, setFormData]= useState({});
  console.log(file); 
  console.log(filePerc); 
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
  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl my-7 font-semibold text-center">Profile</h1>
      <form className="flex flex-col gap-4">
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
          id="username"
          className="border p-3 rounded-lg"
        />
        <input
          type="email"
          placeholder="Email"
          id="emaili"
          className="border p-3 rounded-lg"
        />
        <input
          type="password"
          placeholder="Password"
          id="password"
          className="border p-3 rounded-lg"
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 uppercase text-center hover:opacity-95">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-700 cursor-pointer">Delete Account</span>
        <span className="text-red-700 cursor-pointer">Sign Out</span>
      </div>
    </div>
  );
}
