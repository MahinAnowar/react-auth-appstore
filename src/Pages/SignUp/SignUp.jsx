import React from 'react'
import { NavLink } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";


export const SignUp = () => {
  return (
    <div>
        <h1 className='text-3xl font-bold text-center mt-10'>AppStore</h1>
        <div className="flex flex-col justify-center items-center py-10">
            <div className="card w-96 bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-center text-2xl font-bold">Sign Up</h2>
                    <form action="" className='flex flex-col gap-4'>
                        <input type="text" placeholder="Full Name" className="input input-bordered w-full max-w-xs" />
                        <input type="text" placeholder="Your Photo Url" className="input input-bordered w-full max-w-xs" />
                        <input type="email" placeholder="Email" className="input input-bordered w-full max-w-xs" />
                        <input type="password" placeholder="Password" className="input input-bordered w-full max-w-xs" />

                        <button className='btn btn-primary'>Sign Up</button>

                        <button className='btn btn-outline flex items-center justify-center gap-2'>
                            <FcGoogle size={20} />
                            SignUp With Google
                        </button>


                    </form>
                </div>
            </div>
            <div className="flex justify-center items-center mt-[33px]">
                <p className='text-center'>Already have an account? 
                    <NavLink to='/login'> <a href="" className='text-blue-500'>Login</a></NavLink>
                </p>
            </div>
        </div>
    </div>
  )
}
