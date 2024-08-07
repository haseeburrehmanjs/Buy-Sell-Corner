import {
    createUserWithEmailAndPassword,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import {
    collection,
    addDoc,
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import {
    uploadBytes,
    getDownloadURL,
    ref,
    getStorage
} from "https://www.gstatic.com/firebasejs/10.12.5/firebase-storage.js";
import { auth } from "../config.js";
import { db } from "../config.js";

const storage = getStorage();

let form = document.querySelector('#form');
let first_name = document.querySelector('#first_name');
let last_name = document.querySelector('#last_name');
let email = document.querySelector('#email');
let password = document.querySelector('#password');
let myFile = document.querySelector('#myfile');

form.addEventListener('submit', async event => {
    event.preventDefault();

    try {
        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        let user = userCredential.user;
        console.log(user);

        const file = myFile.files[0];
        let url = null
        if (file) {
            url = await uploadFile(file, email.value);
            console.log('File URL:', url);
        }

        try {
            const docRef = await addDoc(collection(db, "users"), {
                first_name: first_name.value,
                last_name: last_name.value,
                email: email.value,
                uid: user.uid,
                photoURL: url
            });
            console.log("Document written with ID: ", docRef.id);



            // window.location = './login.html';
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    } catch (error) {
        const errorMessage = error.message;
        alert(errorMessage);
    }
});

async function uploadFile(file, userEmail) {
    const storageRef = ref(storage, userEmail);
    try {
        const uploadImg = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(uploadImg.ref);
        return url;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
