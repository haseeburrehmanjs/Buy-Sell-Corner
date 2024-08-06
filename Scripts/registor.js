let form = document.querySelector('#form')
let email = document.querySelector('#email')
let password = document.querySelector('#password')
let myFile = document.querySelector('#myfile')


form.addEventListener('submit', event => {
    event.preventDefault()

    console.log(email.value);
    console.log(password.value);
    console.log(myFile.files[0]);
})