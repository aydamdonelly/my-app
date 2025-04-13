import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCqXaUSpNcHnYHjjCG8SWfuXbxZB_mUYyY",
  authDomain: "gender-support-likes.firebaseapp.com",
  databaseURL: "https://gender-support-likes-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "gender-support-likes",
  storageBucket: "gender-support-likes.firebasestorage.app",
  messagingSenderId: "528393993613",
  appId: "1:528393993613:web:2be2d79d9fcf46099791c4",
  measurementId: "G-QYF3ZMDNEH"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();