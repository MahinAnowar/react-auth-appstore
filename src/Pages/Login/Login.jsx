import React, { use } from 'react'
import { FcGoogle } from 'react-icons/fc';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';

export const Login = () => {
    const {signIn} = use(AuthContext);
    const location = useLocation();
    const navigate = useNavigate();
    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        console.log({ email, password });
        signIn(email, password)
            .then(result => {
                const user = result.user;
                console.log(user);
                navigate(`${
                    location.state ? location.state : '/'
                }`);
                // form.reset();
            })
            .catch(error => {
                console.error(error);
                alert(error.message);
            });
    }
    return (
        <div>
            <h1 className='text-3xl font-bold text-center mt-10'>AppStore</h1>
            <div className="flex flex-col justify-center items-center py-10">
                <div className="card w-96 bg-base-100 shadow-xl">
                    <div className="card-body">
                        <h2 className="text-center text-2xl font-bold">Login</h2>
                        <form onSubmit={handleLogin} action="" className='flex flex-col gap-4'>
                            <input required name="email" type="email" placeholder="Email" className="input input-bordered w-full max-w-xs" />
                            <input required name="password" type="password" placeholder="Password" className="input input-bordered w-full max-w-xs" />
                           
                            <div className='text-center'>Forgotten password?</div>
                            <button type="submit" className='btn btn-primary'>Login</button>
                               <button className='btn btn-outline flex items-center justify-center gap-2'>
                                                        <FcGoogle size={20} />
                                                        Login With Google
                                                    </button>
                            
                        </form>
                    </div>
                </div>
                <div className="flex justify-center items-center mt-[33px]">
                    <div className='text-center flex gap-2'><p>Don't have an account?</p> <NavLink to='/signup'> <p className='text-blue-500'>Sign Up</p></NavLink></div>
                </div>
            </div>

        </div>
    )
}
