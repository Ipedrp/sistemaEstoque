// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCI9CXDBBE0HYj0xgSB_LyWyNm3VMNyJAk",
  authDomain: "autopecas-1.firebaseapp.com",
  projectId: "autopecas-1",
  storageBucket: "autopecas-1.appspot.com",
  messagingSenderId: "761061970992",
  appId: "1:761061970992:web:1cd700dfdb864405ecc9f5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore(app);
export default app;