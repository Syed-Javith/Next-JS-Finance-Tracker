import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAhtGW2Y77TwaeYVju-Bpcg1CQ4XrVW-u0",
  authDomain: "react-project-cd1b7.firebaseapp.com",
  projectId: "react-project-cd1b7",
  storageBucket: "react-project-cd1b7.appspot.com",
  messagingSenderId: "308639270272",
  appId: "1:308639270272:web:09e3e47c4b7e70e4beed65"
};
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
