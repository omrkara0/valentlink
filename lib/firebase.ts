
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDIMgNDTJTm1jVR0LnsSXYDl29ABtWx9eY",
    authDomain: "valentlink.firebaseapp.com",
    projectId: "valentlink",
    storageBucket: "valentlink.firebasestorage.app",
    messagingSenderId: "738314872603",
    appId: "1:738314872603:web:b854b3b659c6f1367c55be"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
