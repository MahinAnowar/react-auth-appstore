import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../Provider/AuthProvider'; // Assuming this path is correct
import Loading from '../Loading/Loading'; // Your loading component
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Import SweetAlert2

export const Profile = () => {
    // Ensure you destructure the correct function name for updating profile from AuthContext
    const { user, updateUserProfile, loading: authLoading, setLoading } = useContext(AuthContext);

    const [name, setName] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const navigate = useNavigate();

    // Effect for redirecting if user is not authenticated AFTER auth check
    // useEffect(() => {
    //     if (!authLoading && !user) {
    //         // Show a message before redirecting
    //         Swal.fire({
    //             icon: 'info',
    //             title: 'Not Logged In',
    //             text: 'Please log in to view your profile.',
    //             timer: 2000,
    //             showConfirmButton: false
    //         }).then(() => {
    //             navigate('/login');
    //         });
    //     }
    // }, [authLoading, user, navigate]);

    // Effect to initialize form fields when user data is available or changes
    useEffect(() => {
        if (user) {
            setName(user.displayName || '');
            setPhotoURL(user.photoURL || '');
        }
    }, [user]); // Re-run if user object changes

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        if (isEditing && user) {
            setName(user.displayName || '');
            setPhotoURL(user.photoURL || '');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'You must be logged in to update your profile.',
            });
            return;
        }

        // Start visual update process
        setIsUpdating(true);
        if (setLoading) setLoading(true); // Global loading state if available

        const profileDataToUpdate = {};
        if (name !== (user.displayName || '')) {
            profileDataToUpdate.displayName = name;
        }
        // Make photoURL truly optional: allow setting it to an empty string to remove it
        if (photoURL !== (user.photoURL || '')) {
            profileDataToUpdate.photoURL = photoURL; // This can be an empty string
        }

        if (Object.keys(profileDataToUpdate).length === 0) {
            Swal.fire({
                icon: 'info',
                title: 'No Changes',
                text: 'There are no changes to save.',
                timer: 1500,
                showConfirmButton: false
            });
            setIsEditing(false);
            setIsUpdating(false);
            if (setLoading) setLoading(false);
            return;
        }

        try {
            // Use the correct function name from your AuthProvider (likely updateUserProfile)
            await updateUserProfile(profileDataToUpdate);
            Swal.fire({
                icon: 'success',
                title: 'Profile Updated!',
                text: 'Your profile has been updated successfully.',
                showConfirmButton: false,
                timer: 1500
            });
            setIsEditing(false); // Exit edit mode on success
        } catch (error) {
            console.error("Failed to update profile:", error);
            Swal.fire({
                icon: 'error',
                title: 'Update Failed',
                text: error.message || 'Could not update your profile. Please try again.',
            });
        } finally {
            setIsUpdating(false);
            if (setLoading) setLoading(false); // Stop global loading state
        }
    };

    // Show loading spinner while auth state is being determined
    if (authLoading) {
        return <Loading />;
    }

    // If, after loading, user is still null, the useEffect above will handle the redirect.
    // This prevents rendering the rest of the component if user is null post-auth check.
    if (!user) {
        return <Loading />; // Or null, or some minimal placeholder while redirect effect runs
    }

    useEffect(() => {
        document.title = "My Profile - AppStore";
    }, []);

    return (
        <div className="flex flex-col items-center justify-center bg-gray-100 py-[80px]">
            <div className="bg-white shadow-xl rounded-lg p-6 md:p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-700">My Profile</h1>



                <div className="text-center mb-6">
                    {/* DaisyUI Tooltip Wrapper */}
                    <div
                        className="tooltip tooltip-bottom" // You can also use tooltip-top, tooltip-left, tooltip-right
                        data-tip={user?.displayName || "User"} // The text to show in the tooltip
                    >
                        <img
                            className="w-32 h-32 rounded-full mx-auto border-4 border-blue-500 object-cover cursor-pointer"
                            // Added cursor-pointer to indicate interactivity if you want the tooltip to feel more "active"
                            src={isEditing && photoURL ? photoURL : (user?.photoURL || "https://img.icons8.com/?size=96&id=z-JBA_KtSkxG&format=png")}
                            alt="Profile"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = "https://img.icons8.com/?size=96&id=z-JBA_KtSkxG&format=png";
                            }}
                        />
                    </div>
                </div>

                {!isEditing ? (
                    <div className="space-y-3">
                        <div className="text-lg">
                            <span className="font-semibold text-gray-600">Name:</span>
                            <span className="ml-2 text-gray-800">{user.displayName || "Not Set Yet"}</span>
                        </div>
                        <div className="text-lg">
                            <span className="font-semibold text-gray-600">Email:</span>
                            <span className="ml-2 text-gray-800">{user.email}</span>
                        </div>
                        {user.photoURL && (
                            <div className="text-sm break-all mt-2">
                                <span className="font-semibold text-gray-600">Current Photo URL:</span>
                                <a href={user.photoURL} target="_blank" rel="noopener noreferrer" className="ml-2 text-blue-500 hover:underline">{user.photoURL}</a>
                            </div>
                        )}
                        <button
                            onClick={handleEditToggle}
                            className="w-full cursor-pointer mt-8 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 px-4 rounded-md transition duration-150 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-400"
                        >
                            Edit Profile
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                            <input
                                type="text"
                                id="name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="Your Name"
                            />
                        </div>
                        <div>
                            <label htmlFor="photoURL" className="block text-sm font-medium text-gray-700 mb-1">Photo URL (leave blank to remove)</label>
                            <input
                                type="url"
                                id="photoURL"
                                value={photoURL}
                                onChange={(e) => setPhotoURL(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="https://example.com/image.jpg or blank"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mt-6">
                            <button
                                type="submit"
                                disabled={isUpdating || authLoading} // Disable if updating or auth is loading
                                className="w-full cursor-pointer sm:w-auto flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2.5 px-4 rounded-md transition duration-150 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-blue-400"
                            >
                                {isUpdating ? 'Saving...' : 'Save Changes'}
                            </button>
                            <button
                                type="button"
                                onClick={handleEditToggle}
                                disabled={isUpdating || authLoading} // Disable if updating or auth is loading
                                className="w-full cursor-pointer sm:w-auto flex-1 bg-gray-500 hover:bg-gray-600 text-white font-semibold py-2.5 px-4 rounded-md transition duration-150 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-gray-400"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};