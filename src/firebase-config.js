// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: "AIzaSyBSiDlnhDDwZXrandocSfvwKfiYmCgHfr4",

  authDomain: "firechat2-80c76.firebaseapp.com",

  projectId: "firechat2-80c76",

  storageBucket: "firechat2-80c76.appspot.com",

  messagingSenderId: "375538184133",

  appId: "1:375538184133:web:7b5a1d03abc664167d25ac",

  measurementId: "G-6F6YJ5ENVX"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);