// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkU6yR27Z8IcJdUyUSrRXKQVyagNMPvgg",
  authDomain: "diafit-17fe1.firebaseapp.com",
  projectId: "diafit-17fe1",
  storageBucket: "diafit-17fe1.appspot.com",
  messagingSenderId: "826373813633",
  appId: "1:826373813633:web:713c53544f418e7146a480"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(app)
const firestoredb = getFirestore(app)

export {app, firebaseAuth, firestoredb}