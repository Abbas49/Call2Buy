(()=>{
    function createRemoveImageButton(target, input){
        const button = document.createElement("button");
        button.classList.add("remove-image-btn");
        button.innerText= 'x';
        target.appendChild(button);
        button.addEventListener("mouseup", (e)=>{
            target.style.removeProperty('background-image')
            target.style.removeProperty('color')
            target.style.removeProperty('border-style')
            input.value = "";
            e.target.remove();
        })
    }

    images = document.querySelectorAll(".image-input");
    images.forEach(element => {
        element.addEventListener("change", (e)=>{
            const changedElement = e.target
            const uploadedImage = URL.createObjectURL(changedElement.files[0]);
            const label = document.querySelector(`label[for="${changedElement.id}"]`);
            label.style.backgroundImage = `url('${uploadedImage}')`
            label.style.color = "transparent"
            label.style.borderStyle = "solid"
            createRemoveImageButton(label, changedElement);
        })
    });
})()