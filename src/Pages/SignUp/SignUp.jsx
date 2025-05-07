import React, { useContext } from 'react'; // Changed 'use' to 'useContext'
import { NavLink, useNavigate } from 'react-router-dom';
import { FcGoogle } from "react-icons/fc";
import { AuthContext } from '../../Provider/AuthProvider';
// import { toast } from 'react-hot-toast'; // Recommended for user feedback

export const SignUp = () => {
    // Use useContext hook properly
    const { createUser, updateUserProfile, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const photoUrl = form.photoUrl.value;
        const email = form.email.value;
        const password = form.password.value;

        // Add password validation as per original requirements
        if (password.length < 6) {
            // toast.error("Password must be at least 6 characters long.");
            alert("Password must be at least 6 characters long.");
            return;
        }
        if (!/[A-Z]/.test(password)) {
            // toast.error("Password must contain at least one uppercase letter.");
            alert("Password must contain at least one uppercase letter.");
            return;
        }
        if (!/[a-z]/.test(password)) {
            // toast.error("Password must contain at least one lowercase letter.");
            alert("Password must contain at least one lowercase letter.");
            return;
        }
        // You might want to add more checks like special characters or numbers if required

        createUser(email, password)
            .then(result => {
                const user = result.user;
                console.log('User created:', user);
                // Update profile with name and photoURL
                return updateUserProfile({ displayName: name, photoURL: photoUrl })
                    .then(() => {
                        console.log('User profile updated successfully for email/password signup');
                        // The onAuthStateChanged listener in AuthProvider will update the global user state.
                        // No need for setUser manually here unless for immediate local feedback.
                        // toast.success("Account created successfully!");
                        navigate('/'); // Navigate to home or login page
                        form.reset();
                    });
            })
            .catch(error => {
                console.error('Error during registration or profile update:', error);
                // toast.error(error.message || "Registration failed. Please try again.");
                alert(error.message || "Registration failed. Please try again.");
            });
    };

    const handleSignUpWithGoogle = () => {
        googleSignIn()
            .then(result => {
                const user = result.user;
                console.log('Google sign-in successful:', user);
                // Firebase usually populates displayName and photoURL automatically from Google.
                // You generally don't need an explicit updateUserProfile here unless you want
                // to store additional custom information right after Google sign-up.
                // toast.success("Signed up with Google successfully!");
                navigate('/'); // Navigate to home page
            })
            .catch(error => {
                console.error('Google sign-in error:', error);
                // toast.error(error.message || "Google sign-in failed. Please try again.");
                alert(error.message || "Google sign-in failed. Please try again.");
            });
    };

    return (
        <div>
            <h1 className='text-3xl font-bold text-center mt-10'>AppStore</h1>
            <div className="flex flex-col justify-center items-center py-10">
                <div className="card w-full max-w-md bg-base-100 shadow-xl p-2 sm:p-0"> {/* Adjusted width and padding for responsiveness */}
                    <div className="card-body">
                        <h2 className="text-center text-2xl font-bold mb-4">Sign Up</h2> {/* Added margin-bottom */}
                        <form onSubmit={handleRegister} className='flex flex-col gap-4'>
                            <input required name="name" type="text" placeholder="Full Name" className="input input-bordered w-full" />
                            <input name="photoUrl" type="url" placeholder="Your Photo URL (e.g., https://...)" className="input input-bordered w-full" /> {/* Changed to type="url" */}
                            <input required name="email" type="email" placeholder="Email" className="input input-bordered w-full" />
                            <input required name="password" type="password" placeholder="Password" className="input input-bordered w-full" />

                            <button type="submit" className='btn btn-primary w-full'>Sign Up</button>

                            <div className="divider">OR</div> {/* Optional divider */}

                            <button
                                type="button" // Important: type="button" to prevent form submission
                                onClick={handleSignUpWithGoogle}
                                className='btn btn-outline flex items-center justify-center gap-2 w-full'
                            >
                                <FcGoogle size={24} /> {/* Slightly increased icon size */}
                                Sign Up With Google
                            </button>
                        </form>
                        <div className="flex justify-center items-center mt-6"> {/* Increased margin-top */}
                            <div className='text-center flex flex-col sm:flex-row gap-1 sm:gap-2'> {/* Responsive gap and flex direction */}
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