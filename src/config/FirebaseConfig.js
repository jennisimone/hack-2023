// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCo5NUIt42DfYgPiZOd7LHqoj980DuG3Xo",
    authDomain: "hack-2023-b6fd3.firebaseapp.com",
    projectId: "hack-2023-b6fd3",
    storageBucket: "hack-2023-b6fd3.appspot.com",
    messagingSenderId: "842375744144",
    appId: "1:842375744144:web:054eaaa7234781f5b7a615",
    measurementId: "G-X6850QH5Q2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);