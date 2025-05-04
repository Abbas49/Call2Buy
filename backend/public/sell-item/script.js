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


    document.addEventListener("wheel", function(event){ 
    if(document.activeElement.type === "number"){
            document.activeElement.blur();    
    }
    });
})()