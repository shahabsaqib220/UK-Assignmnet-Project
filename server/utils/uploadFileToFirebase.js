// utils/uploadFileToFirebase.js
const { getStorage, ref, uploadBytes, getDownloadURL } = require('firebase/storage');
const { initializeApp } = require('firebase/app');
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

const uploadFileToFirebase = async (file) => {
  const storageRef = ref(storage, `files/${file.originalname}`);
  const snapshot = await uploadBytes(storageRef, file.buffer);
  return getDownloadURL(snapshot.ref);
};

module.exports = uploadFileToFirebase;
