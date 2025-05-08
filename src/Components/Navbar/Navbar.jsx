import React, { useContext } from 'react'; // Changed 'use' to 'useContext'
import logo from '../../assets/logo.png';
import { NavLink, useNavigate } from 'react-router-dom'; // Added useNavigate
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2'; // Import SweetAlert2

export const Navbar = () => {
    const { user, logOut, setLoading } = useContext(AuthContext); // Added setLoading (optional)
    const navigate = useNavigate(); // For redirecting after logout


    const handlePfpSetting = () => {
        Swal.fire({
            icon: 'info',
            title: 'Settings - Coming Soon!',
            text: 'This feature is currently under development and has not been implemented yet. Please check back later!',
            confirmButtonText: 'Got it!',
            // You can add more Swal options here if needed, e.g., custom class, footer, etc.
        });
    };

    const handleLogOut = () => {
        if (setLoading) setLoading(true); // Optional: indicate loading starts
        logOut()
            .then(() => {
                Swal.fire({
                    icon: 'success',
                    title: 'Logged Out',
                    text: 'You have been successfully logged out.',
                    showConfirmButton: false,
                    timer: 1500 // Auto-close after 1.5 seconds
                });
                navigate('/login'); // Redirect to login page after successful logout
            })
            .catch((error) => {
                console.error('Error logging out:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Logout Failed',
                    text: error.message || 'An error occurred while logging out. Please try again.',
                });
            })
            .finally(() => {
                if (setLoading) setLoading(false); // Optional: indicate loading ends
            });
    };

    const activeClass = 'btn text-white font-bold p-3 px-[15px] border-black rounded-2xl bg-purple-500';
    const defaultClass = 'btn p-3 px-[15px] border-black rounded-2xl';
    // For the logout button, we might not want NavLink styling if it's not a route link
    const logoutButtonClass = 'btn p-3 px-[15px] border-black rounded-2xl hover:bg-red-500 hover:text-white'; 

    return (
        <div className="navbar bg-base-100 shadow-sm px-[20px] sticky top-0 z-50"> {/* Added sticky top & z-index */}
            <div className="navbar-start"> {/* Use navbar-start for left section */}
                <NavLink to='/' className={'btn btn-ghost normal-case text-xl flex items-center gap-2 p-0 bg-transparent shadow-none border-none'}> {/* Simplified logo link */}
                    <img src={logo} className='w-[40px] h-auto' alt="AppStore Logo" /> {/* Added h-auto for aspect ratio */}
                    <span>AppStore</span> {/* Use span for better semantics with text */}
                </NavLink>
            </div>
            <div className="navbar-center hidden lg:flex"> {/* For desktop menu items, hidden on small screens */}
                <ul className="menu menu-horizontal px-1 gap-2">
                    <li>
                        <NavLink to='/apps' className={({ isActive }) => isActive ? activeClass : defaultClass}>
                            Apps
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to='/faq' className={({ isActive }) => isActive ? activeClass : defaultClass}> {/* Assuming /faq route exists */}
                            FAQ
                        </NavLink>
                    </li>
                    {/* Add more links here if needed */}
                </ul>
            </div>
            <div className="navbar-end gap-2"> {/* Use navbar-end for right section */}
                {user ? (
                    <>
                        <button onClick={handleLogOut} className={logoutButtonClass}> {/* Custom class for logout */}
                            Logout
                        </button>
                        <div className="dropdown dropdown-end">
                            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                                <div className="w-10 rounded-full ring ring-purple-500 ring-offset-base-100 ring-offset-2"> {/* Added a ring for better visibility */}
                                    <img
                                        alt="User avatar"
                                        src={user?.photoURL || "https://img.icons8.com/?size=96&id=z-JBA_KtSkxG&format=png"}
                                        onError={(e) => { // Fallback for broken image URLs
                                            e.target.onerror = null; 
                                            e.target.src="https://img.icons8.com/?size=96&id=z-JBA_KtSkxG&format=png";
                                        }}
                                    />
                                </div>
                            </div>
                            <ul
                                tabIndex={0}
                                // DaisyUI uses z-[1] for dropdown content to ensure it's above other elements
                                className="menu menu-sm dropdown-content mt-3 z-[51] p-2 shadow bg-base-100 rounded-box w-52"> 
                                <li className="p-2 font-semibold text-center border-b mb-1">{user.displayName || user.email}</li> {/* Display user name/email */}
                                <li>
                                    <NavLink to='/profile' className="justify-between">
                                        My Profile
                                    </NavLink>
                                </li>
                                <li><button onClick={handlePfpSetting}>Settings</button></li> {/* Placeholder */}
                                {/* <li className='mt-2'>
                                    <button onClick={handleLogOut} className="btn btn-sm btn-error text-white w-full">
                                        Logout (in dropdown)
                                    </button>
                                </li> */}
                            </ul>
                        </div>
                    </>
                ) : (
                    <NavLink to='/login' className={({ isActive }) => isActive ? activeClass : defaultClass}>
                        Login
                    </NavLink>
                )}
                {/* Hamburger for mobile - example, needs actual dropdown logic if not using DaisyUI's default */}
                <div className="dropdown dropdown-end lg:hidden">
                    <div tabIndex={0} role="button" className="btn btn-ghost">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[51] p-2 shadow bg-base-100 rounded-box w-52">
                        <li><NavLink to='/apps'>Apps</NavLink></li>
                        <li><NavLink to='/faq'>FAQ</NavLink></li>
                        {/* Add more mobile links here, conditionally show Login/Profile */}
                        {user && <li><NavLink to='/profile'>Profile</NavLink></li>}
                    </ul>
                </div>
            </div>
        </div>
    );
};