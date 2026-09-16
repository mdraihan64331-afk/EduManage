import React from 'react'
import logoimage from '../assets/logo.png'
import { Link, NavLink, useNavigate } from "react-router-dom"
import axios from 'axios'
import { serverURL } from '../App'

function Navbar() {
    const navigate = useNavigate()

    const navList = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Features", path: "/features" },
        { name: "Notice", path: "/notice" },
        { name: "Contact", path: "/contact" },
    ]

    const handleLogOut = async () => {
        try {
            const result = await axios.get(`${serverURL}/api/auth/log-out`, { withCredentials: true })
            console.log(result)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='px-4 py-2 bg-white shadow-gray-100 shadow-xs flex justify-between items-center'>
            <Link to={"/"} className='cursor-pointer h-15 w-30'>
                <img src={logoimage} alt="" className='h-[100%] w-[100%]' />
            </Link>
            <div className='flex gap-8'>
                {navList.map((item, index) => (
                    <>
                        <NavLink key={index} to={item.path} className={({ isActive }) => ` transition ${isActive ? "text-green-600" : "hover:text-green-600"}`}>
                            {item.name}
                        </NavLink>
                    </>
                ))}
            </div>
            <div className='flex gap-5'>
                <button className='py-2 px-6 font-semibold bg-blue-800 text-white rounded-xl cursor-pointer' onClick={() => navigate("/sign-in")}>Login</button>
                <button className='py-2 px-6 font-semibold bg-blue-800 text-white rounded-xl cursor-pointer' onClick={handleLogOut}>Log Out</button>
            </div>
        </div>
    )
}

export default Navbar
