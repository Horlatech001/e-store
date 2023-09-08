import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const firebaseConfig = {
    apiKey: "AIzaSyCzUXguBMQ30DPvwJkKmD0HmadMWog6PmY",
    authDomain: "e-commerce-57484.firebaseapp.com",
    projectId: "e-commerce-57484",
    storageBucket: "e-commerce-57484.appspot.com",
    messagingSenderId: "1032144612085",
    appId: "1:1032144612085:web:be936d667d49980501f3bc"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Firebase Auth
const auth = getAuth(app);

export { auth, db };
