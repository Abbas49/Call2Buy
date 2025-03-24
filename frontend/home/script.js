function addProduct(name, price, rate){
    let element = document.createElement("div");
    element.classList.add("product");
    element.innerHTML = `
        <p> name: ${name} </p>
        <p> rate: ${rate} </p>
        <p> price: ${price} </p>
    `
    document.getElementById("products-con").appendChild(element);
}

fetch("http://localhost:3000/products").then((e)=> e.json()).then((e)=>{
    console.log(e);
    e.forEach(element => {
        addProduct(element.name, element.price, element.rate);
    });
})