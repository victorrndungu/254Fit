import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZL1QOEV8h0rv0fJQ4Kgwj3kKHZZGMP7U",
  authDomain: "ffit-9d431.firebaseapp.com",
  projectId: "ffit-9d431",
  storageBucket: "ffit-9d431.appspot.com",
  messagingSenderId: "39281370085",
  appId: "1:39281370085:web:342ae56bfb842c75db850c",
  measurementId: "G-SZXJKXS4D3"
};

export default firebaseConfig;