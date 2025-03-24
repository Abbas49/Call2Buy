async function addProduct(name, rate, price){
    let response;
    await fetch("http://localhost:3000/addProduct", {
        method: "POST",
        headers:{
            "content-type": "application/json"
        },
        body: JSON.stringify({
            "name":name,
            "price":price,
            "rate":rate
        })
    }).then((e)=> e.text()).then(e=> response=e);
    return response;
}




document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault();
    let name = document.getElementsByName("name")[0].value;
    let price = document.getElementsByName("price")[0].value;
    let rate = document.getElementsByName("rate")[0].value;
    let responseLabel = document.getElementById("response-message");
    console.log(name);
    console.log(price);
    console.log(rate);
    let res = await addProduct(name, rate, price);
    responseLabel.innerText = res;
});