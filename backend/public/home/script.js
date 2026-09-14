(() => {
    const domain = window.location.origin;

    function getConditionClass(condition) {
        if (!condition) return "";
        const lower = condition.toLowerCase();
        if (lower.includes("new") && !lower.includes("like")) return "condition-new";
        if (lower.includes("like new")) return "condition-like-new";
        if (lower.includes("good")) return "condition-good";
        if (lower.includes("acceptable")) return "condition-acceptable";
        if (lower.includes("part")) return "condition-parts";
        return "condition-good";
    }

    function listProduct(product) {
        const element = document.createElement("div");
        element.classList.add("one-proudct", "product-card");

        // 1. Media Container & Image
        const proimg = document.createElement("div");
        proimg.classList.add("proimg", "card-media");

        const img = document.createElement("img");
        const imageSrc = product.images && product.images.length > 0 && product.images[0]
            ? product.images[0]
            : "https://placehold.co/600x400?text=No+Photo";
        img.src = imageSrc;
        img.alt = product.title || "Product image";
        img.loading = "lazy";
        img.onerror = () => {
            img.src = "https://placehold.co/600x400?text=Call2Buy";
        };
        proimg.appendChild(img);

        // 2. Card Body
        const cardBody = document.createElement("div");
        cardBody.classList.add("card-body");

        // Meta Bar & Condition Badge
        const metaBar = document.createElement("div");
        metaBar.classList.add("card-meta-bar");

        if (product.condition) {
            const badge = document.createElement("div");
            badge.className = `condition-badge ${getConditionClass(product.condition)}`;

            const dot = document.createElement("span");
            dot.classList.add("status-dot");

            const condText = document.createElement("span");
            condText.textContent = product.condition;

            badge.appendChild(dot);
            badge.appendChild(condText);
            metaBar.appendChild(badge);
        }
        cardBody.appendChild(metaBar);

        // Title
        const title = document.createElement("h3");
        title.classList.add("card-title");
        title.textContent = product.title || "Untitled Listing";
        cardBody.appendChild(title);

        // Footer Row with Price
        const footerRow = document.createElement("div");
        footerRow.classList.add("card-footer-row");

        const priceSpan = document.createElement("span");
        priceSpan.classList.add("card-price");
        const formattedPrice = Number(product.price || 0).toLocaleString("en-US", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        });
        priceSpan.textContent = `$${formattedPrice}`;
        footerRow.appendChild(priceSpan);
        cardBody.appendChild(footerRow);

        // Action Link & Button
        const actionLink = document.createElement("a");
        actionLink.classList.add("card-action-link");
        actionLink.href = `/products/${encodeURIComponent(product.product_id)}`;

        const actionBtn = document.createElement("button");
        actionBtn.type = "button";
        actionBtn.classList.add("card-action-btn");

        const btnText = document.createElement("span");
        btnText.textContent = "View Listing";

        const btnIcon = document.createElement("i");
        btnIcon.className = "fa-solid fa-arrow-right";

        actionBtn.appendChild(btnText);
        actionBtn.appendChild(btnIcon);
        actionLink.appendChild(actionBtn);
        cardBody.appendChild(actionLink);

        element.appendChild(proimg);
        element.appendChild(cardBody);

        document.getElementById("products-container").appendChild(element);
    }

    function renderEmptyState(container) {
        container.replaceChildren();
        const emptyDiv = document.createElement("div");
        emptyDiv.classList.add("empty-state");

        const icon = document.createElement("i");
        icon.className = "fa-solid fa-box-open";

        const heading = document.createElement("h3");
        heading.textContent = "No Listings Found";

        const text = document.createElement("p");
        text.textContent = "Try adjusting your search keywords or clearing price filters to discover more secondhand goods.";

        emptyDiv.appendChild(icon);
        emptyDiv.appendChild(heading);
        emptyDiv.appendChild(text);
        container.appendChild(emptyDiv);
    }

    function showLoadingShimmer(container) {
        container.replaceChildren();
        for (let i = 0; i < 6; i++) {
            const skeleton = document.createElement("div");
            skeleton.classList.add("skeleton-card");
            container.appendChild(skeleton);
        }
    }

    async function loadProducts() {
        const container = document.getElementById("products-container");
        const countBadge = document.getElementById("results-count");
        const searchQuery = document.getElementById("search-query") ? document.getElementById("search-query").value.trim() : "";
        const minPrice = document.getElementById("min-price") ? document.getElementById("min-price").value.trim() : "";
        const maxPrice = document.getElementById("max-price") ? document.getElementById("max-price").value.trim() : "";
        const selectCategory = document.getElementById("select-category") ? document.getElementById("select-category").value : "All Categories";

        showLoadingShimmer(container);

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include',
            redirect: 'follow'
        };

        try {
            const response = await fetch(`${domain}/api/v1/products?search_query=${encodeURIComponent(searchQuery)}&min_price=${encodeURIComponent(minPrice)}&max_price=${encodeURIComponent(maxPrice)}&category=${encodeURIComponent(selectCategory)}`, requestOptions);
            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || "Failed to load listings");
            }

            container.replaceChildren();
            const products = result.products || [];

            if (countBadge) {
                countBadge.textContent = `${products.length} ${products.length === 1 ? "item" : "items"} available`;
            }

            if (products.length === 0) {
                renderEmptyState(container);
                return;
            }

            for (let i = 0; i < products.length; i++) {
                listProduct(products[i]);
            }
        } catch (error) {
            container.replaceChildren();
            const emptyDiv = document.createElement("div");
            emptyDiv.classList.add("empty-state");

            const icon = document.createElement("i");
            icon.className = "fa-solid fa-triangle-exclamation";
            icon.style.color = "var(--accent)";

            const heading = document.createElement("h3");
            heading.textContent = "Unable to Load Listings";

            const msg = document.createElement("p");
            msg.textContent = error.message || "An unexpected error occurred.";

            emptyDiv.appendChild(icon);
            emptyDiv.appendChild(heading);
            emptyDiv.appendChild(msg);
            container.appendChild(emptyDiv);
            console.error('Error fetching products:', error);
        }
    }

    function createOption(name) {
        const element = document.createElement("option");
        element.value = name;
        element.innerText = name;
        return element;
    }

    window.addEventListener("DOMContentLoaded", () => {
        loadProducts();

        const selectCategory = document.getElementById("select-category");
        if (selectCategory) {
            fetch(`${domain}/api/v1/categories`, {
                method: 'GET',
                headers: { "Content-Type": "application/json" },
                credentials: 'include'
            })
            .then(res => res.json())
            .then(result => {
                if (result.message && Array.isArray(result.message)) {
                    result.message.forEach(cat => {
                        selectCategory.appendChild(createOption(cat));
                    });
                }
            })
            .catch(err => console.error('Error fetching categories:', err));
        }

        const filterBtn = document.getElementById("filter-btn");
        if (filterBtn) {
            filterBtn.addEventListener("click", async (e) => {
                e.preventDefault();
                filterBtn.disabled = true;
                filterBtn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Filtering...';
                await loadProducts();
                filterBtn.disabled = false;
                filterBtn.innerHTML = '<i class="fa-solid fa-filter"></i> Apply Filters';
            });
        }

        const searchInput = document.getElementById("search-query");
        if (searchInput) {
            let debounceTimer;
            searchInput.addEventListener("input", () => {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => {
                    loadProducts();
                }, 400);
            });
        }

        document.addEventListener("keydown", (e) => {
            if (e.key === "Enter" && document.activeElement && (document.activeElement.id === "search-query" || document.activeElement.id === "min-price" || document.activeElement.id === "max-price")) {
                e.preventDefault();
                if (filterBtn) filterBtn.click();
            }
        });
    });
})();