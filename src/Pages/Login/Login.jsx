import React, { use, useContext, useEffect } from 'react';
import { FcGoogle } from 'react-icons/fc';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2'; // Import SweetAlert2

export const Login = () => {

    // const {user, authLoading}=use(AuthContext);

    // useEffect(() => {
    //     if (!authLoading && user) { // Check only after auth state is confirmed and user exists
    //         Swal.fire({
    //             icon: 'info',
    //             title: 'Already Logged In',
    //             text: 'You are already logged in. Redirecting to home...',
    //             timer: 2000,
    //             showConfirmButton: false,
    //             willClose: () => { // Use willClose to navigate after Swal closes
    //                 navigate('/');
    //             }
    //         });
    //     }
    // }, [user, authLoading, navigate]);


    const { signIn, googleSignIn, resetPassword, setLoading } = useContext(AuthContext); // Added setLoading
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        
        setLoading(true); // Optional: Indicate loading starts
        signIn(email, password)
            .then(result => {
                // const user = result.user; // No longer directly needed here if navigate occurs
                Swal.fire({
                    icon: 'success',
                    title: 'Login Successful!',
                    text: 'Welcome back!',
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(location?.state?.from?.pathname || '/');
            })
            .catch(error => {
                console.error('Email/Password login error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Login Failed',
                    text: error.message || "Invalid email or password. Please try again.",
                });
            })
            .finally(() => {
                setLoading(false); // Indicate loading ends
            });
    };

    const handleGoogleLogin = () => {
        setLoading(true); // Optional
        googleSignIn()
            .then(result => {
                // const user = result.user; // No longer directly needed
                Swal.fire({
                    icon: 'success',
                    title: 'Google Login Successful!',
                    text: `Welcome, ${result.user.displayName || 'User'}!`,
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate(location?.state?.from?.pathname || '/');
            })
            .catch(error => {
                console.error('Google login error:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Google Login Failed',
                    text: error.message || "Could not sign in with Google. Please try again.",
                });
            })
            .finally(() => {
                setLoading(false); // Optional
            });
    };

    const handleForgotPassword = async () => { // Make it async to use await with Swal
        // Use Swal to get the email input
        const { value: email } = await Swal.fire({
            title: 'Reset Password',
            input: 'email',
            inputLabel: 'Enter your email address',
            inputPlaceholder: 'your.email@example.com',
            showCancelButton: true,
            confirmButtonText: 'Send Reset Link',
            cancelButtonText: 'Cancel',
            inputValidator: (value) => {
                if (!value) {
                    return 'You need to write something!'
                }
                // Basic email format check (optional, can be more robust)
                if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    return 'Please enter a valid email address.'
                }
            }
        });

        if (email) { // Proceed if the user entered an email and clicked "Send Reset Link"
            setLoading(true); // Optional
            resetPassword(email)
                .then(() => {
                    Swal.fire({
                        icon: 'success',
                        title: 'Email Sent!',
                        text: 'A password reset link has been sent to your email. Please check your inbox (and spam folder).',
                    });
                })
                .catch((error) => {
                    console.error("Error sending password reset email:", error);
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: error.message || "Failed to send password reset email. Make sure the email is registered.",
                    });
                })
                .finally(() => {
                    setLoading(false); // Optional
                });
        }
        // If the user cancels or closes the Swal input, `email` will be undefined, and nothing happens.
    };


    return (
        <div>
            <h1 className='text-3xl font-bold text-center mt-10 mb-8'>AppStore</h1>
            <div className="flex flex-col justify-center items-center py-10 px-4">
                <div className="card w-full max-w-md bg-base-100 shadow-xl p-2 sm:p-0">
                    <div className="card-body">
                        <h2 className="text-center text-2xl font-bold mb-6">Login</h2>
                        <form onSubmit={handleLogin} className='flex flex-col gap-4'>
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

                            <div className='text-right mt-1 mb-2'>
                                <button
                                    type="button"
                                    onClick={handleForgotPassword}
                                    className='text-sm text-blue-500 hover:underline focus:outline-none'
                                >
                                    Forgot password?
                                </button>
                            </div>

                            <button type="submit" className='btn btn-primary w-full'>Login</button>

                            <div className="divider my-2">OR</div>

                            <button
                                type="button"
                                onClick={handleGoogleLogin}
                                className='btn btn-outline flex items-center justify-center gap-2 w-full'
                            >
                                <FcGoogle size={24} />
                                Login With Google
                            </button>
                        </form>
                        <div className="flex justify-center items-center mt-6">
                            <div className='text-center flex flex-col sm:flex-row gap-1 sm:gap-2'>
                                <p>Don't have an account?</p>
                                <NavLink to='/signup'>
                                    <p className='text-blue-500 hover:underline'>Sign Up</p>
                                </NavLink>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};