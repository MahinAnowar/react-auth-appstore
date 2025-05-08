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

const loadAppsData = async () => {
    try {
        const response = await fetch('/apps.json'); 
        
        if (!response.ok) {
            
            throw new Response(`Failed to fetch apps: ${response.status} ${response.statusText}`, { 
                status: response.status,
                statusText: response.statusText 
            });
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        // console.error("Error loading apps.json:", error);
        if (error instanceof Response) {
            throw error; 
        }
        throw new Response("Network error or unexpected issue loading app data.", { status: 500 });
    }
};

const router = createBrowserRouter([
    {
        path: "/",
        Component: HomeLayout,
         
        children: [
            {
                path: "",
                loader: loadAppsData, 
                Component: Apps,
                hydrateFallbackElement: <Loading></Loading>,
            },
            {
                path: "login", 
                element:(<PublicRoute><Login></Login></PublicRoute>),
            },
            {
                path: "signup", 
                element:(<PublicRoute><SignUp></SignUp></PublicRoute>),
            },
            {
                path: "faq",
                Component: Faq,
            },
            {
                path: "apps", 
                loader: loadAppsData, 
                Component: Apps,
                hydrateFallbackElement: <Loading></Loading>,
                
            },
            {
                path: "appDetails/:id", 
                loader: loadAppsData,
                hydrateFallbackElement: <Loading></Loading>, 
                element:(
                    <PrivateRoute>
                        <AppDetails></AppDetails>
                    </PrivateRoute>
                ) ,
                
            },
            {
                path:"/profile",
                element:(<PrivateRoute><Profile></Profile></PrivateRoute>),
            },
            {
                path: "*", 
                Component: ErrorPage,
            }
        ]
    },

]);

export default router;