// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDrAIAtaa7XJ0NhTzIP8DdnQkyWf3KtpQM",
  authDomain: "resume-builder-21f74.firebaseapp.com",
  databaseURL: "https://resume-builder-21f74-default-rtdb.firebaseio.com",
  projectId: "resume-builder-21f74",
  storageBucket: "resume-builder-21f74.firebasestorage.app",
  messagingSenderId: "568345503535",
  appId: "1:568345503535:web:30e56f3bf18e49e4f323da",
  measurementId: "G-JP11D8E6QG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);