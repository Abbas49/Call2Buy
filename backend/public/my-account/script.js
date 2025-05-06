(() => {
    const edit = document.querySelector(".edit button");
    const cancel = document.getElementById("cancel-btn");
    const save = document.getElementById("save-btn");
    const updatePasswordBtn = document.getElementById("update-password-btn");

    const fullName = document.getElementById("full-name");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const location = document.getElementById("location");

    const fullNameInput = document.getElementById("full-name-input");
    const emailInput = document.getElementById("email-input");
    const phoneInput = document.getElementById("phone-input");
    const locationInput = document.getElementById("location-input");

    const profilePageBtn = document.getElementById("profile-page-btn");
    const myProductsPageBtn = document.getElementById("my-products-page-btn");

    edit.addEventListener("click", () => {
        let main = document.querySelector(".hidden");
        let accountInfo = document.querySelector(".info-item");
        main.style.display = "block";
        accountInfo.style.display = "none";

        fullNameInput.value = fullName.innerText;
        emailInput.value = email.innerText;
        phoneInput.value = phone.innerText;
        locationInput.value = location.innerText;
    })

    cancel.addEventListener("click", (e) => {
        e.preventDefault();
        let main = document.querySelector(".hidden");
        let accountInfo = document.querySelector(".info-item");
        main.style.display = "none";
        accountInfo.style.display = "grid";
    });

    profilePageBtn.addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector(".my-products-section").style.display = "none";
        document.querySelector(".profile-section").style.display = "block";
    });

    myProductsPageBtn.addEventListener("click", (e) => {
        e.preventDefault();
        document.querySelector(".my-products-section").style.display = "block";
        document.querySelector(".profile-section").style.display = "none";
    });

})()