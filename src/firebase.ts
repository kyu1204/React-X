import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAcsWyFojx8rVr1nNfecl6FRBpTOJaKJBY",
  authDomain: "react-x-f4ae1.firebaseapp.com",
  projectId: "react-x-f4ae1",
  storageBucket: "react-x-f4ae1.appspot.com",
  messagingSenderId: "737569960590",
  appId: "1:737569960590:web:1c87c796b78d4504fa0fdf",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
