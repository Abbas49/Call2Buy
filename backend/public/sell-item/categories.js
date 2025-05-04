(() => {
    const domain = window.location.origin;

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
})()