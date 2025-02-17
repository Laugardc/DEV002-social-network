import { initializeApp } 
from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js';
// from "firebase/app";
import { getAuth } 
from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js';
// from "firebase/auth";

const firebaseConfig = {
  apiKey: 'AIzaSyCLeEKdWYHeyxAAPoZ3-tpRs85uDEc9iYg',
  authDomain: 'reading-club-43baf.firebaseapp.com',
  projectId: 'reading-club-43baf',
  storageBucket: 'reading-club-43baf.appspot.com',
  messagingSenderId: '93329318817',
  appId: '1:93329318817:web:b0b22eb377191fa03be1e0',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
