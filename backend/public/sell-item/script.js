(() => {
    const domain = window.location.origin;

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

    function createOption(name){
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
                result.message.forEach((category)=>{
                    selectCategory.appendChild(createOption(category));
                })
            })
            .catch(error => {
                alert(error.message);
                console.log('error', error)
            });
    })
})()