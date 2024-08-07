import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
    collection,
    addDoc,
    getDocs
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { auth } from "../config.js";
import { db } from "../config.js";

// html element use in javascript
let logoutBtn = document.querySelector('#logoutBtn')
let userIcon = document.querySelector('#userIcon')

// user status check 
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;
        console.log(uid);

        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
            let data = doc.data()
            userIcon.src = data.photoURL
        });
    } else {
        logoutBtn.innerHTML = 'login'
    }
});

// logout button
logoutBtn.addEventListener('click', () => {
    signOut(auth).then(() => {
        alert('logout succesfully');
    }).catch((error) => {
        console.log(error);
    });
})