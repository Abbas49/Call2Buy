const form = document.querySelector("form");

const domain = window.location.origin;

form.addEventListener("submit", (event)=>{
    event.preventDefault();
    console.log("login")
    const email = document.getElementById("email-input").value
    const password = document.getElementById("password-input").value
    const checkBtn = document.querySelector("#remember-me").checked
    console.log(email);
    console.log(password);

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "email": email,
        "password": password,
        "remember_me": checkBtn
    });

    var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    credentials: 'include',
    redirect: 'follow'
    };

    fetch("http://localhost:3000/api/v1/auth/login", requestOptions)
    .then(async (response) =>{
        console.log(response)
        let result = await response.json();
        result.status = response.status;
        return result;
    })
    .then(result =>{
        if(result.status != 200){
            throw new Error(result.message);
        }
        // window.location.href = domain + "/frontend/home";
    })
    .catch(error =>{
        alert(error.message);
        console.log('error', error)
    });
})