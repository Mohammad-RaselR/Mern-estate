import { BrowserRouter, Routes, Route } from "react-router-dom"

import Header from "./components/Header"
import Home from "./pages/Home"
import Profile from "./pages/Profile"

import About from "./pages/About"
import Signin from "./pages/Signin"
import Signup from "./pages/Signup"
import PrivateRouter from "./components/PrivateRouter"

export default function App(){
  return <BrowserRouter>
    <Header/>
    <Routes>
      <Route path="/" element={<Home />} />
      
      <Route path="/about" element={<About />} />
      <Route path="/sign-in" element={<Signin />} />
      <Route path="/sign-up" element={<Signup />} />
      <Route element={<PrivateRouter />} >
      <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  
  </BrowserRouter>
  
    
  
  
}