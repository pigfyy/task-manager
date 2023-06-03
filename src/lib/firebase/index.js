import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCvt-uHSKgVtqAvwwi6Ua3TOsd6nLwWbY0",
  authDomain: "kanban-3f3b3.firebaseapp.com",
  projectId: "kanban-3f3b3",
  storageBucket: "kanban-3f3b3.appspot.com",
  messagingSenderId: "1042921179561",
  appId: "1:1042921179561:web:6c8a9065277a7b937a5cb8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
