const currentTheme = localStorage.getItem("theme") || "dark";
document.documentElement.setAttribute("data-theme", currentTheme);

let toggleButton = document.querySelector(".toggle-theme");

toggleButton.addEventListener("click", (event)=>{
    let html = document.querySelector("html");
    const currentTheme = html.getAttribute("data-theme");
    if(currentTheme==="dark"){
        html.setAttribute("data-theme", "light");
        localStorage.setItem("theme", "light");
        toggleButton.innerText = "🌙"
    }else{
        html.setAttribute("data-theme", "dark");
        localStorage.setItem("theme", "dark");
        toggleButton.innerText = "🔆"
    }
})