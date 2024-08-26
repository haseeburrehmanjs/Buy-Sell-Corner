import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js";
import { collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.12.5/firebase-firestore.js";
import { auth, db } from "../config.js";

// use html element in javascript
let logoutBtn = document.querySelector('#logoutBtn');
let userIcon = document.querySelector('#userIcon');
let loginDiv = document.querySelector('#loginDiv');
let card_section = document.querySelector('.card_section');
let text_silder = document.querySelector('#text_silder');
let searchInput = document.querySelector('#search_input'); // Add an input field in your HTML with this id

let productData = [];

// check user status user login or not
onAuthStateChanged(auth, async (user) => {
    if (user) {
        const uid = user.uid;
        const q = query(collection(db, "users"), where("uid", "==", uid));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            let data = doc.data();
            userIcon.src = data.photoUrl;
        });
    } else {
        console.log('user is not here');
        loginDiv.innerHTML = `<a href="./login.html"><button class="btn btn-dark">login</button></a>`;
        text_silder.innerHTML = `<marquee direction="" class="text-danger mt-2">Do you want to ad post first login and then click profile icon</marquee>`;
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
            window.location = './postad.html';
        }
    });
});

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
                window.location = './login.html';
            }
        });
    }).catch((error) => {
        // An error happened.
    });
});

async function renderScreen(filteredData = productData) {
    card_section.innerHTML = ''; // Clear previous cards
    filteredData.forEach((item, index) => {
        card_section.innerHTML += `
        <div class="product-card">
            <div class="product-image">
                <img src="${item.productImage}" alt="${item.product_title}">
            </div>
            <div class="product-info">
                <h2>${item.product_title}</h2>
                <h2>Contact Seller: ${item.phone_number}</h2>
                <p class="price"><span>Rs ${item.product_Price}</span></p>
                <button id="adToCard">Read More</button>
            </div>
        </div>
        `;
    });

    let adToCard = document.querySelectorAll('#adToCard');

    adToCard.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            localStorage.setItem('sendlocal', JSON.stringify(filteredData[index]));
            window.location = '../singalProduct.html';
        });
    });
}

async function fetchProducts() {
    const querySnapshot = await getDocs(collection(db, "product_details"));
    querySnapshot.forEach((doc) => {
        let data = doc.data();
        productData.push(data);
    });
    renderScreen();
}

fetchProducts();

// Add event listener for search input
searchInput.addEventListener('input', (e) => {
    const searchText = e.target.value.toLowerCase();
    const filteredData = productData.filter(product => product.product_title.toLowerCase().includes(searchText));
    renderScreen(filteredData);
});
