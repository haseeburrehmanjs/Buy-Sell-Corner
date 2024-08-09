import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { onAuthStateChanged, signOut, } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { auth, db } from "../config.js";

// use html element in javascript
let logoutBtn = document.querySelector('#logoutBtn')
let userIcon = document.querySelector('#userIcon')
let loginDiv = document.querySelector('#loginDiv')
let product_title = document.querySelector('#product_title')
let Product_Description = document.querySelector('#Product_Description')
let product_Price = document.querySelector('#product_Price')
let UserName = document.querySelector('#UserName')
let phone_number = document.querySelector('#phone_number')
let productImage = document.querySelector('#productImage')
let form = document.querySelector('#form')


// check user status user login or not
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;
        const q = query(collection(db, "users"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            let data = doc.data()
            userIcon.src = data.photoUrl
        });
    } else {
        console.log('user is not here');
        loginDiv.innerHTML = `<a href="./login.html"><button class="btn btn-dark">login</button></a>`
        !user ? window.location = './login.html' : console.log('user ha ');
    }
});

form.addEventListener('submit', event => {
    event.preventDefault()
    
    console.log(productImage.files[0]);
    console.log(product_title.value);
    console.log(Product_Description.value);
    console.log(product_Price.value);
    console.log(UserName.value);
    console.log(phone_number.value);
})

// logout function
logoutBtn.addEventListener('click', () => {
    signOut(auth).then(() => {
        Swal.fire({
            title: 'Success!',
            text: 'Log-out Successfully',
            icon: 'success',
            confirmButtonText: 'Login'
        })
            .then((result) => {
                if (result.isConfirmed) {
                    window.location = './login.html'
                }
            });
        // window.location = './login.html'
    }).catch((error) => {
        // An error happened.
    });
})