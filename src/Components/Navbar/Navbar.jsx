import React, { use } from 'react'
import logo from '../../assets/logo.png'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../../Provider/AuthProvider';

export const Navbar = () => {
    const { user, logOut } = use(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(() => {
                console.log('User logged out successfully');
                alert('User logged out successfully');
            })
            .catch((error) => {
                console.error('Error logging out:', error);
            });
    }

    const activeClass = 'btn text-white font-bold p-3 px-[15px] border-black rounded-2xl bg-purple-500'; // Add active styles here
    const defaultClass = 'btn p-3 px-[15px] border-black rounded-2xl';

    return (
        <div className="navbar bg-base-100 shadow-sm px-[20px]">
            <div className="flex-1">
                <div className='flex items-center gap-2'>
                    <NavLink to='/' className={'btn bg-transparent border-none shadow-none flex items-center gap-2'}>
                        <img src={logo} className='w-[40px]' alt="" />
                        <p className="text-xl">AppStore</p>
                    </NavLink>
                </div>
            </div>
            <div className="flex gap-2">
                <NavLink to='/apps' className={({ isActive }) => isActive ? activeClass : defaultClass}>
                    Apps
                </NavLink>
                <NavLink to='/faq' className={({ isActive }) => isActive ? activeClass : defaultClass}>
                    FAQ
                </NavLink>
                {
                    user ? <button onClick={handleLogOut} className={defaultClass}>Logout</button>
                        :
                        <NavLink to='/login' className={({ isActive }) => isActive ? activeClass : defaultClass}>
                            Login
                        </NavLink>
                }
                {
                    user ? <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-10 rounded-full">
                                <img
                                    alt="User avatar"
                                    src={user?.photoURL || "https://img.icons8.com/?size=96&id=z-JBA_KtSkxG&format=png"}
                                />
                            </div>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                            <li>
                                <NavLink to='/profile'> <p className="justify-between">
                                    My Profile
                                </p></NavLink>
                            </li>
                            <li><a>Settings</a></li>
                        </ul>
                    </div> : ""
                }
            </div>
        </div>
    )
}
