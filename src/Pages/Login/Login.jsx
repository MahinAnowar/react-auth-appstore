import React from 'react'
import { FcGoogle } from 'react-icons/fc';
import { NavLink } from 'react-router-dom';

export const Login = () => {
    return (
        <div>
            <h1 className='text-3xl font-bold text-center mt-10'>AppStore</h1>
            <div className="flex flex-col justify-center items-center py-10">
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="text-center text-2xl font-bold">Login</h2>
                        <form action="" className='flex flex-col gap-4'>
                            <input type="email" placeholder="Email" className="input input-bordered w-full max-w-xs" />
                            <input type="password" placeholder="Password" className="input input-bordered w-full max-w-xs" />
                           
                            <div className='text-center'>Forgotten password?</div>
                            <button className='btn btn-primary'>Login</button>
                               <button className='btn btn-outline flex items-center justify-center gap-2'>
                                                        <FcGoogle size={20} />
                                                        Login With Google
                                                    </button>
                            
                        </form>
                    </div>
                </div>
                <div className="flex justify-center items-cente mt-[33px]">
                    <p className='text-center'>Don't have an account? <NavLink to='/signup'> <a href="" className='text-blue-500'>Sign Up</a></NavLink></p>
                </div>
            </div>

        </div>
    )
}
