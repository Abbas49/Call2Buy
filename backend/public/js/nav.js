(() => {
    console.log("nav");

    const domain = window.location.origin;
    const navLoginBtn = document.getElementById("nav-login");
    const navRegisterBtn = document.getElementById("nav-register");
    const navLogoutBtn = document.getElementById("nav-logout");
    const navUsername = document.getElementById("nav-username");

    window.addEventListener("DOMContentLoaded", (e) => {
        const name = sessionStorage.getItem("UserName");
        if (name) {
            navLoginBtn.style.display = "none";
            navRegisterBtn.style.display = "none";
            navUsername.innerText = `👤${name}`
            navLogoutBtn.style.display = "flex";
            navUsername.style.display = "flex";
        }

        var requestOptions = {
            method: 'GET',
            cache: 'no-store'
        };
        fetch(domain + "/api/v1/username", requestOptions)
            .then(response => {
                if (response.status != 200) {
                    throw new Error("User is not logged in");
                }
                return response.json()
            })
            .then(result => {
                const name = result.message.split(" ")[0];
                navLoginBtn.style.display = "none";
                navRegisterBtn.style.display = "none";
                navUsername.innerText = `👤${name}`
                navLogoutBtn.style.display = "flex";
                navUsername.style.display = "flex";
                sessionStorage.setItem("UserName", name);
            })
            .catch(error => {
                console.log('error', error)
                if(location.pathname.startsWith("/sell-item")){
                    alert("You are not logged in. Please login to continue.");
                    window.location.href = "/login";
                }
                sessionStorage.removeItem("UserName");
            });
    })



    navLogoutBtn.addEventListener("click", (event) => {
        fetch(domain + "/api/v1/auth/logout").then((response) => {
            navLoginBtn.style.display = "flex";
            navRegisterBtn.style.display = "flex";
            navLogoutBtn.style.display = "none";
            navUsername.style.display = "none";
            sessionStorage.removeItem("UserName");
        })
    })
})();