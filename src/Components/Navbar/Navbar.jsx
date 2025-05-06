import React from 'react'
import logo from '../../assets/logo.png'
import { NavLink } from 'react-router-dom'

export const Navbar = () => {
    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="flex-1">
                <NavLink to='/'>
                    <div className='flex items-center gap-2'>
                        <img src={logo} className='w-[40px]' alt="" />
                        <a className="text-xl">AppStore</a>
                    </div>
                </NavLink>
            </div>
            <div className="flex gap-2">
                <NavLink to='/apps'><button className='btn p-3 px-[15px] border-black rounded-2xl'>Apps</button></NavLink>
                <NavLink to='/faq'><button className='btn p-3 px-[15px] border-black rounded-2xl'>FAQ</button></NavLink>
                <NavLink to='/login'><button className='btn p-3 px-[15px] border-black rounded-2xl'>Login</button></NavLink>
                <div className="dropdown dropdown-end">
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            <img
                                alt="Tailwind CSS Navbar component"
                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                        </div>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        <li>
                            <a className="justify-between">
                                Profile
                                <span className="badge">New</span>
                            </a>
                        </li>
                        <li><a>Settings</a></li>

                    </ul>
                </div>
            </div>
        </div>
    )
}
