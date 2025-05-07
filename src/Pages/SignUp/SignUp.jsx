import React, { use } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from '../../Provider/AuthProvider';


export const SignUp = () => {

    const {createUser, setUser, updateUser} = use(AuthContext);
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photoUrl = form.photoUrl.value;
        const email = form.email.value;
        const password = form.password.value;

        console.log({name, photoUrl, email, password});
        createUser(email, password)
        .then(result => {
            const user = result.user;
            console.log(user);
            updateUser({displayName: name, photoURL: photoUrl})
            .then(() => {
                console.log('User updated successfully');
                // alert('User updated successfully');
                setUser({...user, displayName: name, photoURL: photoUrl});
                navigate('/');
            }).catch(error => {
                console.error('Error updating user:', error);
                alert(error.message);
                setUser(user);
            });
            
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
                    <h2 className="text-center text-2xl font-bold">Sign Up</h2>
                    <form onSubmit={handleRegister} action="" className='flex flex-col gap-4'>
                        <input required name="name" type="text" placeholder="Full Name" className="input input-bordered w-full max-w-xs" />
                        <input required name="photoUrl" type="text" placeholder="Your Photo Url" className="input input-bordered w-full max-w-xs" />
                        <input required name="email" type="email" placeholder="Email" className="input input-bordered w-full max-w-xs" />
                        <input required name="password" type="password" placeholder="Password" className="input input-bordered w-full max-w-xs" />

                        <button type="submit" className='btn btn-primary'>Sign Up</button>

                        <button className='btn btn-outline flex items-center justify-center gap-2'>
                            <FcGoogle size={20} />
                            SignUp With Google
                        </button>


                    </form>
                </div>
            </div>
            <div className="flex justify-center items-center mt-[33px]">
                <div className='text-center flex gap-2'>
                    <p>Already have an account?</p>
                    <NavLink to='/login'> <p className='text-blue-500'>Login</p></NavLink>
                </div>
            </div>
        </div>
    </div>
  )
}
