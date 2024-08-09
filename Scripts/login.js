import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { auth } from "../config.js";

// html element use in javascript!
let form = document.querySelector("#form")
let email = document.querySelector("#email")
let password = document.querySelector("#password")
let loginBtn = document.querySelector("#loginBtn")

form.addEventListener('submit', event => {
    event.preventDefault()

    signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential) => {
            const user = userCredential.user;
            loginBtn.innerHTML = `<img class="loading" src="./Assets/Images/load-37_256.gif" alt="">`
            console.log(user);
            window.location = './index.html'
        })
        .catch((error) => {
            const errorMessage = error.message;
            console.log(errorMessage);
        });
})