(() => {
    const domain = window.location.origin;
    const form = document.querySelector("form");
    const aiBtn = document.getElementById("ai-btn");

    function createRemoveImageButton(target, input) {
        const button = document.createElement("button");
        button.classList.add("remove-image-btn");
        button.innerText = 'x';
        target.appendChild(button);
        button.addEventListener("mouseup", (e) => {
            target.style.removeProperty('background-image')
            target.style.removeProperty('color')
            target.style.removeProperty('border-style')
            input.value = "";
            e.target.remove();
        })
    }

    images = document.querySelectorAll(".image-input");
    images.forEach(element => {
        element.addEventListener("change", (e) => {
            const changedElement = e.target
            const uploadedImage = URL.createObjectURL(changedElement.files[0]);
            const label = document.querySelector(`label[for="${changedElement.id}"]`);
            label.style.backgroundImage = `url('${uploadedImage}')`
            label.style.color = "transparent"
            label.style.borderStyle = "solid"
            createRemoveImageButton(label, changedElement);
        })
    });

    function createOption(name) {
        const element = document.createElement("option");
        element.value = name;
        element.innerText = name;
        return element;
    }

    window.addEventListener("DOMContentLoaded", (e) => {
        const selectCategory = document.getElementById("select-category");

        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        let requestOptions = {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include',
            redirect: 'follow'
        };

        fetch(`${domain}/api/v1/categories`, requestOptions)
            .then(async (response) => {
                let result = await response.json();
                result.status = response.status;
                return result;
            })
            .then(result => {
                if (result.status != 200) {
                    throw new Error(result.message);
                }
                result.message.forEach((category) => {
                    selectCategory.appendChild(createOption(category));
                })
            })
            .catch(error => {
                // alert(error.message);
                console.log('error', error)
            });
    })

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const images = document.querySelectorAll(".image-input");
        const titleInput = document.getElementById("title-input").value;
        const descriptionInput = document.getElementById("textarea").value;
        const selectCategory = document.getElementById("select-category").value;
        const selectCondition = document.getElementById("select-condition").value;
        const priceInput = document.getElementById("price-input").value;
        const addressInput = document.getElementById("address-input").value;
        const phoneInput = document.getElementById("phone-input").value;
        const listProductBtn = document.getElementById("list-product-btn");
        listProductBtn.innerText = "Listing...";

        console.log('Images:', images);
        console.log('Title Input:', titleInput);
        console.log('Description Input:', descriptionInput);
        console.log('Category Select:', selectCategory);
        console.log('Condition Select:', selectCondition);
        console.log('Price Input:', priceInput);
        console.log('Address Input:', addressInput);
        console.log('Phone Input:', phoneInput);


        var formdata = new FormData();
        const data = {
            title: titleInput,
            product_description: descriptionInput,
            price: priceInput,
            condition: selectCondition,
            categories: [selectCategory],
            product_address: addressInput,
            phone: phoneInput,
            // visiability: "private",
        }
        formdata.append("data", JSON.stringify(data));
        images.forEach((image) => {
            formdata.append("photo", image.files[0]);
        })

        var requestOptions = {
            method: 'POST',
            body: formdata,
            redirect: 'follow'
        };

        fetch(domain + "/api/v1/products", requestOptions)
            .then(async (response) => {
                let result = await response.json();
                result.status = response.status;
                return result;
            })
            .then(result => {
                if (result.status != 200) {
                    throw new Error(result.message);
                }
                alert("Your product has been successfully listed on our marketplace. buyers can now view and purchase your item.");
                window.location.href = domain + "/home";
                listProductBtn.innerText = "List Your Product";
            })
            .catch(error => {
                listProductBtn.innerText = "List Your Product";
                alert(error.message);
                console.log('error', error)
            });

    })

    aiBtn.addEventListener("click", (e) => {
        e.preventDefault();
        const descriptionInput = document.getElementById("textarea");
        console.log(descriptionInput);
        const aiBtnTextSave = aiBtn.innerText;
        aiBtn.innerText = "⏳ Processing..."
        let myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "description": descriptionInput.value
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            credentials: 'include',
            redirect: 'follow'
        };

        fetch(domain+"/api/v1/ai/rewrite", requestOptions)
            .then(async (response) => {
                console.log(response)
                let result = await response.json();
                result.status = response.status;
                return result;
            })
            .then(result => {
                if (result.status != 200) {
                    throw new Error(result.message);
                }
                aiBtn.innerText = aiBtnTextSave;
                descriptionInput.value = result.message;
            })
            .catch(error => {
                alert(error.message);
                console.log('error', error)
            });
    })
})()