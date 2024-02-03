// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhtGW2Y77TwaeYVju-Bpcg1CQ4XrVW-u0",
  authDomain: "react-project-cd1b7.firebaseapp.com",
  projectId: "react-project-cd1b7",
  storageBucket: "react-project-cd1b7.appspot.com",
  messagingSenderId: "308639270272",
  appId: "1:308639270272:web:09e3e47c4b7e70e4beed65"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
