import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCiosUAwCDYjagSYx7ooVrnqEenVCIkWlM",
  authDomain: "technical-assignment-2bb6f.firebaseapp.com",
  projectId: "technical-assignment-2bb6f",
  storageBucket: "technical-assignment-2bb6f.firebasestorage.app",
  messagingSenderId: "442574533467",
  appId: "1:442574533467:web:5fb902c50804a32208e07e",
  measurementId: "G-FBSC14ES7V",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
