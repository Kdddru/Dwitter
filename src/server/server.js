// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC3dLb5c-kFCNvtOexZTObWkFwQOfKR9IA",
  authDomain: "dwitter-c2a57.firebaseapp.com",
  projectId: "dwitter-c2a57",
  storageBucket: "dwitter-c2a57.appspot.com",
  messagingSenderId: "105451401577",
  appId: "1:105451401577:web:d2c0ce1396aafb6cb98df8",
  measurementId: "G-6FPEJG3PZ0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);