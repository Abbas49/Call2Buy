(() => {
    const domain = window.location.origin;
    const edit = document.querySelector(".edit button");
    const cancel = document.getElementById("cancel-btn");
    const saveBtn = document.getElementById("save-btn");
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

    const currentPasswordInput = document.getElementById("current-password");
    const newPasswordInput = document.getElementById("new-password");
    const confirmPasswordInput = document.getElementById("confirm-password");

    const editForm = document.getElementById("edit-form");
    const updatePasswordForm = document.getElementById("update-password-form");
    const deleteAccountBtn = document.getElementById("delete-account-btn");

    edit.addEventListener("click", () => {
        let main = document.querySelector(".hidden");
        let accountInfo = document.querySelector(".info-item");
        main.style.display = "block";
        accountInfo.style.display = "none";

        fullNameInput.value = fullName.innerText.trim();
        emailInput.value = email.innerText.trim();
        phoneInput.value = phone.innerText.trim();
        locationInput.value = location.innerText.trim();
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

    editForm.addEventListener("submit", (e) =>{
        e.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const data = {}
        if(fullNameInput.value) data.full_name = fullNameInput.value;
        if(emailInput.value) data.email = emailInput.value;
        if(phoneInput.value) data.phone = phoneInput.value;
        if(locationInput.value) data.user_address = locationInput.value;

        saveBtn.innerText = `Saving...`
        

        var raw = JSON.stringify(data);

        var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("/api/v1/users", requestOptions)
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
            alert("Your information has been updated successfully!");
            window.location.reload();
            saveBtn.innerText = `Save Changes`
        })
        .catch(error =>{
            saveBtn.innerText = `Save Changes`
            alert(error.message);
            console.log('error', error)
        });
    })


    updatePasswordForm.addEventListener("submit", (e) => {
        e.preventDefault();
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");


        if(newPasswordInput.value != confirmPasswordInput.value){
            alert("New password and confirm password do not match");
            return;
        }
        updatePasswordBtn.innerText = `Changing...`

        var raw = JSON.stringify({
            current_password: currentPasswordInput.value,
            password: newPasswordInput.value,
        });

        var requestOptions = {
        method: 'PUT',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
        };

        fetch("/api/v1/users", requestOptions)
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
            alert("Your password has been changed successfully!");
            window.location.reload();
            updatePasswordBtn.innerText = `Update Password`
        })
        .catch(error =>{
            updatePasswordBtn.innerText = `Update Password`
            alert(error.message);
            console.log('error', error)
        });
    })

    deleteAccountBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        if(confirm("Are you sure you want to delete your account? This action cannot be undone.")){
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            var raw = JSON.stringify({});

            var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
            };

            fetch("/api/v1/users", requestOptions)
            .then(async (response) =>{
                console.log(response)
                let result = await response.json();
                result.status = response.status;
                return result;
            })
            .then(async (result) =>{
                if(result.status != 200){
                    throw new Error(result.message);
                }
                alert("Your account has been deleted successfully!");
                sessionStorage.removeItem("UserName");
                window.location.href = domain + "/home";
            })
            .catch(error =>{
                alert(error.message);
                console.log('error', error)
            });
        }
    })

    const deleteProductBtns = document.querySelectorAll(".delete-product-button");
    deleteProductBtns.forEach((btn) => {
        btn.addEventListener("click", async (e) => {
            e.preventDefault();
            if(confirm("Are you sure you want to delete this product? This action cannot be undone.")){
                const productId = btn.getAttribute("data-product-id");
                var myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                btn.innerText = `Deleting...`

                var raw = JSON.stringify({
                    product_id: productId
                });

                var requestOptions = {
                method: 'DELETE',
                headers: myHeaders,
                body: raw,
                redirect: 'follow'
                };

                fetch("/api/v1/products/", requestOptions)
                .then(async (response) =>{
                    console.log(response)
                    let result = await response.json();
                    result.status = response.status;
                    return result;
                })
                .then(async (result) =>{
                    if(result.status != 200){
                        throw new Error(result.message);
                    }
                    alert("Your product has been deleted successfully!");
                    btn.innerText = `Delete`
                    btn.parentElement.parentElement.remove();
                })
                .catch(error =>{
                    btn.innerText = `Delete`
                    alert(error.message);
                    console.log('error', error)
                });
            }
        })
    })

})()