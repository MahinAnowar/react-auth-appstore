<div align="center">
  <img src="https://raw.githubusercontent.com/FortAwesome/Font-Awesome/6.x/svgs/solid/store.svg" alt="AppStore Icon" width="80"/>
  <h1>AppStore Platform</h1>
  <p>
    Discover, install, and review apps tailored to your interests.
  </p>
  <p>
    <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React JS" />
    <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router" />
    <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase" />
    <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
    <img src="https://img.shields.io/badge/DaisyUI-1AD1A5?style=for-the-badge&logo=daisyui&logoColor=black" alt="DaisyUI" />
  </p>
</div>

---

## 🚀 Project Overview

The AppStore Platform is a web application designed to provide a user-centric experience for discovering, installing (simulated), and reviewing a variety of applications. The platform features trending apps, categorized browsing, and user authentication, aiming to simplify app management and promote engagement.

This project was developed as part of **Assignment-09 (Category: Lavender)** of Programming Hero Level-1 Web Development Course.

## ✨ Live URL

**Live Site:**  https://react-auth-appstore.web.app

## 🔑 Key Features

*   **Dynamic Homepage:** Showcases trending apps and apps categorized by Productivity, Gaming, and Education.
*   **App Discovery:** Users can browse apps and view detailed information for each.
*   **App Details Page:** Displays comprehensive information about each app, including name, developer, description, features, downloads, rating, and banner/logo.
*   **User Authentication:**
    *   Email/Password Registration & Login.
    *   Google Sign-In.
    *   Forgot Password functionality.
*   **User Profile Management:** Authenticated users can view and update their profile (name and photo URL).
*   **Session-Based Reviews:** Logged-in users who have "installed" an app can submit reviews (rating and comments) which are visible during the current session.
*   **Install/Uninstall Simulation:** Users can click to "Install" or "Uninstall" apps, affecting their ability to review.
*   **Responsive Design:** Fully responsive interface for optimal viewing on mobile, tablet, and desktop devices.
*   **Dynamic Page Titles:** Each page has a unique and descriptive title for better UX and SEO.
*   **Secure Environment Variables:** Firebase configuration keys are secured using environment variables.
*   **Error Handling:** Includes a custom 404 Not Found page and user feedback via SweetAlert2.
*   **Extra Custom Section:** "Most Downloaded Apps" section on the homepage.
*   **Extra Route:** Includes an FAQ page.

## 🛠️ Technologies & Packages Used

*   **Frontend Library:**
    *   <img src="https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB" alt="React JS" /> React.js (v18+)
*   **Routing:**
    *   <img src="https://img.shields.io/badge/React_Router-CA4245?style=flat&logo=react-router&logoColor=white" alt="React Router" /> React Router DOM (v6)
*   **Backend & Authentication:**
    *   <img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=black" alt="Firebase" /> Firebase (Authentication, Hosting - optional)
*   **Styling:**
    *   <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" /> Tailwind CSS
    *   <img src="https://img.shields.io/badge/DaisyUI-1AD1A5?style=flat&logo=daisyui&logoColor=black" alt="DaisyUI" /> DaisyUI (Tailwind CSS Component Library)
*   **Notifications:**
    *   SweetAlert2
*   **Dynamic Page Titles:**
    *   Direct DOM manipulation (`document.title`) via `useEffect` hook.
    *   _(Alternatively, if react-helmet-async was used: `react-helmet-async`)_
*   **Icons:**
    *   React Icons (e.g., `FcGoogle`)

## ⚙️ Environment Variables

To run this project locally with Firebase integration, you will need to set up your own Firebase project and create a `.env.local` (for Vite) or `.env` (for Create React App) file in the root directory with the following Firebase configuration keys:

```env
# For Vite projects (prefix with VITE_)
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id

# For Create React App projects (prefix with REACT_APP_)
# REACT_APP_FIREBASE_API_KEY=your_api_key
# ... and so on for other keys
