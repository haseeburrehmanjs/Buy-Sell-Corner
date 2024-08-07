import {
    signInWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { auth } from "../config.js";

let email = document.querySelector('#email')
let password = document.querySelector('#password')
let form = document.querySelector('#form')

form.addEventListener('submit', event => {
    event.preventDefault()

    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user);
            window.location = './index.html'
        })
        .catch((error) => {
            const errorMessage = error.message;
            alert(errorMessage)
        });
})


