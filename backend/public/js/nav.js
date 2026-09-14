(() => {
    const domain = window.location.origin;
    const navLoginBtn = document.getElementById("nav-login");
    const navRegisterBtn = document.getElementById("nav-register");
    const navLogoutBtn = document.getElementById("nav-logout");
    const navUsername = document.getElementById("nav-username");

    function highlightActiveNav() {
        const currentPath = window.location.pathname.replace(/\/$/, "") || "/";
        const navAnchors = document.querySelectorAll("nav ul li a");
        navAnchors.forEach(a => {
            const href = a.getAttribute("href");
            const parentLi = a.closest("li");
            const isUsername = parentLi && parentLi.id === "nav-username";
            const cleanHref = href ? href.replace(/^\.\./, "").replace(/\/$/, "") || "/" : "";

            a.classList.remove("active");

            if (
                (cleanHref === "/home" || cleanHref === "") &&
                (currentPath === "/home" || currentPath === "" || currentPath === "/")
            ) {
                a.classList.add("active");
            } else if (cleanHref === "/sell-item" && currentPath.startsWith("/sell-item")) {
                a.classList.add("active");
            } else if (cleanHref === "/login" && currentPath.startsWith("/login")) {
                a.classList.add("active");
            } else if (cleanHref === "/register" && currentPath.startsWith("/register")) {
                a.classList.add("active");
            } else if ((cleanHref === "/my-account" || isUsername) && currentPath.startsWith("/my-account")) {
                a.classList.add("active");
            }
        });
    }

    function renderLoggedIn(name) {
        if (navLoginBtn) navLoginBtn.style.display = "none";
        if (navRegisterBtn) navRegisterBtn.style.display = "none";
        if (navUsername) {
            const anchor = navUsername.querySelector('a');
            if (anchor) {
                anchor.innerHTML = `<i class="fa-solid fa-circle-user"></i> <span>${name}</span>`;
            }
            navUsername.style.display = "flex";
        }
        if (navLogoutBtn) {
            navLogoutBtn.style.display = "flex";
        }
        highlightActiveNav();
    }

    function renderLoggedOut() {
        if (navLoginBtn) navLoginBtn.style.display = "flex";
        if (navRegisterBtn) navRegisterBtn.style.display = "flex";
        if (navLogoutBtn) navLogoutBtn.style.display = "none";
        if (navUsername) navUsername.style.display = "none";
        sessionStorage.removeItem("UserName");
        highlightActiveNav();
    }

    window.addEventListener("DOMContentLoaded", () => {
        highlightActiveNav();

        const name = sessionStorage.getItem("UserName");
        if (name) {
            renderLoggedIn(name);
        }

        const requestOptions = {
            method: 'GET',
            cache: 'no-store'
        };

        fetch(domain + "/api/v1/username", requestOptions)
            .then(response => {
                if (response.status !== 200) {
                    throw new Error("User is not logged in");
                }
                return response.json();
            })
            .then(result => {
                const name = result.message.split(" ")[0];
                renderLoggedIn(name);
                sessionStorage.setItem("UserName", name);
            })
            .catch(error => {
                if (location.pathname.startsWith("/sell-item")) {
                    alert("You are not logged in. Please login to continue.");
                    window.location.href = "/login";
                }
                renderLoggedOut();
            });
    });

    if (navLogoutBtn) {
        navLogoutBtn.addEventListener("click", (event) => {
            event.preventDefault();
            fetch(domain + "/api/v1/auth/logout").then(() => {
                renderLoggedOut();
                if (location.pathname.startsWith("/my-account") || location.pathname.startsWith("/sell-item") || location.pathname.startsWith("/edit")) {
                    window.location.href = "/home";
                }
            });
        });
    }
})();