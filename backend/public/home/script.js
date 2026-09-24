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

    function renderErrorState(container, error, onRetry) {
        container.replaceChildren();

        const countBadge = document.getElementById("results-count");
        if (countBadge) {
            countBadge.textContent = "Standby Mode";
        }

        const emptyDiv = document.createElement("div");
        emptyDiv.classList.add("empty-state", "showcase-state");

        const iconWrapper = document.createElement("div");
        iconWrapper.className = "showcase-icon-wrapper";

        const icon = document.createElement("i");
        icon.className = "fa-solid fa-cloud-moon";
        iconWrapper.appendChild(icon);

        const heading = document.createElement("h3");
        heading.textContent = "Demo Database in Standby Mode";

        const text = document.createElement("p");
        text.textContent = "Welcome! Call2Buy was engineered as a university showcase to demonstrate full-stack marketplace design. To optimize free-tier cloud infrastructure, the demo database enters standby mode during periods of low activity.";

        const buttonGroup = document.createElement("div");
        buttonGroup.className = "showcase-btn-group";

        const githubLink = document.createElement("a");
        githubLink.href = "https://github.com/Abbas49/Web-Project";
        githubLink.target = "_blank";
        githubLink.rel = "noopener noreferrer";
        githubLink.className = "github-btn";
        githubLink.innerHTML = `<svg height="20" width="20" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"></path></svg><span>View on GitHub</span>`;
        buttonGroup.appendChild(githubLink);

        emptyDiv.appendChild(iconWrapper);
        emptyDiv.appendChild(heading);
        emptyDiv.appendChild(text);
        emptyDiv.appendChild(buttonGroup);

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
            
            let result;
            try {
                result = await response.json();
            } catch (jsonErr) {
                result = { message: "Server returned an unexpected response. The service might be temporarily unavailable." };
            }

            if (!response.ok) {
                let msg = (result && result.message) || "Welcome! Call2Buy was engineered as a university showcase to demonstrate full-stack marketplace design. To optimize free-tier cloud infrastructure, the demo database enters standby mode during periods of low activity.";
                if (typeof msg === "string" && (msg.trim().startsWith("<") || msg.includes("521:") || msg.includes("Cloudflare"))) {
                    msg = "Welcome! Call2Buy was engineered as a university showcase to demonstrate full-stack marketplace design. To optimize free-tier cloud infrastructure, the demo database enters standby mode during periods of low activity.";
                }
                const err = new Error(msg);
                err.status = response.status;
                err.code = result && result.code;
                throw err;
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
            renderErrorState(container, error, () => loadProducts());
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