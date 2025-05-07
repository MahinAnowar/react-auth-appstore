import React, { use } from 'react'
import { AuthContext } from '../../Provider/AuthProvider';

export const Profile = () => {
    const {user} =use(AuthContext);
    console.log(user);
return (
    <div className="flex flex-col items-center justify-center py-[100px] bg-gray-100 p-4">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
            <h1 className="text-2xl font-bold text-center mb-4">My Profile</h1>
            <div className="text-center">
                <img
                    className="w-24 h-24 rounded-full mx-auto mb-4"
                    src={user ? user.photoURL : "https://img.icons8.com/?size=96&id=z-JBA_KtSkxG&format=png"}
                    alt="Profile"
                />
                <h2 className="text-lg font-semibold">
                    Name: {user ? user.displayName : "Not Set Yet"}
                </h2>
                <h2 className="text-lg font-semibold">
                    Email: {user ? user.email : "Not Set Yet"}
                </h2>
            </div>
        </div>
    </div>
);
}
