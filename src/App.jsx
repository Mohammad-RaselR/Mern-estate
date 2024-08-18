import { BrowserRouter, Routes, Route } from "react-router-dom"


import Home from "./pages/Home"

import Profile from "./pages/Profile"

import About from "./pages/About"
import Signin from "./pages/Signin"
import Signout from "./pages/Signout"

export default function App(){
  return <BrowserRouter>
  
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/about" element={<About />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="/signout" element={<Signout />} />
    </Routes>
  
  </BrowserRouter>
  
    
  
  
}