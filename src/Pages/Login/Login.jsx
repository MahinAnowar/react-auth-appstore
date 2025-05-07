import React, { useContext } from 'react'; // Changed 'use' to 'useContext'
import { FcGoogle } from 'react-icons/fc';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../Provider/AuthProvider';
// import { toast } from 'react-hot-toast'; // Recommended for user feedback

export const Login = () => {
    // Use useContext and destructure googleSignIn
    const { signIn, googleSignIn, resetPassword } = useContext(AuthContext);
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
                console.log('Email/Password login successful:', user);
                // toast.success("Logged in successfully!");
                navigate(location?.state?.from?.pathname || '/'); // More robust navigation
                // form.reset(); // Not always needed, depends on UX preference
            })
            .catch(error => {
                console.error('Email/Password login error:', error);
                // toast.error(error.message || "Login failed. Please check your credentials.");
                alert(error.message || "Login failed. Please check your credentials.");
            });
    };

    const handleGoogleLogin = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                console.log('Google login successful:', user);
                // toast.success("Logged in with Google successfully!");
                navigate(location?.state?.from?.pathname || '/'); // Navigate to previous page or home
            })
            .catch(error => {
                console.error('Google login error:', error);
                // toast.error(error.message || "Google login failed. Please try again.");
                alert(error.message || "Google login failed. Please try again.");
            });
    };

    // Handler for "Forgot Password" - as per earlier requirements
    const handleForgotPassword = () => {
        const email = prompt("Please enter your email address to reset your password:");
        if (email) {
            resetPassword(email)
                .then(() => {
                    // toast.success("Password reset email sent! Check your inbox.");
                    alert("Password reset email sent! Check your inbox.");
                })
                .catch((error) => {
                    console.error("Error sending password reset email:", error);
                    // toast.error(error.message || "Failed to send password reset email.");
                    alert(error.message || "Failed to send password reset email.");
                });
        } else if (email !== null) { // User pressed OK with an empty field
            // toast.error("Email address cannot be empty.");
            alert("Email address cannot be empty.");
        }
        // If user cancels prompt, email is null, do nothing.
    };


    return (
        <div>
            <h1 className='text-3xl font-bold text-center mt-10 mb-8'>AppStore</h1> {/* Added margin-bottom */}
            <div className="flex flex-col justify-center items-center py-10 px-4"> {/* Added horizontal padding */}
                <div className="card w-full max-w-md bg-base-100 shadow-xl p-2 sm:p-0"> {/* Responsive width and padding */}
                    <div className="card-body">
                        <h2 className="text-center text-2xl font-bold mb-6">Login</h2> {/* Added margin-bottom */}
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

                            <div className='text-right mt-1 mb-2'> {/* Styled "Forgotten password" link */}
                                <button
                                    type="button"
                                    onClick={handleForgotPassword}
                                    className='text-sm text-blue-500 hover:underline focus:outline-none'
                                >
                                    Forgot password?
                                </button>
                            </div>

                            <button type="submit" className='btn btn-primary w-full'>Login</button>

                            <div className="divider my-2">OR</div> {/* Adjusted divider margin */}

                            <button
                                type="button" // Important: to prevent form submission
                                onClick={handleGoogleLogin}
                                className='btn btn-outline flex items-center justify-center gap-2 w-full'
                            >
                                <FcGoogle size={24} /> {/* Slightly increased icon size */}
                                Login With Google
                            </button>
                        </form>
                        <div className="flex justify-center items-center mt-6">
                            <div className='text-center flex flex-col sm:flex-row gap-1 sm:gap-2'> {/* Responsive gap and flex direction */}
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