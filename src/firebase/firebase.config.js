// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBoiJGIw-JtEvYKnXwOeNKbgveOKuuAuyg",
  authDomain: "react-auth-appstore.firebaseapp.com",
  projectId: "react-auth-appstore",
  storageBucket: "react-auth-appstore.firebasestorage.app",
  messagingSenderId: "808195290304",
  appId: "1:808195290304:web:53440cc538157edf03e925"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;