const form = document.querySelector("form");
const domain = window.location.origin;

form.addEventListener("submit", (event)=>{
    event.preventDefault();
    console.log("test");
    const email = document.getElementById("email-input").value
    const fullName = document.getElementById("fullname").value
    const password = document.getElementById("password").value
    const confirmPassword = document.getElementById("password").value
    if(password != confirmPassword){
        alert("Passwords do not match. Please make sure both fields are identical.");
    }
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "email": email,
        "password": password,
        "full_name": fullName
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        credentials: 'include',
        redirect: 'follow'
    };

    fetch(domain + "/api/v1/auth/register", requestOptions)
    .then(async (response) =>{
        let result = await response.json();
        result.status = response.status;
        return result;
    })
    .then(result =>{
        if(result.status != 200){
            throw new Error(result.message);
        }
        alert("Welcome!");
        window.location.href = domain + "/login";
    })
    .catch(error =>{
        alert(error.message);
        console.log('error', error)
    });

})