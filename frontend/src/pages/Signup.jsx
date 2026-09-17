import React, { useState } from 'react'
import loginImage from "../assets/login-hero-image.png"
import logoimage from '../assets/login-logo.png'
import { BsFillPeopleFill } from "react-icons/bs";
import { RiBookMarkedFill } from "react-icons/ri";
import { MdSpatialTracking } from "react-icons/md";
import { TbMessageReportFilled } from "react-icons/tb";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa6";
import { FcGoogle } from "react-icons/fc";
import { useNavigate } from 'react-router-dom';
import { MdOutlineMail } from "react-icons/md";
import { MdOutlineLock } from "react-icons/md";
import { MdOutlinePersonOutline } from "react-icons/md";
import axios from "axios"
import { serverURL } from '../App';
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from '../../firebase'
import { ClipLoader } from "react-spinners"

function Signup() {
    const navigate = useNavigate()
    const [role, setRole] = useState("Student/Guardian")
    const [showPassword, setShowPassword] = useState(false)
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const handelSignup = async () => {
        setLoading(true)
        try {
            const result = await axios.post(`${serverURL}/api/auth/sign-up`, {
                fullName,
                role,
                email,
                password
            }, { withCredentials: true })
            if (email == "admin1234@gmail.com" && password == "admin1234" && role == "admin") {
                navigate("/admin-dashboard")
            } else {
                navigate("/")
            }
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    const googleAuth = async () => {
        const provider = new GoogleAuthProvider()
        const result = await signInWithPopup(auth, provider)
        try {
            const { data } = await axios.post(`${serverURL}/api/auth/google-auth`, {
                fullName: result.user.displayName,
                email: result.user.email,
                role
            }, { withCredentials: true })
            navigate("/")
            console.log(data)
        } catch (error) {
            console.log("Backend Response:", error.response?.data)
        }
    }

    return (
        <div className='flex justify-center items-center h-[100vh] p-10'>
            <div className='flex justify-center bg-white shadow-lg shadow-gray-400 rounded-xl'>
                {/* image */}
                <div className='relative w-[70%]'>
                    <img src={loginImage} alt="" className='rounded-xl' />
                    <div className='px-10 absolute top-3'>
                        <div className='flex items-center'>
                            <div className=' w-15'>
                                <img src={logoimage} alt="" className='t' />
                            </div>
                            <div>
                                <h1 className='text-2xl font-bold text-green-600'>Edu<span className='text-black'>Manage</span></h1>
                                <p className=''>School Management System</p>
                            </div>
                        </div>
                        <div>
                            <h1 className="font-['Idiqlat'] font-extralight text-5xl font-bold">Welcome Back!</h1>
                            <p className="mt-2">Sign in to your account and continue </p>
                            <p className="mb-4">your educational journey.</p>
                        </div>
                        <div className='flex  justify-center items-center gap-5 bg-white p-3 rounded-xl'>
                            <div className='flex justify-center items-center gap-3 '>
                                <div className=' p-2 bg-blue-500 rounded-xl'>
                                    <BsFillPeopleFill size={20} className='text-white' />
                                </div>
                                <div>
                                    <p>Student</p>
                                    <p>Management</p>
                                </div>
                            </div>
                            <div className='flex justify-center items-center gap-3 '>
                                <div className=' p-2 bg-green-500 rounded-xl'>
                                    <RiBookMarkedFill size={20} className='text-white' />
                                </div>
                                <div>
                                    <p>Result</p>
                                    <p>Management</p>
                                </div>
                            </div>
                            <div className='flex justify-center items-center gap-3 '>
                                <div className=' p-2 bg-purple-400 rounded-xl'>
                                    <MdSpatialTracking size={20} className='text-white' />
                                </div>
                                <div>
                                    <p>Attendance</p>
                                    <p>Tracking</p>
                                </div>
                            </div>
                            <div className='flex justify-center items-center gap-3 '>
                                <div className=' p-2 bg-orange-400 rounded-xl'>
                                    <TbMessageReportFilled size={20} className='text-white' />
                                </div>
                                <div>
                                    <p>Reports &</p>
                                    <p>Analytics</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="absolute bottom-8 left-8 -rotate-[10deg] text-white batter-edu">
                        <h3 className=" text-xl italic font-semibold">
                            Better Education
                        </h3>

                        <h3 className=" text-xl italic font-semibold">
                            Brighter Future
                        </h3>

                        <div className="mt-1 ml-5 h-[2px] w-24 rotate-[-5deg] bg-white"></div>
                    </div>
                </div>
                <div className='w-[50%] p-3'>
                    <div className='flex justify-between'>
                        <div className='flex items-center'>
                            <div className=' w-15'>
                                <img src={logoimage} alt="" className='t' />
                            </div>
                            <div>
                                <h1 className='text-2xl font-bold text-green-600'>Edu<span className='text-black'>Manage</span></h1>
                                <p className=''>School Management System</p>
                            </div>
                        </div>
                        <div className='flex gap-2 items-center cursor-pointer text-gray-600' onClick={() => navigate("/")}>
                            <FaArrowLeft />
                            <p>Back to Home</p>
                        </div>
                    </div>
                    <div className='mt-3 mb-3'>
                        <h1 className='text-2xl font-bold'>Create Your Account</h1>
                        <p className='text-gray-600'>Fill in the details below to get started with EduManage.</p>
                    </div>

                    {/* Role */}
                    <div className='flex gap-3'>
                        {["Student/Guardian", "Admin"].map((r, index) => (
                            <>
                                <div key={index} className='px-5 py-2 border border-gray-300 rounded-[7px]  cursor-pointer w-full text-center' onClick={() => setRole(r)} style={role == r ? { background: "#eaf6ee", border: "1px solid #10B981", color: "green" } : { background: "#fff" }}>{r}</div>
                            </>
                        ))}
                    </div>

                    {/* Full Name */}

                    <div className='flex flex-col gap-3 mt-3'>
                        <label htmlFor="">Full Name</label>
                        <div className='flex items-center border gap-4 border-gray-300 p-2 rounded-[7px]'>
                            <MdOutlinePersonOutline size={20} />
                            <input type="text" placeholder='Enter your full name' className='outline-none w-full' onChange={(e) => setFullName(e.target.value)} />
                        </div>
                    </div>

                    {/*Email  */}

                    <div className='flex flex-col gap-3 mt-2'>
                        <label htmlFor="">Email / User ID</label>
                        <div className='flex items-center border gap-4 border-gray-300 p-2 rounded-[7px]'>
                            <MdOutlineMail size={20} />
                            <input type="text" placeholder='Enter your email or user ID' className='outline-none w-full' onChange={(e) => setEmail(e.target.value)} />
                        </div>
                    </div>

                    {/* Password */}

                    <div className='mt-2'>
                        <label htmlFor="">Password</label>
                        <div className='relative flex items-center border gap-4 border-gray-300 p-2 rounded-[7px] mt-2 '>
                            <MdOutlineLock size={20} />
                            <input type={`${showPassword ? "text" : "password"}`} placeholder='Enter your password' className='outline-none w-full' onChange={(e) => setPassword(e.target.value)} />
                            <button className='absolute right-2 top-3 cursor-pointer' onClick={() => setShowPassword(prev => !prev)}>{!showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}</button>
                        </div>
                    </div>

                    {/* login */}

                    <button className="w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-green-600 via-teal-500 to-cyan-600 flex justify-center items-center gap-3 cursor-pointer mt-4" onClick={handelSignup} disabled={loading}>{loading ? <ClipLoader color='white' /> : <><FaArrowRight />Login</>}</button>

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

                    <div className='my-4 flex justify-center items-center gap-3'>
                        <div className='h-[1px] w-full bg-gray-200'></div>
                        <div className='text-gray-600'>OR</div>
                        <div className='h-[1px] w-full bg-gray-200'></div>
                    </div>

                    {/* google auth */}

                    <button className='flex justify-center items-center w-full border border-gray-200 rounded-xl py-3 cursor-pointer gap-3' onClick={googleAuth}><FcGoogle size={24} /> Continue with Google</button>

                    <div className='text-center mt-5'>
                        <p>Don't have an account? <span onClick={() => navigate("/sign-in")} className='text-green-600 cursor-pointer'>Sign In</span></p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup
