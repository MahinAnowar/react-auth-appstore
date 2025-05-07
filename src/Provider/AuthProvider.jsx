// AuthProvider.jsx

import React, { createContext, useContext, useEffect, useState } from 'react';
import app from './../firebase/firebase.config'; // Assuming this is your firebase initialization file
import {
    createUserWithEmailAndPassword,
    getAuth,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    GoogleAuthProvider,
    signInWithPopup,
    sendPasswordResetEmail // <-- ****** ADD THIS IMPORT ******
} from "firebase/auth";

export const AuthContext = createContext(null);
const auth = getAuth(app); // Use 'app' which you imported from firebase.config.js
const googleProvider = new GoogleAuthProvider();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const updateUserProfile = (profileData) => {
        if (auth.currentUser) {
            return updateProfile(auth.currentUser, profileData);
        }
        return Promise.reject(new Error("No current user to update."));
    };

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    // --- ****** ADD THIS FUNCTION ****** ---
    const resetPassword = (email) => {
        setLoading(true); // Optional: You might want a loading state for this specific action
        return sendPasswordResetEmail(auth, email)
            .finally(() => {
                setLoading(false); // Ensure loading is set to false after the attempt
            });
    };
    // --- ****************************** ---


    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const authData = {
        user,
        setUser, // Still be cautious exposing this directly unless many components need it
        loading,
        setLoading, // Same caution
        createUser,
        logOut,
        signIn,
        updateUserProfile,
        googleSignIn,
        resetPassword    // <-- ****** ADD resetPassword TO THE CONTEXT VALUE ******
    };

    return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};

// Optional: Custom hook for easier context consumption
export const useAuth = () => {
    return useContext(AuthContext);
};