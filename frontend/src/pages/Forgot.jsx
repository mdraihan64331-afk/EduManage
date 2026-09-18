import React, { useState } from 'react'
import loginImage from "../assets/login-hero-image.png"
import logoimage from '../assets/login-logo.png'
import { LuShieldCheck } from "react-icons/lu";
import { FaArrowLeft } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { MdOutlineLock, MdOutlineMail } from "react-icons/md";
import axios from 'axios';
import { serverURL } from '../App';
import { ClipLoader } from 'react-spinners'
import { IoIosSend } from "react-icons/io";
import { FaRegCheckCircle } from "react-icons/fa";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

function Forgot() {
  const navigate = useNavigate()
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [email, setEmail] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState(1)
  const [otp, setOtp] = useState("")
  const [error, setError] = useState("")

  const handleSentOtp = async () => {
    setLoading(true)
    try {
      const result = await axios.post(`${serverURL}/api/auth/sent-otp`, {
        email
      }, { withCredentials: true })
      setStep(2)
      setLoading(false)
      setError("")
    } catch (error) {
      console.log(error)
      setLoading(false)
      setError(error.response.data.message)
    }
  }

  const handleVerifyOtp = async () => {
    setLoading(true)
    try {
      const result = await axios.post(`${serverURL}/api/auth/verify-otp`, {
        email, otp
      }, { withCredentials: true })
      setStep(3)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  const handleForgotPassword = async () => {
    setLoading(true)
    if (newPassword != confirmPassword) {
      return null
    }
    try {
      const result = await axios.post(`${serverURL}/api/auth/forgot-password`, {
        email, newPassword
      }, { withCredentials: true })
      setLoading(false)
      navigate("/sign-in")
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }


  return (
    <div className='flex justify-center items-center h-[100vh] p-3 md:p-10 my-15 md:my-0'>
      <div className='md:flex md:flex-none justify-center bg-white shadow-lg shadow-gray-400 rounded-xl'>
        {/* image  */}
        <div className='relative w-full md:w-[700px] h-full'>
          <img src={loginImage} alt="" className='rounded-xl' />
          <div className='px-5 md:px-10 absolute top-3'>
            <div className='flex items-center'>
              <div className='w-10 md:w-15'>
                <img src={logoimage} alt="" className='' />
              </div>
              <div>
                <h1 className='md:text-2xl font-bold text-green-600'>Edu<span className='text-black'>Manage</span></h1>
                <p className='xt-xs md:text-2xs'>School Management System</p>
              </div>
            </div>
            <div>
              <h1 className="font-['Idiqlat'] font-extralight text-3xl md:text-5xl font-bold">Forgot Password?</h1>
              <p className="md:mt-2">No worries! Enter your email address and</p>
              <p className="md:mb-4">we'll send you a reset link.</p>
            </div>
          </div>
          <div className="absolute bottom-6 md:bottom-8 left-4 md:left-8 -rotate-[10deg] text-white batter-edu">
            <h3 className=" text-xs md:text-xl italic font-semibold">
              Better Education
            </h3>

            <h3 className=" text-xs md:text-xl italic font-semibold">
              Brighter Future
            </h3>

            <div className="mt-1 ml-1 md:ml-5 h-[2px] w-16 md:w-24 rotate-[-5deg] bg-white"></div>
          </div>
        </div>
        <div className='md:w-[500px] p-3 md:p-10'>
          <div className='flex justify-between'>
            <div className='flex items-center'>
              <div className='w-10 md:w-15'>
                <img src={logoimage} alt="" className='t' />
              </div>
              <div>
                <h1 className='text-2xl font-bold text-green-600'>Edu<span className='text-black'>Manage</span></h1>
                <p className='text-xs md:text-2xs'>School Management System</p>
              </div>
            </div>
            <div className='flex gap-2 items-center cursor-pointer text-gray-600' onClick={() => navigate("/sign-in")}>
              <FaArrowLeft />
              <p>Back to Sign in</p>
            </div>
          </div>
          <div className='mt-3 mb-3'>
            <h1 className='text-2xl font-bold'>Reset Your Password</h1>
            <p className='text-gray-600'>Enter your email address and we'll send you</p>
            <p className='text-gray-600'>a link to reset your password.</p>
          </div>

          {/* Email */}

          {step == 1 &&
            <>
              <div className='flex flex-col gap-3 mt-2'>
                <label htmlFor="">Email / User ID</label>
                <div className='flex items-center border gap-4 border-gray-300 p-2 rounded-[7px]'>
                  <MdOutlineMail size={20} />
                  <input type="text" value={email} placeholder='Enter your email or user ID' className='outline-none w-full' onChange={(e) => setEmail(e.target.value)} required />
                </div>
              </div>

              {/* error */}

              {error && <>
                <p className='text-red-500 my-3 flex justify-center items-center gap-3'>*{error}</p>
              </>}

              {/* Send Reset Link */}
              <button className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-green-600 via-teal-500 to-cyan-600 flex justify-center items-center gap-3 cursor-pointer mt-4" onClick={handleSentOtp} disabled={loading}>{loading ? <ClipLoader color='white' /> : <><IoIosSend size={28} />Send Reset Link</>}</button>

              {/* loading */}

              {loading && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm">

                  {/* Loading Card */}
                  <div className="w-[90%] max-w-[520px] rounded-3xl bg-white px-8 py-10 sm:px-12 shadow-2xl text-center">

                    {/* Spinner + Logo */}
                    <div className="relative mx-auto mb-7 flex h-44 w-44 items-center justify-center">

                      {/* Spinner */}
                      <div className="absolute inset-0 rounded-full border-[12px] border-slate-200 border-t-green-500 border-r-cyan-500 animate-spin"></div>

                      {/* Logo Circle */}
                      <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-green-50 to-blue-50">
                        <img
                          src={logoimage}
                          alt="EduManage"
                          className="h-20 w-20 object-contain"
                        />
                      </div>

                    </div>

                    {/* Title */}
                    <h2 className="text-3xl font-bold text-[#102A5C]">
                      Please wait...
                    </h2>

                    {/* Description */}
                    <p className="mt-3 text-base text-slate-500">
                      We are logging you into your account.
                    </p>
                  </div>
                </div>
              )}
            </>
          }

          {step == 2 &&
            <>
              <div className='flex flex-col gap-3 mt-2'>
                <label htmlFor="">OTP</label>
                <div className='flex items-center border gap-4 border-gray-300 p-2 rounded-[7px]'>
                  <FaRegCheckCircle size={20} />
                  <input type="text" placeholder='Enter your OTP' className='outline-none w-full' value={otp} required onChange={(e) => setOtp(e.target.value)} />
                </div>
              </div>

              {/* error */}

              {error && <>
                <p className='text-red-500 my-3 flex justify-center items-center gap-3'>*{error}</p>
              </>}

              {/* Veryfy OTP */}

              <button className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-green-600 via-teal-500 to-cyan-600 flex justify-center items-center gap-3 cursor-pointer mt-4" onClick={handleVerifyOtp} disabled={loading}>{loading ? <ClipLoader color='white' /> : <><IoIosSend size={28} />Veryfy OTP</>}</button>

              {/* loading */}

              {loading && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm">

                  {/* Loading Card */}
                  <div className="w-[90%] max-w-[520px] rounded-3xl bg-white px-8 py-10 sm:px-12 shadow-2xl text-center">

                    {/* Spinner + Logo */}
                    <div className="relative mx-auto mb-7 flex h-44 w-44 items-center justify-center">

                      {/* Spinner */}
                      <div className="absolute inset-0 rounded-full border-[12px] border-slate-200 border-t-green-500 border-r-cyan-500 animate-spin"></div>

                      {/* Logo Circle */}
                      <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-green-50 to-blue-50">
                        <img
                          src={logoimage}
                          alt="EduManage"
                          className="h-20 w-20 object-contain"
                        />
                      </div>

                    </div>

                    {/* Title */}
                    <h2 className="text-3xl font-bold text-[#102A5C]">
                      Please wait...
                    </h2>

                    {/* Description */}
                    <p className="mt-3 text-base text-slate-500">
                      We are logging you into your account.
                    </p>
                  </div>
                </div>
              )}
            </>
          }

          {/* Password */}

          {step == 3 &&
            <>
              <div className='mt-2'>

                {/* new password */}

                <label htmlFor="">New Password</label>
                <div className='relative flex items-center border gap-4 border-gray-300 p-2 rounded-[7px] mt-2 '>
                  <MdOutlineLock size={20} />
                  <input type={`${showNewPassword ? "text" : "password"}`} placeholder='Enter your password' value={newPassword} className='outline-none w-full' onChange={(e) => setNewPassword(e.target.value)} />
                  <button className='absolute right-2 top-3 cursor-pointer' onClick={() => setShowNewPassword(prev => !prev)}>{!showNewPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}</button>
                </div>

                {/* confirm password */}

                <label htmlFor="">Confirm Password</label>
                <div className='relative flex items-center border gap-4 border-gray-300 p-2 rounded-[7px] mt-2 '>
                  <MdOutlineLock size={20} />
                  <input type={`${showConfirmPassword ? "text" : "password"}`} placeholder='Enter your password' value={confirmPassword} className='outline-none w-full' onChange={(e) => setConfirmPassword(e.target.value)} />
                  <button className='absolute right-2 top-3 cursor-pointer' onClick={() => setShowConfirmPassword(prev => !prev)}>{!showConfirmPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}</button>
                </div>
              </div>

              {/* error */}

              {error && <>
                <p className='text-red-500 my-3 flex justify-center items-center gap-3'>*{error}</p>
              </>}

              {/* Reset Password */}

              <button className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-green-600 via-teal-500 to-cyan-600 flex justify-center items-center gap-3 cursor-pointer mt-4" onClick={handleForgotPassword} disabled={loading}>{loading ? <ClipLoader color='white' /> : <><IoIosSend size={28} />Reset Password</>}</button>

              {/* loading */}

              {loading && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm">

                  {/* Loading Card */}
                  <div className="w-[90%] max-w-[520px] rounded-3xl bg-white px-8 py-10 sm:px-12 shadow-2xl text-center">

                    {/* Spinner + Logo */}
                    <div className="relative mx-auto mb-7 flex h-44 w-44 items-center justify-center">

                      {/* Spinner */}
                      <div className="absolute inset-0 rounded-full border-[12px] border-slate-200 border-t-green-500 border-r-cyan-500 animate-spin"></div>

                      {/* Logo Circle */}
                      <div className="flex h-28 w-28 items-center justify-center rounded-full bg-gradient-to-br from-green-50 to-blue-50">
                        <img
                          src={logoimage}
                          alt="EduManage"
                          className="h-20 w-20 object-contain"
                        />
                      </div>

                    </div>

                    {/* Title */}
                    <h2 className="text-3xl font-bold text-[#102A5C]">
                      Please wait...
                    </h2>

                    {/* Description */}
                    <p className="mt-3 text-base text-slate-500">
                      We are logging you into your account.
                    </p>
                  </div>
                </div>
              )}
            </>
          }


          <div className='my-4 flex justify-center items-center gap-3'>
            <div className='h-[1px] w-full bg-gray-200'></div>
            <div className='text-gray-600'>OR</div>
            <div className='h-[1px] w-full bg-gray-200'></div>
          </div>

          {/* back to sign in */}

          <div className='flex gap-2 justify-center items-center cursor-pointer text-gray-600' onClick={() => navigate("/sign-in")}>
            <FaArrowLeft className='text-blue-500' />
            <p>Back to Sign in</p>
          </div>


          {step == 1 &&
            <div className='flex items-center gap-4 bg-green-50 mt-6 px-5 py-3 rounded-xl'>
              <div>
                <LuShieldCheck size={30} className='text-green-600' />
              </div>
              <div>
                <h4 className='font-semibold md:text-xl '>Check your email</h4>
                <p className='text-gray-600 md:text-[16px] text-xs'>We'll send a password reset link to you inbox </p>
                <p className='text-gray-600 md:text-[16px] text-xs'>within a few minutes</p>
              </div>
            </div>}
          {step == 2 &&
            <div className='flex items-center gap-4 bg-green-50 mt-6 px-5 py-3 rounded-xl'>
              <div>
                <LuShieldCheck size={30} className='text-green-600' />
              </div>
              <div>
                <h4 className='font-semibold md:text-xl'>Check your OTP</h4>
                <p className='text-gray-600 md:text-[16px] text-xs'>We'll send a password reset link to you inbox </p>
                <p className='text-gray-600 md:text-[16px] text-xs'>with in a few minutes</p>
              </div>
            </div>}
          {step == 3 &&


            <div className='flex items-center gap-4 bg-green-50 mt-6 px-5 py-3 rounded-xl'>
              <div>
                <LuShieldCheck size={30} className='text-green-600' />
              </div>
              <div>
                <h4 className='font-semibold md:text-xl'>Check your Password</h4>
                <p className='text-gray-600 md:text-2xs text-xs'>We'll send a password reset link to you inbox </p>
                <p className='text-gray-600 md:text-2xs text-xs'>with in a few minutes</p>
              </div>
            </div>}
        </div>
      </div>
    </div>
  )
}

export default Forgot
