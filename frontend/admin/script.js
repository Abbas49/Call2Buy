async function addProduct(name, rate, price, file){
    const formData = new FormData();
    formData.append("name", name);
    formData.append("rate", rate);
    formData.append("price", price);
    formData.append("image", file);
    console.log(formData);
    let response;
    await fetch("http://localhost:3000/addProduct", {
        method: "POST",
        body: formData
    }).then((e)=> e.text()).then(e=> response=e);
    return response;
}




document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault();
    let name = document.getElementsByName("name")[0].value;
    let price = document.getElementsByName("price")[0].value;
    let rate = document.getElementsByName("rate")[0].value;
    let file = document.getElementById("product-image").files[0];
    let responseLabel = document.getElementById("response-message");
    console.log(name);
    console.log(price);
    console.log(rate);
    let res = await addProduct(name, rate, price, file);
    responseLabel.innerText = res;
});