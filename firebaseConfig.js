// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBUPmUYLHAQOlUjTDKNDwRhnCH5xYatf94",
  authDomain: "diafit-b53af.firebaseapp.com",
  projectId: "diafit-b53af",
  storageBucket: "diafit-b53af.appspot.com",
  messagingSenderId: "318648185935",
  appId: "1:318648185935:web:f882e1570be07bf406263a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app)
const firestoredb = getFirestore(app)

export {app, firebaseAuth, firestoredb}