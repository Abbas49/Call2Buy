function addProduct(name, price, image){
    if(!image){
        image = "https://placehold.co/250x164"
    }
    let element = document.createElement("div");
    element.classList.add("product");
    element.innerHTML = `
        <a href="#">
            <div class="img-con">
                <img src="${image}"/>
            </div>
            <div class="info-con">
                <p> ${name} </p>
                <p class="price"> ${price}$ </p>
            </div>
        </a>
    `
    document.getElementById("products-con").appendChild(element);
}

fetch("http://localhost:3000/products").then((e)=> e.json()).then((e)=>{
    console.log(e);
    e.reverse();
    e.forEach(element => {
        addProduct(element.name, element.price, element.image);
    });
})



