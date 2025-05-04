let edit = document.querySelector(".edit button");
edit.addEventListener("click",()=> {
    let main = document.querySelector(".hidden");
    let accountInfo = document.querySelector(".info-item");
    main.style.display = "block";
    accountInfo.style.display = "none";
})