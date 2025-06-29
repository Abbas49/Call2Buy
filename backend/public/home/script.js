(() => {
    const domain = window.location.origin;

    function listProduct(product) {
        let element = document.createElement("div");
        element.classList.add("one-proudct");

        let proimg = document.createElement("div");
        proimg.classList.add("proimg");
        let img = document.createElement("img");
        img.src = product.images[0];
        img.alt = "Product image";
        proimg.appendChild(img);

        let proinfo = document.createElement("div");
        proinfo.classList.add("proinfo");

        let title = document.createElement("h3");
        title.textContent = product.title;

        let prometa = document.createElement("div");
        prometa.classList.add("prometa");

        let eDiv = document.createElement("div");
        eDiv.classList.add("e");

        let condition = document.createElement("p");
        if (!product.condition) {
            condition.style.visibility = 'hidden';
        } else {
            condition.textContent = product.condition;
        }

        eDiv.appendChild(condition);
        prometa.appendChild(eDiv);
        proinfo.appendChild(title);
        proinfo.appendChild(prometa);

        let pric = document.createElement("div");
        pric.classList.add("pric");

        let price = document.createElement("h4");
        price.textContent = `$${product.price}`;
        pric.appendChild(price);

        let link = document.createElement("a");
        link.href = `/products/${encodeURIComponent(product.product_id)}`;
        let button = document.createElement("button");
        button.classList.add("submit-btn");
        button.textContent = "Buy Now";
        link.appendChild(button);

        element.appendChild(proimg);
        element.appendChild(proinfo);
        element.appendChild(pric);
        element.appendChild(link);

        document.getElementById("products-container").appendChild(element);
    }


    async function loadProducts(){
        const search_query = document.getElementById("search-query").value;
        const min_price = document.getElementById("min-price").value;
        const max_price = document.getElementById("max-price").value;
        const selectCategory = document.getElementById("select-category").value
        let myHeaders = new Headers();

        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include',
            redirect: 'follow'
        };

        await fetch(`${domain}/api/v1/products?search_query=${search_query}&min_price=${min_price}&max_price=${max_price}&category=${selectCategory}`, requestOptions)
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
                const products = result.products;
                for (let i = 0; i < products.length; i++) {
                    listProduct(products[i]);
                }
            })
            .catch(error => {
                alert(error.message);
                console.log('error', error)
            });
    }

    function createOption(name){
        const element = document.createElement("option");
        element.value = name;
        element.innerText = name;
        return element;
    }


    window.addEventListener("DOMContentLoaded", (e) => {
        loadProducts();


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

    document.getElementById("filter-btn").addEventListener("click", async (e)=>{
        e.preventDefault();
        document.getElementById("products-container").innerHTML = "";
        const filterBtn = document.getElementById("filter-btn");
        filterBtn.innerText = "Loading...";
        await loadProducts();
        filterBtn.innerText = "Apply Filters";
    })

    document.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            document.getElementById("filter-btn").click();
        }
    });

})()