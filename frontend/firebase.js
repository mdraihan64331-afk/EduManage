import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "edumanage-faecc.firebaseapp.com",
  projectId: "edumanage-faecc",
  storageBucket: "edumanage-faecc.firebasestorage.app",
  messagingSenderId: "300784252750",
  appId: "1:300784252750:web:64eebb60f5ee2b123cd01f",
  measurementId: "G-109VCXDH31"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)

export {app, auth}