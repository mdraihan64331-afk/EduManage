import React from 'react'
import loginImage from "../assets/login-hero-image.png"
import logoimage from '../assets/login-logo.png'
import { BsFillPeopleFill } from "react-icons/bs";
import { RiBookMarkedFill } from "react-icons/ri";
import { MdSpatialTracking } from "react-icons/md";
import { TbMessageReportFilled } from "react-icons/tb";

function Signin() {
    return (
        <div className='flex justify-center items-center p-5'>
            <div className='h-[100vh] bg-cover bg-center' style={{ backgroundImage: `url(${loginImage})` }}>
                <div className='px-20 py-8'>
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
                            <div className=' p-3 bg-blue-500 rounded-xl'>
                                <BsFillPeopleFill size={20} className='text-white' />
                            </div>
                            <div>
                                <p>Student</p>
                                <p>Management</p>
                            </div>
                        </div>
                        <div className='flex justify-center items-center gap-3 '>
                            <div className=' p-3 bg-green-500 rounded-xl'>
                                <RiBookMarkedFill size={20} className='text-white' />
                            </div>
                            <div>
                                <p>Result</p>
                                <p>Management</p>
                            </div>
                        </div>
                        <div className='flex justify-center items-center gap-3 '>
                            <div className=' p-3 bg-purple-400 rounded-xl'>
                                <MdSpatialTracking size={20} className='text-white' />
                            </div>
                            <div>
                                <p>Attendance</p>
                                <p>Tracking</p>
                            </div>
                        </div>
                        <div className='flex justify-center items-center gap-3 '>
                            <div className=' p-3 bg-orange-400 rounded-xl'>
                                <TbMessageReportFilled size={20} className='text-white' />
                            </div>
                            <div>
                                <p>Reports</p>
                                <p>& Analytics</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
                <div>
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
                        <h1>Login to Your Account</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signin
