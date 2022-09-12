import { initializeApp } from "firebase/app";
import {
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth/react-native";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import "firebase/compat/auth";

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyClr0s6vMUQ_A7NUJUxuDpkVbjDHEJDi70",
  authDomain: "spot-the-bot-9c3fc.firebaseapp.com",
  projectId: "spot-the-bot-9c3fc",
  storageBucket: "spot-the-bot-9c3fc.appspot.com",
  messagingSenderId: "936423161614",
  appId: "1:936423161614:web:56059364a2c1da9023e15f",
};

export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);

export const auth = getAuth(app);
