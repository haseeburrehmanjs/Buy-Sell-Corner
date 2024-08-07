import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";



const firebaseConfig = {
    apiKey: "AIzaSyChqmYvJAxFyH8IJrBdscYwhmbSIqwVrg4",
    authDomain: "buy-sells-corner-b.firebaseapp.com",
    projectId: "buy-sells-corner-b",
    storageBucket: "buy-sells-corner-b.appspot.com",
    messagingSenderId: "667411498745",
    appId: "1:667411498745:web:0904d28bce300a38344428",
    measurementId: "G-JVV4T46LD5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
