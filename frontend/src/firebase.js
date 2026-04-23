import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAHDWVbWJ1yLNtOdUbg7ui3vzfqODxMvvI",
  authDomain: "suplementos-mb.firebaseapp.com",
  projectId: "suplementos-mb",
  storageBucket: "suplementos-mb.firebasestorage.app",
  messagingSenderId: "930401451051",
  appId: "1:930401451051:web:eddf9c93612b8641c97e6e",
  measurementId: "G-8Y188NMRF8"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
