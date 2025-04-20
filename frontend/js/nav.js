console.log("nav");

const navLoginBtn = document.getElementById("nav-login");
const navRegisterBtn = document.getElementById("nav-register");


window.addEventListener("DOMContentLoaded", (e)=>{
    var requestOptions = {
        method: 'GET',
    };

    fetch("http://localhost:3000/", requestOptions)
    .then(response => response.text())
    .then(result =>{
        console.log(result)
    })
    .catch(error => console.log('error', error));
})