import { onAuthStateChanged, signOut, } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { auth, db } from "../config.js";

// use html element in javascript
let logoutBtn = document.querySelector('#logoutBtn')
let userIcon = document.querySelector('#userIcon')
let main_card_box = document.querySelector('.main_card_box')
let main_product_head = document.querySelector('#main_product_head')

let getData = JSON.parse(localStorage.getItem('sendlocal'))
console.log(getData);

function renderScreen(){
    main_product_head.innerHTML = getData.product_title
   main_card_box.innerHTML = `
   <div class="d-flex justify-content-center gap-5 flex-wrap">
                <div class="main_card_image rounded-4">
                    <img id="product_image" src="${getData.productImage}" alt="">
                </div>
                <div class="mt-3">
                    <h3 id="product_price">Rs: ${getData.product_Price}</h3>
                    <h3 class="mt-3" id="product_title">${getData.product_title}</h3>
                    <p class="mt-2" id="product_description"><spna><h6> Description</h6></spna>${getData.Product_Description}</p>
                    <div class="user_section rounded-4 mt-3 d-flex align-items-center gap-2">
                        <div>
                            <img id="user_image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOtu74pEiq7ofeQeTsco0migV16zZoBwSlGg&s" alt="">
                        </div>
                        <hr />
                        <div class="mt-3">
                            <h6 id="userName">${getData.UserName}</h6>
                            <p id="phone_number">${getData.phone_number}</p>
                        </div>
                    </div>
                    <div>
                        <a href=""><button id="whatsapp_btn" class="btn btn-success mt-3">Whatsapp</button></a>
                    </div>
                </div>
            </div>
   `
}
renderScreen()

let whatsapp_btn = document.querySelector('#whatsapp_btn')

whatsapp_btn.addEventListener('click', event => {
    event.preventDefault()
    console.log('whatsapp');
    Swal.fire({
        title: 'Whatsapp!',
        text: 'WhatsApp button is comming Soon!',
        confirmButtonText: 'Ok',
        // icon: 'error',
    })
        .then((result) => {
            if (result.isConfirmed) {
                // window.location = '../index.html'
            }
        });
})



// check user status user login or not
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;
        const q = query(collection(db, "users"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            let data = doc.data()
            userIcon.src = data.photoUrl
            // user_image.src = data.photoUrl
        });

    } else {
        Swal.fire({
            title: 'Setting!',
            text: 'Please Login First',
            confirmButtonText: 'Login',
            icon: 'error',
        })
            .then((result) => {
                if (result.isConfirmed) {
                    window.location = '../index.html'
                }
            });
        
        // loginDiv.innerHTML = `<a href="./login.html"><button class="btn btn-dark">login</button></a>`
    }
});

userIcon.addEventListener('click', () => {
    Swal.fire({
        title: 'Setting!',
        text: 'Do you want to Ad post',
        confirmButtonText: 'Ad Post'
    })
        .then((result) => {
            if (result.isConfirmed) {
                window.location = './postad.html'
            }
        });
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
    }).catch((error) => {
        // An error happened.
    });
})