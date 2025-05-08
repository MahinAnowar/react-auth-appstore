import React, { useContext, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2'; 
import logo from '../../assets/logo.png'; 

export const SignUp = () => {

    useEffect(() => {
        document.title = "Sign Up - AppStore";
    }, []);

    const { createUser, updateUserProfile, googleSignIn, setLoading } = useContext(AuthContext); // Added setLoading
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photoUrl = form.photoUrl.value; // Will be an empty string if not filled
        const email = form.email.value;
        const password = form.password.value;

        // Password validation
        if (password.length < 6) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Password must be at least 6 characters long.',
            });
            return;
        }
        if (!/[A-Z]/.test(password)) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Password must contain at least one uppercase letter.',
            });
            return;
        }
        if (!/[a-z]/.test(password)) {
            Swal.fire({
                icon: 'error',
                title: 'Validation Error',
                text: 'Password must contain at least one lowercase letter.',
            });
            return;
        }

        setLoading(true); // Indicate loading starts
        createUser(email, password)
            .then(result => {
                // const user = result.user; // Not directly needed for display here
                // console.log('User created:', result.user);
                // Update profile with name and photoURL (only if photoUrl is provided)
                const profileData = { displayName: name };
                if (photoUrl) {
                    profileData.photoURL = photoUrl;
                }

                return updateUserProfile(profileData)
                    .then(() => {
                        // console.log('User profile updated successfully for email/password signup');
                        Swal.fire({
                            icon: 'success',
                            title: 'Account Created!',
                            text: `Welcome, ${name}! Your account has been successfully created.`,
                            showConfirmButton: false,
                            timer: 2000 // Auto-close after 2 seconds
                        });
                        navigate('/');
                        form.reset();
                    });
            })
            .catch(error => {
                // console.error('Error during registration or profile update:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Registration Failed',
                    text: error.message || "Could not create your account. Please try again.",
                });
            })
            .finally(() => {
                setLoading(false); // Indicate loading ends
            });
    };

    const handleSignUpWithGoogle = () => {
        setLoading(true);
        googleSignIn()
            .then(result => {
                // const user = result.user; // Not directly needed for display
                // console.log('Google sign-up successful:', result.user);
                Swal.fire({
                    icon: 'success',
                    title: 'Signed Up with Google!',
                    text: `Welcome, ${result.user.displayName || 'User'}! You're all set.`,
                    showConfirmButton: false,
                    timer: 2000
                });
                navigate('/');
            })
            .catch(error => {
                // console.error('Google sign-up error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Google Sign-Up Failed',
                    text: error.message || "Could not sign up with Google. Please try again.",
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div>
            <div className='justify-center pt-[25px] normal-case text-3xl flex items-center gap-2 p-0 hover:bg-transparent'>
                <img src={logo} className='w-[40px] h-auto' alt="AppStore Logo" />
                <span>AppStore</span>
            </div>
            <div className="flex flex-col justify-center items-center py-10 px-4"> 
                <div className="card w-full max-w-md bg-base-100 shadow-xl p-2 sm:p-0"> 
                    <div className="card-body">
                        <h2 className="text-center text-2xl font-bold mb-6">Sign Up</h2> 
                        <form onSubmit={handleRegister} className='flex flex-col gap-4'>
                            <input
                                required
                                name="name"
                                type="text"
                                placeholder="Full Name"
                                className="input input-bordered w-full"
                            />
                         
                            <input
                                name="photoUrl"
                                type="url"
                                placeholder="Your Photo URL (Optional)"
                                className="input input-bordered w-full"
                            />
                            <input
                                required
                                name="email"
                                type="email"
                                placeholder="Email"
                                className="input input-bordered w-full"
                            />
                            <input
                                required
                                name="password"
                                type="password"
                                placeholder="Password"
                                className="input input-bordered w-full"
                            />

                            <button type="submit" className='btn btn-primary w-full'>Sign Up</button>

                            <div className="divider my-2">OR</div> 

                            <button
                                type="button"
                                onClick={handleSignUpWithGoogle}
                                className='btn btn-outline flex items-center justify-center gap-2 w-full'
                            >
                                <FcGoogle size={24} />
                                Sign Up With Google
                            </button>
                        </form>
                        <div className="flex justify-center items-center mt-6">
                            <div className='text-center flex flex-col sm:flex-row gap-1 sm:gap-2'>
                                <p>Already have an account?</p>
                                <NavLink to='/login'>
                                    <p className='text-blue-500 hover:underline'>Login</p>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};