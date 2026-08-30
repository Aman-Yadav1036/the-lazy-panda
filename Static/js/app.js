// Global functions and initialization
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Mobile menu toggle
    const hamburger = document.getElementById('hamburgerBtn');
    const navMenu = document.getElementById('navMenu');
    const navOverlay = document.getElementById('navOverlay');

    if (hamburger && navMenu && navOverlay) {
        const toggleMenu = (open) => {
            hamburger.classList.toggle('active', open);
            navMenu.classList.toggle('active', open);
            navOverlay.classList.toggle('active', open);
            hamburger.setAttribute('aria-expanded', open);
            document.body.style.overflow = open ? 'hidden' : '';
        };

        hamburger.addEventListener('click', () => {
            const isOpen = navMenu.classList.contains('active');
            toggleMenu(!isOpen);
        });

        navOverlay.addEventListener('click', () => toggleMenu(false));

        // Close menu when clicking a link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => toggleMenu(false));
        });
    }

    // Product card HTML generator (used on multiple pages)
    window.createProductCardHTML = function(product) {
        const priceDisplay = product.originalPrice && product.originalPrice > product.price
            ? `<span class="original-price">Rs. ${product.originalPrice.toLocaleString()}</span> 
               <span class="product-card-price">Rs. ${product.price.toLocaleString()}</span>`
            : `<span class="product-card-price">Rs. ${product.price.toLocaleString()}</span>`;

        // Status badge takes priority over the "New" badge: an item can't be
        // both freshly arrived and unavailable/not-yet-arrived at the same time.
        let badgeHTML = '';
        let cardStateClass = '';
        if (product.status === 'coming-soon') {
            badgeHTML = '<span class="product-card-badge product-card-badge--coming-soon">Coming Soon</span>';
        } else if (product.status === 'out-of-stock') {
            badgeHTML = '<span class="product-card-badge product-card-badge--out-of-stock">Out of Stock</span>';
            cardStateClass = ' product-card--out-of-stock';
        } else if (product.featured) {
            badgeHTML = '<span class="product-card-badge product-card-badge--new">New</span>';
        }

        return `
            <a href="product.html?id=${product.id}" class="product-card${cardStateClass}" aria-label="View ${product.name}">
                <div class="product-card-image">
                    <img src="${product.images[0]}" alt="${product.name}" loading="lazy">
                    ${badgeHTML}
                </div>
                <div class="product-card-body">
                    <h3 class="product-card-name">${product.name}</h3>
                    ${product.brand ? `<p class="product-card-brand">${product.brand}</p>` : ''}
                    <div class="product-card-price">${priceDisplay}</div>
                </div>
            </a>
        `;
    };

    // Handle products page
    if (document.getElementById('allProductsGrid')) {
        const grid = document.getElementById('allProductsGrid');
        const categoryFilter = document.getElementById('categoryFilter');
        const subcategoryFilter = document.getElementById('subcategoryFilter');
        const searchInput = document.getElementById('searchInput');
        const noProductsMsg = document.getElementById('noProductsMessage');

        // Read query params for initial filter
        const urlParams = new URLSearchParams(window.location.search);
        const initialCategory = urlParams.get('category') || 'all';
        const initialSubcategory = urlParams.get('subcategory') || 'all';

        if (categoryFilter) categoryFilter.value = initialCategory;
        if (subcategoryFilter) subcategoryFilter.value = initialSubcategory;

        function renderProducts() {
            const category = categoryFilter.value;
            const subcategory = subcategoryFilter.value;
            const query = searchInput.value.toLowerCase().trim();

            let filtered = products.filter(p => {
                if (category !== 'all' && p.category !== category) return false;
                if (subcategory !== 'all' && p.subcategory !== subcategory) return false;
                if (query && !p.name.toLowerCase().includes(query) && !p.category.toLowerCase().includes(query) && !p.subcategory.toLowerCase().includes(query)) return false;
                return true;
            });

            if (filtered.length === 0) {
                grid.innerHTML = '';
                noProductsMsg.hidden = false;
            } else {
                noProductsMsg.hidden = true;
                grid.innerHTML = filtered.map(createProductCardHTML).join('');
            }
        }

        if (categoryFilter) categoryFilter.addEventListener('change', renderProducts);
        if (subcategoryFilter) subcategoryFilter.addEventListener('change', renderProducts);
        if (searchInput) searchInput.addEventListener('input', renderProducts);

        renderProducts();
    }

    // Handle product detail page
    if (document.getElementById('productDetailContainer')) {
        const container = document.getElementById('productDetailContainer');
        const urlParams = new URLSearchParams(window.location.search);
        const productId = parseInt(urlParams.get('id'));

        const product = products.find(p => p.id === productId);

        if (product) {
            renderProductDetail(product);
        } else {
            container.innerHTML = '<div class="no-products">Product not found.</div>';
        }
    }

    function renderProductDetail(product) {
        const container = document.getElementById('productDetailContainer');
        if (!container) return;

        let discountHTML = '';
        if (product.originalPrice && product.originalPrice > product.price) {
            discountHTML = `
                <div class="product-discount">
                    <span class="original-price">Rs. ${product.originalPrice.toLocaleString()}</span>
                    <span class="product-price">Rs. ${product.price.toLocaleString()}</span>
                </div>
            `;
        } else {
            discountHTML = `<div class="product-price">Rs. ${product.price.toLocaleString()}</div>`;
        }

        const colorsHTML = product.colors && product.colors.length > 0
            ? `<div class="attribute-group">
                <h4>Available Colors</h4>
                <div class="color-list">
                    ${product.colors.map(color => `<span class="color-chip">${color}</span>`).join('')}
                </div>
            </div>`
            : '';

        const sizesHTML = product.sizes && product.sizes.length > 0
            ? `<div class="attribute-group">
                <h4>Available Sizes</h4>
                <div class="size-list">
                    ${product.sizes.map(size => `<span class="size-chip">${size}</span>`).join('')}
                </div>
            </div>`
            : '';

        const thumbsHTML = product.images.map((img, idx) => `
            <div class="thumbnail ${idx === 0 ? 'active' : ''}" data-index="${idx}">
                <img src="${img}" alt="${product.name} image ${idx+1}">
            </div>
        `).join('');

        // Status badge + contextual copy: an out-of-stock or coming-soon item
        // still gets a Call/WhatsApp CTA, just worded for that situation.
        let detailBadgeHTML = '';
        let enquireLabel = 'Call to Enquire';
        let enquireNote = "Reach out and we'll help with sizing, availability, or reserving this item.";
        let waMessage = 'Hi, I am interested in the ' + product.name;
        if (product.status === 'coming-soon') {
            detailBadgeHTML = '<span class="product-card-badge product-card-badge--coming-soon">Coming Soon</span>';
            enquireLabel = 'Ask About This Item';
            enquireNote = "This piece hasn't landed yet — contact us for expected availability.";
            waMessage = 'Hi, I am interested in the upcoming ' + product.name + '. When will it be available?';
        } else if (product.status === 'out-of-stock') {
            detailBadgeHTML = '<span class="product-card-badge product-card-badge--out-of-stock">Out of Stock</span>';
            enquireLabel = 'Ask About Restock';
            enquireNote = "Currently out of stock — reach out and we'll let you know when it's back.";
            waMessage = 'Hi, when will the ' + product.name + ' be back in stock?';
        }

        container.innerHTML = `
            <div class="product-detail-grid">
                <div class="product-gallery">
                    <div class="main-image">
                        <img id="mainProductImage" src="${product.images[0]}" alt="${product.name}">
                        ${detailBadgeHTML}
                    </div>
                    <div class="thumbnail-list" id="thumbnailList">
                        ${thumbsHTML}
                    </div>
                </div>
                <div class="product-info">
                    <h1>${product.name}</h1>
                    ${product.brand ? `<p class="product-brand">${product.brand}</p>` : ''}
                    <p><strong>Category:</strong> ${product.category} > ${product.subcategory}</p>
                    ${discountHTML}
                    <div class="product-description">
                        <p>${product.description}</p>
                        ${product.material ? `<p><strong>Material:</strong> ${product.material}</p>` : ''}
                    </div>
                    ${colorsHTML}
                    ${sizesHTML}
                    <div class="call-to-enquire">
                        <div class="dual-cta">
                            <a href="tel:+9779700035248" class="btn btn-primary btn-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
                                ${enquireLabel}
                            </a>
                            <a href="https://wa.me/9779700035248?text=${encodeURIComponent(waMessage)}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/></svg>
                                WhatsApp
                            </a>
                        </div>
                        <p class="enquire-text">${enquireNote}</p>
                    </div>
                </div>
            </div>
        `;

        // Thumbnail click handler
        const mainImg = document.getElementById('mainProductImage');
        const thumbnails = document.querySelectorAll('.thumbnail');
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                const idx = this.dataset.index;
                mainImg.src = product.images[idx];
                thumbnails.forEach(t => t.classList.remove('active'));
                this.classList.add('active');
            });
        });
    }
});