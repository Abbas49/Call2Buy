(() => {
    const domain = window.location.origin;
    const form = document.querySelector("form");
    const aiBtn = document.getElementById("ai-btn");

    function createRemoveImageButton(target, input) {
        const button = document.createElement("button");
        button.type = "button";
        button.classList.add("remove-image-btn");
        button.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        button.setAttribute("title", "Remove photo");
        target.appendChild(button);
        button.addEventListener("click", (e) => {
            e.stopPropagation();
            e.preventDefault();
            target.style.removeProperty('background-image');
            target.style.removeProperty('color');
            target.style.removeProperty('border-style');
            target.classList.remove('has-image');
            input.value = "";
            button.remove();
        });
    }

    const images = document.querySelectorAll(".image-input");
    images.forEach(element => {
        element.addEventListener("change", (e) => {
            const changedElement = e.target;
            if (changedElement.files && changedElement.files[0]) {
                const uploadedImage = URL.createObjectURL(changedElement.files[0]);
                const label = document.querySelector(`label[for="${changedElement.id}"]`);
                if (label) {
                    label.style.backgroundImage = `url('${uploadedImage}')`;
                    label.classList.add('has-image');
                    const existingBtn = label.querySelector(".remove-image-btn");
                    if (existingBtn) existingBtn.remove();
                    createRemoveImageButton(label, changedElement);
                }
            }
        });
    });

    if (aiBtn) {
        aiBtn.addEventListener("click", (e) => {
            e.preventDefault();
            const descriptionInput = document.getElementById("textarea");
            if (!descriptionInput.value.trim()) {
                descriptionInput.focus();
                return;
            }
            const aiBtnHtmlSave = aiBtn.innerHTML;
            aiBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Refining...';
            aiBtn.disabled = true;

            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");

            const raw = JSON.stringify({
                "description": descriptionInput.value
            });

            const requestOptions = {
                method: 'POST',
                headers: myHeaders,
                body: raw,
                credentials: 'include',
                redirect: 'follow'
            };

            fetch(domain + "/api/v1/ai/rewrite", requestOptions)
                .then(async (response) => {
                    const result = await response.json();
                    result.status = response.status;
                    return result;
                })
                .then(result => {
                    if (result.status !== 200) {
                        throw new Error(result.message);
                    }
                    aiBtn.innerHTML = aiBtnHtmlSave;
                    aiBtn.disabled = false;
                    descriptionInput.value = result.message;
                })
                .catch(error => {
                    aiBtn.innerHTML = aiBtnHtmlSave;
                    aiBtn.disabled = false;
                    alert(error.message);
                    console.error('AI Rewrite Error:', error);
                });
        });
    }

    document.addEventListener("wheel", function(event) {
        if (document.activeElement && document.activeElement.type === "number") {
            document.activeElement.blur();
        }
    });
})();