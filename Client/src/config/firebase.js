// src/firebase.js
import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBmd20hN6g5kl1oEyC4LPBuLbudi-Anqq8",
  authDomain: "assignment-ask3.firebaseapp.com",
  projectId: "assignment-ask3",
  storageBucket: "assignment-ask3.appspot.com",
  messagingSenderId: "921426202297",
  appId: "1:921426202297:web:aff1534f90814249539568",
  measurementId: "G-DMFLH3CTDJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, ref, uploadBytes, getDownloadURL };
