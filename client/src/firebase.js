// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-state-a0b7b.firebaseapp.com",
  projectId: "mern-state-a0b7b",
  storageBucket: "mern-state-a0b7b.appspot.com",
  messagingSenderId: "892579546910",
  appId: "1:892579546910:web:939b937e649c6ab881ab0f"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);