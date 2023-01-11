// import { initializeApp } from "firebase/app";
// import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
// import { getFirestore, collection, addDoc } from "firebase/firestore";

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, sendEmailVerification } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, query } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCLeEKdWYHeyxAAPoZ3-tpRs85uDEc9iYg",
  authDomain: "reading-club-43baf.firebaseapp.com",
  projectId: "reading-club-43baf",
  storageBucket: "reading-club-43baf.appspot.com",
  messagingSenderId: "93329318817",
  appId: "1:93329318817:web:b0b22eb377191fa03be1e0",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// Initialize Firebase Auth
export const auth = getAuth(app);
// Initialize Firestore
const db = getFirestore();
const orderCollection = collection(db, "user");

//-------- REGISTER Se guarda el Email y el password del usuario y el nombre----------
export const registerUser = (email, password, displayName) => {
  createUserWithEmailAndPassword(auth, email, password) //pide estos 3 elementos para funcionar
    .then(async (userCredential) => {
      // Signed in 
      const user = userCredential.user;//crea un usuario
      const userId = user.uid;
      emailVerification(auth);
      addNewDocument(userId, displayName);
    })
    .catch(async (error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert('Este correo electrónico ya existe.');
      const allUsers = query(collection(db, "user"));
      let allDocs = await getDocs(allUsers);
      console.log(allDocs);
    });
}

//------ Se ingresan los valores Firestore Datebase ----------
async function addNewDocument(userId, displayName) {
  const newDoc = await addDoc(orderCollection, {
    uid: userId,
    displayName: displayName,//se va a guardar este "objeto" con el uid y el displayNAme
  });
};

//------ Enviar correo de validación de Google -------
function emailVerification(auth) {
  sendEmailVerification(auth.currentUser)
    .then(() => {
      alert('Se ha enviado un mensaje de verificación a tu correo electrónico, por favor revisalo y verifica tu registro. Luego inicia sesión.');
    });
}