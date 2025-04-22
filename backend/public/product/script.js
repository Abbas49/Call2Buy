let submitBtn = document.querySelector(".submit-btn")
let hid = document.querySelector(".num")

// hid.style.display = "flex"
submitBtn.addEventListener("click",()=>{
    if(hid.style.display === "flex"){
        hid.style.display = "none" 
    }else{
        hid.style.display = "flex" 
    }
})