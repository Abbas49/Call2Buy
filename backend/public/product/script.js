let submitBtn = document.querySelector(".submit-btn")
let hid = document.querySelector(".num")

submitBtn.addEventListener("click",()=>{
    if(hid.style.display === "flex"){
        hid.style.display = "none" 
    }else{
        hid.style.display = "flex" 
    }
})

let mainImg = document.getElementById("main-img")
let supImg = document.querySelectorAll(".some img")

supImg.forEach((img)=>{
img.addEventListener("click", () => {
    mainImg.src = img.src;
});
});
