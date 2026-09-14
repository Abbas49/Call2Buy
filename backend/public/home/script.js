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

    function escapeHtml(str) {
        if (!str) return "";
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function listProduct(product) {
        const element = document.createElement("div");
        element.classList.add("one-proudct", "product-card");

        const imageSrc = product.images && product.images.length > 0 && product.images[0]
            ? product.images[0]
            : "https://placehold.co/600x400?text=No+Photo";

        const conditionHtml = product.condition
            ? `<div class="condition-badge ${getConditionClass(product.condition)}">
                 <span class="status-dot"></span>
                 <span>${escapeHtml(product.condition)}</span>
               </div>`
            : `<div></div>`;

        const formattedPrice = Number(product.price || 0).toLocaleString("en-US", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2
        });

        element.innerHTML = `
          <div class="proimg card-media">
            <img src="${imageSrc}" alt="${escapeHtml(product.title)}" loading="lazy" onerror="this.src='https://placehold.co/600x400?text=Call2Buy'">
          </div>
          <div class="card-body">
            <div class="card-meta-bar">
              ${conditionHtml}
            </div>
            <h3 class="card-title">${escapeHtml(product.title)}</h3>
            <div class="card-footer-row">
              <span class="card-price">$${formattedPrice}</span>
            </div>
            <a href="/products/${product.product_id}" class="card-action-link">
              <button type="button" class="card-action-btn">
                <span>View Listing</span>
                <i class="fa-solid fa-arrow-right"></i>
              </button>
            </a>
          </div>
        `;

        document.getElementById("products-container").appendChild(element);
    }

    function renderEmptyState(container) {
        container.innerHTML = `
          <div class="empty-state">
            <i class="fa-solid fa-box-open"></i>
            <h3>No Listings Found</h3>
            <p>Try adjusting your search keywords or clearing price filters to discover more secondhand goods.</p>
          </div>
        `;
    }

    function showLoadingShimmer(container) {
        container.innerHTML = `
          <div class="skeleton-card"></div>
          <div class="skeleton-card"></div>
          <div class="skeleton-card"></div>
          <div class="skeleton-card"></div>
          <div class="skeleton-card"></div>
          <div class="skeleton-card"></div>
        `;
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

            container.innerHTML = "";
            const products = result.products || [];

            if (countBadge) {
                countBadge.innerText = `${products.length} ${products.length === 1 ? "item" : "items"} available`;
            }

            if (products.length === 0) {
                renderEmptyState(container);
                return;
            }

            for (let i = 0; i < products.length; i++) {
                listProduct(products[i]);
            }
        } catch (error) {
            container.innerHTML = `
              <div class="empty-state">
                <i class="fa-solid fa-triangle-exclamation" style="color: var(--accent);"></i>
                <h3>Unable to Load Listings</h3>
                <p>${escapeHtml(error.message)}</p>
              </div>
            `;
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