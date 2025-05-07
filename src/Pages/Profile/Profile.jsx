import React, { useContext, useState, useEffect } from 'react'; // Changed 'use' to 'useContext'
import { AuthContext } from '../../Provider/AuthProvider'; // Assuming this path is correct
import Loading from '../Loading/Loading';
import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast'; // Optional: for user feedback as per original assignment guidelines

export const Profile = () => {
    const { user, updateUser, loading: authLoading } = useContext(AuthContext); // Destructure updateUser

    const [name, setName] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [isEditing, setIsEditing] = useState(false); // To toggle between view and edit mode
    const [isUpdating, setIsUpdating] = useState(false); // Loading state for the update process
    const navigate = useNavigate(); // For navigation if needed

    // Effect to initialize form fields when user data is available or changes
    useEffect(() => {
        if (user) {
            setName(user.displayName || '');
            setPhotoURL(user.photoURL || '');
        }
    }, [user]); // Re-run if user object changes

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
        // Reset fields to current user data if canceling edit mode
        if (isEditing && user) { // if was editing and now toggling off
            setName(user.displayName || '');
            setPhotoURL(user.photoURL || '');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            // toast.error("You must be logged in to update your profile.");
            console.error("User not logged in. This shouldn't happen if page is protected.");
            return;
        }

        setIsUpdating(true);
        const profileDataToUpdate = {};

        // Only include fields in the update if they've actually changed
        if (name !== (user.displayName || '')) { // Handle case where initial displayName is null
            profileDataToUpdate.displayName = name;
        }
        if (photoURL !== (user.photoURL || '')) { // Handle case where initial photoURL is null
            profileDataToUpdate.photoURL = photoURL;
        }
        

        if (Object.keys(profileDataToUpdate).length === 0) {
            // toast.info("No changes to save.");
            console.log("No changes to save");
            setIsEditing(false); // Still exit edit mode
            setIsUpdating(false);
            return;
        }

        try {
            await updateUser(profileDataToUpdate); // Call the updateUser function from AuthContext
            // toast.success("Profile updated successfully!");
            console.log("Profile updated successfully!");
            setIsEditing(false); // Exit edit mode on success
        } catch (error) {
            // toast.error(`Failed to update profile: ${error.message}`);
            console.error("Failed to update profile:", error);
        } finally {
            setIsUpdating(false);
        }
    };

    if (authLoading) {
        return (
           <Loading></Loading> // Show loading spinner while auth state is being determined
        );
    }

    // If auth check is done and still no user, (though this page should be protected by a PrivateRoute)
    if (!user) {
        return (
            // <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            //     <div className="text-xl font-semibold text-center">
            //         Please log in to view or edit your profile.
            //     </div>
            // </div>
            navigate('/login') // Redirect to login page if not authenticated
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 py-10 md:py-20">
            <div className="bg-white shadow-xl rounded-lg p-6 md:p-8 w-full max-w-md">
                <h1 className="text-3xl font-bold text-center mb-6 text-gray-700">My Profile</h1>
                
                <div className="text-center mb-6">
                    <img
                        className="w-32 h-32 rounded-full mx-auto mb-4 border-4 border-blue-500 object-cover"
                        // Show live preview of photoURL if editing, otherwise user's current photo
                        src={isEditing ? (photoURL || "https://img.icons8.com/?size=96&id=z-JBA_KtSkxG&format=png") : (user.photoURL || "https://img.icons8.com/?size=96&id=z-JBA_KtSkxG&format=png")}
                        alt="Profile"
                        onError={(e) => { // Basic fallback for broken image links
                            e.target.onerror = null; 
                            e.target.src="https://img.icons8.com/?size=96&id=z-JBA_KtSkxG&format=png"; 
                        }}
                    />
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
                            <div className="text-sm break-all mt-2"> {/* break-all for long URLs */}
                                <span className="font-semibold text-gray-600">Current Photo URL:</span>
                                <span className="ml-2 text-gray-500 ">{user.photoURL}</span>
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
                            <label htmlFor="photoURL" className="block text-sm font-medium text-gray-700 mb-1">Photo URL</label>
                            <input
                                type="url"
                                id="photoURL"
                                value={photoURL}
                                onChange={(e) => setPhotoURL(e.target.value)}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                placeholder="https://example.com/image.jpg"
                            />
                        </div>
                        <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mt-6">
                            <button
                                type="submit"
                                disabled={isUpdating}
                                className="w-full cursor-pointer sm:w-auto flex-1 bg-green-500 hover:bg-green-600 text-white font-semibold py-2.5 px-4 rounded-md transition duration-150 ease-in-out disabled:opacity-60 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-400"
                            >
                                {isUpdating ? 'Saving...' : 'Save Changes'}
                            </button>
                            <button
                                type="button"
                                onClick={handleEditToggle}
                                disabled={isUpdating}
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