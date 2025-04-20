console.log("nav");


const navLoginBtn = document.getElementById("nav-login");
const navRegisterBtn = document.getElementById("nav-register");
const navLogoutBtn = document.getElementById("nav-logout");
const navUsername = document.getElementById("nav-username");

window.addEventListener("DOMContentLoaded", (e)=>{
    var requestOptions = {
        method: 'GET',
    };

    fetch("http://localhost:3000/", requestOptions)
    .then(response =>{
        if(response.status != 200){
            throw new Error("User is not logged in");
        }
        return response.json()
    })
    .then(result =>{
        const name = result.message.split(" ")[0];

        navLoginBtn.style.display = "none";
        navRegisterBtn.style.display = "none";
        navUsername.innerText = `👤${name}`
        navLogoutBtn.style.display = "list-item";
        navUsername.style.display = "list-item";
    })
    .catch(error => console.log('error', error));
})



navLogoutBtn.addEventListener("click", (event)=>{
    fetch(domain+"/api/v1/auth/logout").then((response)=>{
        navLoginBtn.style.display = "list-item";
        navRegisterBtn.style.display = "list-item";
        navLogoutBtn.style.display = "none";
        navUsername.style.display = "none";
    })
    
})
