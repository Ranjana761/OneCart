import {getAuth, GoogleAuthProvider} from "firebase/auth"
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "loginonecart-b6057.firebaseapp.com",
  projectId: "loginonecart-b6057",
  storageBucket: "loginonecart-b6057.firebasestorage.app",
  messagingSenderId: "137807329449",
  appId: "1:137807329449:web:1769c9c7ee356ca5ebd1b8"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {auth, provider}