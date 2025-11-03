
import React, { useContext } from 'react'
import Logo from "../assets/logo.png"
import { useNavigate } from 'react-router-dom'
import google from "../assets/google.png"
import { IoEyeOutline } from "react-icons/io5";
import { IoMdEye } from "react-icons/io";
import { useState } from 'react';
import { authDatacontext } from '../context/AuthContext';
import axios from 'axios'
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from '../../utils/Firebase';
import { userDataContext } from '../context/UserContext';

const Login = () => {
   let [show, setShow] = useState(false);
   let [email, setEmail] = useState("")
   let [password, setPassword] = useState("")
   let [error, setError] = useState("")
   let { serverUrl } = useContext(authDatacontext)
   let {getCurrentUser}= useContext(userDataContext)

   let navigate = useNavigate()

   const handleLogin = async (e) => {
      e.preventDefault()
      setError("") // Clear previous errors
      try {
         const result = await axios.post(
            `${serverUrl}/api/auth/login`,
            { email, password },
            {
               withCredentials: true,
               headers: {
                  'Content-Type': 'application/json'
               }
            }
         )
         getCurrentUser()
         navigate("/")
         console.log("Login successful:", result.data)
         
         // Add navigation after successful login if needed
         // navigate("/dashboard")
      } catch (error) {
         console.error("Login error:", error)
         if (error.response) {
            // The request was made and the server responded with a status code
            console.error("Server response data:", error.response.data)
            setError(error.response.data.message || "Login failed")
         } else if (error.request) {
            // The request was made but no response was received
            setError("No response from server")
         } else {
            // Something happened in setting up the request
            setError("Login request failed")
         }
      }
   }

     const googleLogin = async () => {
    try {
      const response = await signInWithPopup(auth,provider)
      let user = response.user;
      let name = user.displayName;
      let email = user.email

      const result = await axios.post(serverUrl + '/api/auth/googlelogin',{
        name, email
      },{withCredentials:true})
       getCurrentUser()
      navigate("/")
      console.log(result.data)

    } catch (error) {
      console.log(error)
    }
  }

   return (
      <div className='w-[100vw] h-[100vh] bg-gradient-to-b from-[#141414] to-[#0c2025] text-[white] flex flex-col items-center justify-start'>
         <div className='w-[100%] h-[80px] flex items-center justify-start px-[30px] gap-[10px] cursor-pointer'
            onClick={() => navigate("/")}>
            <img className='w-[40px]' src={Logo} alt='' />
            <h1 className='text-[22px] font-sans'>OneCart</h1>
         </div>
         <div className='w-[100%] h-[100px] flex items-center justify-center flex-col gap-[10px]'>
            <span className='text-[25px] font-semibold'>Login Page</span> {/* Changed from Registration */}
            <span className='text-[16px]'>Welcome to OneCart, Place your order</span>
         </div>
         {error && (
            <div className='w-[90%] max-w-[600px] p-2 bg-red-500 text-white rounded-md text-center'>
               {error}
            </div>
         )}
         <div className='max-w-[600px] w-[90%] h-[500px] bg-[#00000025] border-[1px] 
      border-[#96969635] backdrop:blur-2xl rounded-lg shadow-lg flex items-center justify-center'>
            <form onSubmit={handleLogin} className='w-[90%] h-[90%] flex flex-col items-center
        justify-start gap-[20px]'>
               <div className='w-[90%] h-[50px] bg-[#42656cae] rounded-lg flex items-center
            justify-center gap-[10px] py-[20px] cursor-pointer' onClick={googleLogin}>
                  <img src={google} alt='' className='w-[20px]' />Login with Google
               </div>
               <div className='w-[100%] h-[20px] flex items-center justify-center gap-[10px]'>
                  <div className='w-[40%] h-[1px] bg-[#96969635]'></div> OR <div className='w-[40%] h-[1px] bg-[#96969635]'></div>
               </div>
               <div className='w-[90%] h-[400px] flex flex-col items-center justify-center
            gap-[15px] relative'>
                  <input type='text' className='w-[100%] h-[50px] border-[2px] border-[#96969635]
                backdrop:blur-sm rounded-lg shadow-lg bg-transparent
                placeholder-[#ffffffcc] px-[20px] font-semibold' placeholder='Email'
                     required onChange={(e) => setEmail(e.target.value)} value={email} />
                  <input type={show ? "text" : "password"} className='w-[100%] h-[50px] border-[2px] border-[#96969635]
                backdrop:blur-sm rounded-lg shadow-lg bg-transparent
                placeholder-[#ffffffcc] px-[20px] font-semibold' placeholder='Password'
                     required onChange={(e) => setPassword(e.target.value)} value={password} />
                  {!show ? (
                     <IoEyeOutline className='w-[20px] h-[20px] cursor-pointer absolute 
                right-[5%] bottom-[56%]' onClick={() => setShow(prev => !prev)} />
                  ) : (
                     <IoMdEye className='w-[20px] h-[20px] cursor-pointer absolute right-[5%]
                bottom-[56%]' onClick={() => setShow(prev => !prev)} />
                  )}
                  <button type='submit' className='w-[100%] h-[50px] bg-[#6060f5] rounded-lg flex
                items-center justify-center mt-[20px] text-[17px] font-semibold'>
                     Login</button>
                  <p className='flex gap-[10px]'> You haven't any Account?
                     <span className='text-[#5555f6cf] text-[17px] font-semibold cursor-pointer'
                        onClick={() => navigate("/signup")}>Create New Account</span></p>
               </div>
            </form>
         </div>
      </div>
   )
}

export default Login