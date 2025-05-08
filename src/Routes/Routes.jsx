// Routes.jsx
import { createBrowserRouter } from "react-router-dom";
import { HomeLayout } from "../Layouts/HomeLayout";
import { Login } from "../Pages/login/Login";
import { SignUp } from "../Pages/SignUp/SignUp";
import { Faq } from "../Pages/FAQ/Faq";
import { Apps } from "../Pages/Apps/Apps";
import AppDetails from "../Pages/AppDetails/AppDetails";
import { PrivateRoute } from "../Provider/PrivateRoute";
import Loading from "../Pages/Loading/Loading";
import { Profile } from "../Pages/Profile/Profile";
import { PublicRoute } from "../Provider/PublicRoute";
import { ErrorPage } from "../Pages/ErrorPage/ErrorPage";
// import { AppDetails } from "../Pages/AppDetails/AppDetails";

// Define a common loader function for fetching and parsing apps.json
const loadAppsData = async () => {
    try {
        // Ensure 'apps.json' is in your public folder for this path to work directly.
        // If it's elsewhere, adjust the path or import method.
        const response = await fetch('/apps.json'); // Added leading '/' for clarity if in public root
        
        if (!response.ok) {
            // Throwing a Response object allows React Router to handle it with an errorElement
            throw new Response(`Failed to fetch apps: ${response.status} ${response.statusText}`, { 
                status: response.status,
                statusText: response.statusText 
            });
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error loading apps.json:", error);
        // If it's a network error or non-Response error, re-throw or throw a new Response
        if (error instanceof Response) {
            throw error; // Re-throw Response objects for React Router to handle
        }
        throw new Response("Network error or unexpected issue loading app data.", { status: 500 });
    }
};

const router = createBrowserRouter([
    {
        path: "/",
        Component: HomeLayout,
        // Optional: Add an errorElement at the layout level to catch errors from children or their loaders
        // errorElement: <RootErrorPage />, 
        children: [
            {
                path: "",
                loader: loadAppsData, // Relative path, good
                Component: Apps,
                hydrateFallbackElement: <Loading></Loading>,
            },
            {
                path: "login", // Relative path, good
                element:(<PublicRoute><Login></Login></PublicRoute>),
            },
            {
                path: "signup", // Relative path
                element:(<PublicRoute><SignUp></SignUp></PublicRoute>),
            },
            {
                path: "faq", // Relative path
                Component: Faq,
            },
            {
                path: "apps", // Relative path
                loader: loadAppsData, // Use the common loader
                Component: Apps,
                hydrateFallbackElement: <Loading></Loading>,
                // Optional: Add an errorElement specific to this route
                // errorElement: <AppsErrorPage />,
            },
            {
                path: "appDetails/:id", // Relative path
                loader: loadAppsData,
                hydrateFallbackElement: <Loading></Loading>, // Use the common loader
                element:(
                    <PrivateRoute>
                        <AppDetails></AppDetails>
                    </PrivateRoute>
                ) ,
                // Optional: Add an errorElement specific to this route
                // errorElement: <AppDetailsErrorPage />, 
            },
            {
                path:"/profile",
                element:(<PrivateRoute><Profile></Profile></PrivateRoute>),
            },
            {
                path: "*", // Catch-all should usually be at the end of its level or the root level
                Component: ErrorPage,
            }
        ]
    },
    // You might also want a root-level catch-all if HomeLayout isn't always the wrapper
    // { 
    //     path: "*", 
    //     element: <h1>404 - Global Not Found</h1> 
    // }
]);

export default router;