import { BrowserRouter, Routes, Route } from "react-router-dom"

import Header from "./components/Header"
import Home from "./pages/Home"

import Profile from "./pages/Profile"

import About from "./pages/About"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"

export default function App(){
  return <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/about" element={<About />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  
  </BrowserRouter>
  
    
  
  
}