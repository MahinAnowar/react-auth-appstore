import { createBrowserRouter } from "react-router-dom";
import { HomeLayout } from "../Layouts/HomeLayout";
import { Login } from "../Pages/login/Login";
import { SignUp } from "../Pages/SignUp/SignUp";
import { Faq } from "../Pages/FAQ/Faq";

const router = createBrowserRouter(
    [
        {
            path: "/",
            Component: HomeLayout,
            children:[
                {
                    path: "/login",
                    Component: Login,
                },
                {
                    path: "/signup",
                    Component: SignUp,
                },
                {
                    path:"/faq",
                    Component: Faq,
                },
                {
                    path:"/*",
                    element: <h1>404</h1>,
                }
            ]
        }

    ]
);

export default router;
