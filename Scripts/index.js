import { onAuthStateChanged, signOut, } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { auth, db } from "../config.js";

// use html element in javascript
let logoutBtn = document.querySelector('#logoutBtn')
let userIcon = document.querySelector('#userIcon')
let loginDiv = document.querySelector('#loginDiv')
let card_section  = document.querySelector('.card_section ')

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
        // window.location = './login.html'
    }).catch((error) => {
        // An error happened.
    });
})

let productData = [];

async function renderScreen() {
    const querySnapshot = await getDocs(collection(db, "product_details"));
    querySnapshot.forEach((doc) => {
        let data = doc.data()
        productData.push({
            data
        })
        console.log(productData);
    });
        productData.map((item,index) => {
            console.log(item.data);
            
            card_section.innerHTML += `
            <div class="card overflow-hidden " style="width: 18rem;">
                <div class="card text-center">
                <img src="${item.data.productImage}" class=" card-img-top" alt="...">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${item.data.product_title}</h5>
                    <h5 class="card-title">Rs ${item.data.product_Price}</h5>
                    <details>
                    <summary>Description</summary>
                    <p class="card-text">${item.data.Product_Description}</p>
                    </details>
                    <a href="#" class="btn btn-primary">Read More</a>
                </div>
            </div>
            `
        })
    
}
renderScreen()