(() => {
    const domain = window.location.origin;
    function listProduct(product) {
        let element = document.createElement("div");
        element.classList.add("one-proudct");
        element.innerHTML = `
          <div class="proimg">
            <img src="${product.images[0]}" alt="Product image">
          </div>
          <div class="proinfo">
            <h3>${product.title}</h3>
            <div class="prometa">
              <div class="e">
                <p>Excellent</p>
              </div>
            </div>
          </div>
          <div class="pric">
            <h4>$${product.price}</h4>
          </div>
          <a href="/products/${product.product_id}"><button class="submit-btn">Buy Now</button></a>
    `
        document.getElementById("products-container").appendChild(element);
    }

    function loadProducts(){
        const search_query = document.getElementById("search-query").value;
        const min_price = document.getElementById("min-price").value;
        const max_price = document.getElementById("max-price").value;
        let myHeaders = new Headers();

        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include',
            redirect: 'follow'
        };

        fetch(`${domain}/api/v1/products?search_query=${search_query}&min_price=${min_price}&max_price=${max_price}`, requestOptions)
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


    window.addEventListener("DOMContentLoaded", (e) => {
        loadProducts();
    })

    document.getElementById("filter-btn").addEventListener("click", (e)=>{
        e.preventDefault();
        document.getElementById("products-container").innerHTML = "";
        loadProducts();
    })
})()