// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBG0O7MNEu8uIVW6Ct0rjhSZU7_g4NSIbo",
  authDomain: "pokedex-6eb9f.firebaseapp.com",
  projectId: "pokedex-6eb9f",
  storageBucket: "pokedex-6eb9f.firebasestorage.app",
  messagingSenderId: "424873754368",
  appId: "1:424873754368:web:42952814ba55006b1d3de5",
  measurementId: "G-FL548YJ8SH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);