// King Kitchen - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Initialize the website
    initSideMenu();
    initCarousel();
    initProductSections();
    initSearch();
    initCart();
    initWishlist();
    initNewsletter();
    initFooterLinks();
});

// Side Menu Functionality
function initSideMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const closeSideMenu = document.getElementById('closeSideMenu');
    const sideMenu = document.getElementById('sideMenu');
    const mainContent = document.querySelector('.main-content');
    const overlay = document.getElementById('overlay');
    const categoryItems = document.querySelectorAll('.category-item');
    const subcategoryLinks = document.querySelectorAll('.subcategory-list a');
    const clearFiltersBtn = document.getElementById('clearFilters');

    // Toggle side menu
    menuToggle.addEventListener('click', function() {
        sideMenu.classList.add('open');
        overlay.classList.add('active');
    });

    // Close side menu
    closeSideMenu.addEventListener('click', function() {
        sideMenu.classList.remove('open');
        overlay.classList.remove('active');
    });

    // Close side menu when clicking on overlay
    overlay.addEventListener('click', function() {
        sideMenu.classList.remove('open');
        document.getElementById('cartSidebar').classList.remove('open');
        document.getElementById('wishlistSidebar').classList.remove('open');
        overlay.classList.remove('active');
    });

    // Toggle subcategories
    categoryItems.forEach(item => {
        const header = item.querySelector('.category-header');
        header.addEventListener('click', function() {
            item.classList.toggle('active');
        });
        
        // Add click event for category headers to filter by main category
        const categoryName = header.querySelector('span').textContent;
        header.addEventListener('click', function(e) {
            // Don't filter if just toggling the dropdown
            e.stopPropagation();
            // Filter by category
            filterProductsByCategory(categoryName);
        });
    });
    
    // Add click events to subcategory links
    subcategoryLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');
            const subcategory = this.getAttribute('data-subcategory');
            filterProductsBySubcategory(category, subcategory);
            // Close the side menu after selection on mobile
            sideMenu.classList.remove('open');
            overlay.classList.remove('active');
        });
    });
    
    // Clear filters button
    if (clearFiltersBtn) {
        clearFiltersBtn.addEventListener('click', function() {
            clearProductFilters();
        });
    }
}

// Hero Carousel Functionality
function initCarousel() {
    const carousel = document.getElementById('heroCarousel');
    if (!carousel) return;

    const slides = carousel.querySelectorAll('.carousel-slide');
    const dots = carousel.querySelectorAll('.carousel-dot');
    const prevBtn = carousel.querySelector('.prev');
    const nextBtn = carousel.querySelector('.next');
    const shopNowBtns = document.querySelectorAll('.shop-now-btn');
    
    // Add event listeners to Shop Now buttons
    shopNowBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const category = this.getAttribute('data-category');
            scrollToCategory(category);
        });
    });
    
    let currentSlide = 0;
    let slideInterval;

    // Function to show a specific slide
    function showSlide(index) {
        // Remove active class from all slides and dots
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active class to current slide and dot
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        
        currentSlide = index;
    }

    // Event listeners for navigation buttons
    prevBtn.addEventListener('click', function() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
        resetInterval();
    });

    nextBtn.addEventListener('click', function() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
        resetInterval();
    });

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', function() {
            showSlide(index);
            resetInterval();
        });
    });

    // Auto-rotate slides
    function startInterval() {
        slideInterval = setInterval(function() {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
    }

    // Reset interval when manually navigating
    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }

    // Initialize carousel
    showSlide(0);
    startInterval();
}

// Product Sections Functionality
function initProductSections() {
    // Load Hot Sales
    loadProductSection('hotSalesGrid', getHotSales());
    
    // Load Most Sold
    loadProductSection('mostSoldGrid', getBestSellers());
    
    // Load Discounts
    loadProductSection('discountsGrid', getDiscountedProducts());
    
    // Initialize scroll buttons
    initScrollButtons();
    
    // Initialize discount filters
    initDiscountFilters();
}

// Function to create product cards and load them into sections
function loadProductSection(containerId, products) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    container.innerHTML = '';
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        container.appendChild(productCard);
    });
}

// Function to create a product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    card.setAttribute('data-product-id', product.id);
    
    // Create badge if product has one
    let badgeHtml = '';
    if (product.badge) {
        badgeHtml = `<div class="product-badge">${product.badge}</div>`;
    }
    
    // Create price display (original and current)
    let priceHtml = '';
    if (product.originalPrice && product.originalPrice > product.price) {
        priceHtml = `
            <div class="product-price">
                <span class="current-price">$${product.price.toFixed(2)}</span>
                <span class="original-price">$${product.originalPrice.toFixed(2)}</span>
            </div>
        `;
    } else {
        priceHtml = `
            <div class="product-price">
                <span class="current-price">$${product.price.toFixed(2)}</span>
            </div>
        `;
    }
    
    // Check if product is in wishlist
    const wishlist = JSON.parse(localStorage.getItem('kingKitchenWishlist')) || [];
    const isInWishlist = wishlist.includes(product.id);
    const heartIconClass = isInWishlist ? 'fas' : 'far';
    
    // Construct the card HTML
    card.innerHTML = `
        <div class="product-image">
            <img src="${product.image}" alt="${product.name}" loading="lazy">
            ${badgeHtml}
        </div>
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            ${priceHtml}
            <div class="product-actions">
                <button class="add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
                <button class="wishlist-btn" data-id="${product.id}"><i class="${heartIconClass} fa-heart"></i></button>
            </div>
        </div>
    `;
    
    // Add event listener to Add to Cart button
    const addToCartBtn = card.querySelector('.add-to-cart-btn');
    addToCartBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const productId = parseInt(this.getAttribute('data-product-id'));
        addToCart(productId);
    });
    
    // Add event listener to Wishlist button
    const wishlistBtn = card.querySelector('.wishlist-btn');
    wishlistBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const productId = parseInt(this.getAttribute('data-id'));
        toggleWishlist(productId);
    });
    
    return card;
}

// Initialize horizontal scroll buttons
function initScrollButtons() {
    const scrollSections = document.querySelectorAll('.product-section');
    
    scrollSections.forEach(section => {
        const productGrid = section.querySelector('.product-grid');
        if (!productGrid) return;
        
        const leftBtn = section.querySelector('.scroll-btn.left');
        const rightBtn = section.querySelector('.scroll-btn.right');
        
        if (leftBtn && rightBtn) {
            leftBtn.addEventListener('click', function() {
                productGrid.scrollBy({
                    left: -300,
                    behavior: 'smooth'
                });
            });
            
            rightBtn.addEventListener('click', function() {
                productGrid.scrollBy({
                    left: 300,
                    behavior: 'smooth'
                });
            });
        }
    });
}

// Initialize discount filters
function initDiscountFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filter = this.getAttribute('data-filter');
            
            // Load filtered products
            loadProductSection('discountsGrid', getProductsByDiscountPercentage(filter));
        });
    });
}

// Search Functionality
function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchInput || !searchResults) return;
    
    searchInput.addEventListener('focus', function() {
        searchResults.classList.add('active');
    });
    
    searchInput.addEventListener('blur', function() {
        // Delay hiding results to allow for clicking on them
        setTimeout(() => {
            searchResults.classList.remove('active');
        }, 200);
    });
    
    searchInput.addEventListener('input', function() {
        const query = this.value.trim();
        
        if (query.length < 2) {
            searchResults.innerHTML = '';
            return;
        }
        
        const results = searchProducts(query);
        displaySearchResults(results, searchResults);
    });
}

// Display search results
function displaySearchResults(results, container) {
    container.innerHTML = '';
    
    if (results.length === 0) {
        container.innerHTML = '<p class="no-results">No products found</p>';
        return;
    }
    
    // Limit to 5 results for better UX
    const limitedResults = results.slice(0, 5);
    
    limitedResults.forEach(product => {
        const resultItem = document.createElement('div');
        resultItem.className = 'search-result-item';
        resultItem.innerHTML = `
            <div class="search-result-image">
                <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="result-info">
                <h4>${product.name}</h4>
                <p class="result-price">$${product.price.toFixed(2)}</p>
                <button class="add-to-cart-btn search-cart-btn" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        
        // Add event listener for the entire item (except the button)
        resultItem.addEventListener('click', function(e) {
            // Don't trigger if clicking on the Add to Cart button
            if (!e.target.classList.contains('add-to-cart-btn')) {
                // Scroll to the product section
                scrollToProductCategory(product.category);
                // Close search results
                container.classList.remove('active');
            }
        });
        
        container.appendChild(resultItem);
    });
    
    // Add event listeners to the Add to Cart buttons
    const addToCartButtons = container.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent triggering the parent click event
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
        });
    });
    
    // Add "View all results" link if there are more than 5 results
    if (results.length > 5) {
        const viewAllLink = document.createElement('div');
        viewAllLink.className = 'view-all-results';
        viewAllLink.innerHTML = `<a href="#">View all ${results.length} results</a>`;
        container.appendChild(viewAllLink);
    }
}

// Cart Functionality
function initCart() {
    // Initialize cart from localStorage
    let cart = JSON.parse(localStorage.getItem('kingKitchenCart')) || [];
    updateCartCount(cart.length);
    
    // Cart toggle
    const cartIcon = document.getElementById('cartIcon');
    const cartSidebar = document.getElementById('cartSidebar');
    const closeCartSidebar = document.getElementById('closeCartSidebar');
    const overlay = document.getElementById('overlay');
    const checkoutBtn = document.querySelector('.checkout-btn');
    
    if (cartIcon && cartSidebar) {
        cartIcon.addEventListener('click', function(e) {
            e.preventDefault();
            openCartSidebar();
        });
        
        if (closeCartSidebar) {
            closeCartSidebar.addEventListener('click', function() {
                cartSidebar.classList.remove('open');
                overlay.classList.remove('active');
            });
        }
        
        // Add checkout button functionality
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', function() {
                // Proceed to checkout page
                window.location.href = 'checkout.html';
            });
        }
    }
}

// Open cart sidebar and display items
function openCartSidebar() {
    const cartSidebar = document.getElementById('cartSidebar');
    const overlay = document.getElementById('overlay');
    
    if (cartSidebar && overlay) {
        cartSidebar.classList.add('open');
        overlay.classList.add('active');
        updateCartDisplay();
    }
    
    // Cart confirmation
    const cartConfirmation = document.getElementById('cartConfirmation');
    const continueShopping = document.getElementById('continueShopping');
    const viewCart = document.getElementById('viewCart');
    
    if (continueShopping) {
        continueShopping.addEventListener('click', function() {
            cartConfirmation.classList.remove('show');
        });
    }
    
    if (viewCart) {
        viewCart.addEventListener('click', function() {
            cartConfirmation.classList.remove('show');
            cartSidebar.classList.add('open');
            overlay.classList.add('active');
            updateCartDisplay();
        });
    }
}

// Add product to cart
function addToCart(productId) {
    // Get cart from localStorage
    let cart = JSON.parse(localStorage.getItem('kingKitchenCart')) || [];
    
    // Check if product is already in cart
    const existingProduct = cart.find(item => item.id === productId);
    
    if (existingProduct) {
        // Increment quantity if product already exists
        existingProduct.quantity = Number(existingProduct.quantity) + 1;
    } else {
        // Add new product to cart
        const product = getProductById(productId);
        if (product) {
            cart.push({
                id: product.id,
                name: product.name,
                price: Number(product.price),
                image: product.image,
                quantity: 1
            });
        }
    }
    
    // Save cart to localStorage
    localStorage.setItem('kingKitchenCart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount(cart.length);
    
    // Show confirmation
    showCartConfirmation();
    
    console.log('Added to cart:', productId, 'Cart now contains:', cart.length, 'items');
}

// Update cart count in UI
function updateCartCount(count) {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        cartCount.textContent = count;
    }
}

// Show cart confirmation
function showCartConfirmation() {
    const cartConfirmation = document.getElementById('cartConfirmation');
    if (cartConfirmation) {
        cartConfirmation.classList.add('show');
        
        // Auto-hide after 3 seconds
        setTimeout(() => {
            cartConfirmation.classList.remove('show');
        }, 3000);
    }
}

// Update cart display in sidebar
function updateCartDisplay() {
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartItems || !cartTotal) return;
    
    // Get cart from localStorage
    const cart = JSON.parse(localStorage.getItem('kingKitchenCart')) || [];
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotal.textContent = '$0.00';
        return;
    }
    
    // Clear cart items
    cartItems.innerHTML = '';
    
    // Calculate total
    let total = 0;
    
    // Add each item to cart display
    cart.forEach(item => {
        // Ensure price and quantity are numbers
        const price = Number(item.price) || 0;
        const quantity = Number(item.quantity) || 1;
        const itemTotal = price * quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="cart-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <h4 class="cart-item-name">${item.name}</h4>
                <p class="cart-item-price">$${price.toFixed(2)}</p>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                    <input type="number" class="quantity-input" value="${quantity}" min="1" data-id="${item.id}">
                    <button class="quantity-btn increase" data-id="${item.id}">+</button>
                </div>
            </div>
            <button class="cart-item-remove" data-id="${item.id}"><i class="fas fa-times"></i></button>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    // Update total
    cartTotal.textContent = `$${total.toFixed(2)}`;
    
    // Add event listeners to cart item buttons
    addCartItemEventListeners();
    
    console.log('Cart updated, total:', total);
}

// Add event listeners to cart item buttons
function addCartItemEventListeners() {
    // Decrease quantity
    const decreaseButtons = document.querySelectorAll('.quantity-btn.decrease');
    decreaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            updateCartItemQuantity(productId, 'decrease');
        });
    });
    
    // Increase quantity
    const increaseButtons = document.querySelectorAll('.quantity-btn.increase');
    increaseButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            updateCartItemQuantity(productId, 'increase');
        });
    });
    
    // Quantity input
    const quantityInputs = document.querySelectorAll('.quantity-input');
    quantityInputs.forEach(input => {
        input.addEventListener('change', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            const quantity = parseInt(this.value);
            
            if (quantity < 1) {
                this.value = 1;
                updateCartItemQuantity(productId, 'set', 1);
            } else {
                updateCartItemQuantity(productId, 'set', quantity);
            }
        });
    });
    
    // Remove item
    const removeButtons = document.querySelectorAll('.cart-item-remove');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            removeCartItem(productId);
        });
    });
}

// Update cart item quantity
function updateCartItemQuantity(productId, action, value = null) {
    // Get cart from localStorage
    let cart = JSON.parse(localStorage.getItem('kingKitchenCart')) || [];
    
    // Find product in cart
    const productIndex = cart.findIndex(item => item.id === productId);
    
    if (productIndex === -1) return;
    
    // Ensure current quantity is a number
    cart[productIndex].quantity = Number(cart[productIndex].quantity) || 1;
    
    if (action === 'increase') {
        // Increase quantity
        cart[productIndex].quantity += 1;
    } else if (action === 'decrease') {
        // Decrease quantity, but not below 1
        if (cart[productIndex].quantity > 1) {
            cart[productIndex].quantity -= 1;
        }
    } else if (action === 'set' && value !== null) {
        // Set quantity to specific value
        const newQuantity = parseInt(value);
        if (newQuantity > 0) {
            cart[productIndex].quantity = newQuantity;
        } else {
            // If quantity is 0 or negative, remove item from cart
            cart.splice(productIndex, 1);
        }
    }
    
    // Save cart to localStorage
    localStorage.setItem('kingKitchenCart', JSON.stringify(cart));
    
    // Update cart display
    updateCartDisplay();
    
    // Update cart count
    updateCartCount(cart.length);
    
    console.log('Updated quantity for product:', productId, 'Action:', action, 'New cart:', cart);
}

// Remove item from cart
function removeCartItem(productId) {
    // Get cart from localStorage
    let cart = JSON.parse(localStorage.getItem('kingKitchenCart')) || [];
    
    // Remove product from cart
    cart = cart.filter(item => item.id !== productId);
    
    // Save cart to localStorage
    localStorage.setItem('kingKitchenCart', JSON.stringify(cart));
    
    // Update cart count
    updateCartCount(cart.length);
    
    // Update cart display
    updateCartDisplay();
}

// Wishlist Functionality
function initWishlist() {
    // Initialize wishlist count
    updateWishlistCount();
    
    // Add event listener to wishlist icon in the nav bar
    const wishlistIcon = document.getElementById('wishlistIcon');
    if (wishlistIcon) {
        wishlistIcon.addEventListener('click', function(e) {
            e.preventDefault();
            openWishlistSidebar();
        });
    }
    
    // Add event listener to close wishlist sidebar button
    const closeWishlistSidebar = document.getElementById('closeWishlistSidebar');
    if (closeWishlistSidebar) {
        closeWishlistSidebar.addEventListener('click', function() {
            document.getElementById('wishlistSidebar').classList.remove('open');
            document.getElementById('overlay').classList.remove('active');
        });
    }
    
    // Add event listener to "Add All to Cart" button
    const addAllToCartBtn = document.getElementById('addAllToCart');
    if (addAllToCartBtn) {
        addAllToCartBtn.addEventListener('click', function() {
            addAllWishlistItemsToCart();
        });
    }
}

// Open wishlist sidebar and display items
function openWishlistSidebar() {
    // Get wishlist from localStorage
    const wishlist = JSON.parse(localStorage.getItem('kingKitchenWishlist')) || [];
    
    // Get wishlist sidebar element
    const wishlistSidebar = document.getElementById('wishlistSidebar');
    const wishlistItems = document.getElementById('wishlistItems');
    
    // Clear previous items
    wishlistItems.innerHTML = '';
    
    // If wishlist is empty, show message
    if (wishlist.length === 0) {
        wishlistItems.innerHTML = '<div class="empty-wishlist">Your wishlist is empty</div>';
    } else {
        // Loop through wishlist items and create elements
        wishlist.forEach(productId => {
            const product = getProductById(productId);
            if (product) {
                const wishlistItem = document.createElement('div');
                wishlistItem.className = 'wishlist-item';
                wishlistItem.innerHTML = `
                    <div class="wishlist-item-image">
                        <img src="${product.image}" alt="${product.name}">
                    </div>
                    <div class="wishlist-item-info">
                        <h4>${product.name}</h4>
                        <div class="wishlist-item-price">$${product.price.toFixed(2)}</div>
                        <div class="wishlist-item-actions">
                            <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>
                            <button class="remove-from-wishlist-btn" data-id="${product.id}"><i class="fas fa-trash"></i></button>
                        </div>
                    </div>
                `;
                
                wishlistItems.appendChild(wishlistItem);
            }
        });
        
        // Add event listeners to wishlist item buttons
        addWishlistItemEventListeners();
    }
    
    // Open sidebar
    wishlistSidebar.classList.add('open');
    document.getElementById('overlay').classList.add('active');
}

// Toggle wishlist item
function toggleWishlist(productId) {
    // Get wishlist from localStorage
    let wishlist = JSON.parse(localStorage.getItem('kingKitchenWishlist')) || [];
    
    // Check if product is already in wishlist
    const productIndex = wishlist.findIndex(id => id === productId);
    
    if (productIndex !== -1) {
        // Remove from wishlist
        wishlist.splice(productIndex, 1);
        
        // Change heart icon back to outline
        const heartIcon = document.querySelector(`.wishlist-btn[data-id="${productId}"] i`);
        if (heartIcon) {
            heartIcon.classList.remove('fas');
            heartIcon.classList.add('far');
        }
    } else {
        // Add to wishlist
        wishlist.push(productId);
        
        // Change heart icon to solid
        const heartIcon = document.querySelector(`.wishlist-btn[data-id="${productId}"] i`);
        if (heartIcon) {
            heartIcon.classList.remove('far');
            heartIcon.classList.add('fas');
        }
        
        // Show confirmation
        showWishlistConfirmation();
    }
    
    // Save wishlist to localStorage
    localStorage.setItem('kingKitchenWishlist', JSON.stringify(wishlist));
    
    // Update wishlist count
    updateWishlistCount();
}

// Update wishlist count in UI
function updateWishlistCount() {
    const wishlist = JSON.parse(localStorage.getItem('kingKitchenWishlist')) || [];
    const wishlistCount = document.getElementById('wishlistCount');
    
    if (wishlistCount) {
        wishlistCount.textContent = wishlist.length;
        
        // Show/hide count based on items
        if (wishlist.length > 0) {
            wishlistCount.style.display = 'flex';
        } else {
            wishlistCount.style.display = 'none';
        }
    }
}

// Show wishlist confirmation
function showWishlistConfirmation() {
    // Create confirmation element if it doesn't exist
    let confirmation = document.getElementById('wishlistConfirmation');
    
    if (!confirmation) {
        confirmation = document.createElement('div');
        confirmation.id = 'wishlistConfirmation';
        confirmation.className = 'confirmation-toast';
        confirmation.innerHTML = '<i class="fas fa-heart"></i> Added to wishlist!';
        document.body.appendChild(confirmation);
    }
    
    // Show confirmation
    confirmation.classList.add('show');
    
    // Hide after 2 seconds
    setTimeout(() => {
        confirmation.classList.remove('show');
    }, 2000);
}

// Add event listeners to wishlist item buttons
function addWishlistItemEventListeners() {
    // Add to cart buttons
    const addToCartButtons = document.querySelectorAll('.wishlist-item .add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            addToCart(productId);
        });
    });
    
    // Remove from wishlist buttons
    const removeButtons = document.querySelectorAll('.wishlist-item .remove-from-wishlist-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productId = parseInt(this.getAttribute('data-id'));
            removeFromWishlist(productId);
        });
    });
}

// Remove item from wishlist
function removeFromWishlist(productId) {
    // Get wishlist from localStorage
    let wishlist = JSON.parse(localStorage.getItem('kingKitchenWishlist')) || [];
    
    // Remove product from wishlist
    wishlist = wishlist.filter(id => id !== productId);
    
    // Save wishlist to localStorage
    localStorage.setItem('kingKitchenWishlist', JSON.stringify(wishlist));
    
    // Update wishlist count
    updateWishlistCount();
    
    // Update wishlist display
    openWishlistSidebar();
    
    // Update heart icon on product cards
    const heartIcon = document.querySelector(`.wishlist-btn[data-id="${productId}"] i`);
    if (heartIcon) {
        heartIcon.classList.remove('fas');
        heartIcon.classList.add('far');
    }
}

// Add all wishlist items to cart
function addAllWishlistItemsToCart() {
    // Get wishlist from localStorage
    const wishlist = JSON.parse(localStorage.getItem('kingKitchenWishlist')) || [];
    
    if (wishlist.length === 0) return;
    
    // Add each item to cart
    wishlist.forEach(productId => {
        addToCart(productId);
    });
    
    // Show confirmation
    alert('All wishlist items have been added to your cart!');
}

// Get product by ID
function getProductById(productId) {
    // Combine all products
    const allProducts = products;
    
    // Find product by ID
    return allProducts.find(product => product.id === productId);
}

// Filter products by category
function filterProductsByCategory(category) {
    // Get filtered products
    const filteredProducts = products.filter(product => product.category === category);
    
    // Display filtered products
    displayFilteredProducts(filteredProducts, `${category} Products`);
}

// Filter products by subcategory
function filterProductsBySubcategory(category, subcategory) {
    // Get filtered products
    const filteredProducts = products.filter(product => 
        product.category === category && product.subcategory === subcategory
    );
    
    // Display filtered products
    displayFilteredProducts(filteredProducts, `${subcategory} Products`);
}

// Display filtered products
function displayFilteredProducts(filteredProducts, title) {
    // Get filtered products section
    const filteredProductsSection = document.getElementById('filteredProducts');
    const filteredProductsGrid = document.getElementById('filteredProductsGrid');
    const filteredProductsTitle = document.getElementById('filteredProductsTitle');
    
    if (!filteredProductsSection || !filteredProductsGrid || !filteredProductsTitle) return;
    
    // Clear previous products
    filteredProductsGrid.innerHTML = '';
    
    // Update title
    filteredProductsTitle.textContent = title;
    
    // Show filtered products section
    filteredProductsSection.style.display = 'block';
    
    // Scroll to filtered products section
    filteredProductsSection.scrollIntoView({ behavior: 'smooth' });
    
    // If no products found
    if (filteredProducts.length === 0) {
        filteredProductsGrid.innerHTML = '<div class="no-products">No products found in this category</div>';
        return;
    }
    
    // Add products to grid
    filteredProducts.forEach(product => {
        const card = createProductCard(product);
        filteredProductsGrid.appendChild(card);
    });
}

// Clear product filters
function clearProductFilters() {
    // Hide filtered products section
    const filteredProductsSection = document.getElementById('filteredProducts');
    if (filteredProductsSection) {
        filteredProductsSection.style.display = 'none';
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Scroll to product category section
function scrollToProductCategory(category) {
    // First try to find a section with the exact category name
    let targetSection = document.querySelector(`section[data-category="${category}"]`);
    
    // If not found, default to the hot sales section
    if (!targetSection) {
        targetSection = document.getElementById('hotSales');
    }
    
    if (targetSection) {
        // Scroll to the section with a smooth animation
        targetSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Scroll to category from hero carousel
function scrollToCategory(category) {
    // Find the appropriate section based on the category
    let targetSection;
    
    // Map hero carousel categories to actual sections
    switch(category) {
        case 'Espresso Machines':
            targetSection = document.getElementById('hotSales');
            break;
        case 'Blenders & Mixers':
            targetSection = document.getElementById('mostSold');
            break;
        case 'Air Fryers':
            targetSection = document.getElementById('discounts');
            break;
        default:
            targetSection = document.getElementById('hotSales');
            break;
    }
    
    if (targetSection) {
        // Scroll to the section with a smooth animation
        targetSection.scrollIntoView({ behavior: 'smooth' });
    }
}

// Newsletter Functionality
function initNewsletter() {
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    
    newsletterForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // In a real application, you would send this to a server
                // For now, we'll just show a confirmation message
                showNewsletterConfirmation(email);
                emailInput.value = '';
            }
        });
    });
}

// Show newsletter subscription confirmation
function showNewsletterConfirmation(email) {
    // Create confirmation element
    const confirmation = document.createElement('div');
    confirmation.className = 'newsletter-confirmation';
    confirmation.innerHTML = `
        <div class="confirmation-content">
            <i class="fas fa-check-circle"></i>
            <p>Thank you for subscribing!</p>
            <p class="email-info">We've sent a confirmation email to <strong>${email}</strong></p>
        </div>
    `;
    
    // Add styles
    confirmation.style.position = 'fixed';
    confirmation.style.top = '50%';
    confirmation.style.left = '50%';
    confirmation.style.transform = 'translate(-50%, -50%)';
    confirmation.style.backgroundColor = 'white';
    confirmation.style.padding = '30px';
    confirmation.style.borderRadius = '8px';
    confirmation.style.boxShadow = '0 5px 15px rgba(0,0,0,0.2)';
    confirmation.style.zIndex = '1000';
    confirmation.style.textAlign = 'center';
    
    // Style the icon
    const icon = confirmation.querySelector('i');
    icon.style.color = '#e67e22';
    icon.style.fontSize = '48px';
    icon.style.marginBottom = '15px';
    
    // Add overlay
    const overlay = document.createElement('div');
    overlay.className = 'newsletter-overlay';
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    overlay.style.zIndex = '999';
    
    // Add to document
    document.body.appendChild(overlay);
    document.body.appendChild(confirmation);
    
    // Remove after 3 seconds
    setTimeout(() => {
        document.body.removeChild(overlay);
        document.body.removeChild(confirmation);
    }, 3000);
}

// Initialize footer links
function initFooterLinks() {
    // Social media links
    const socialLinks = document.querySelectorAll('.social-icons a');
    socialLinks.forEach(link => {
        if (!link.getAttribute('target')) {
            link.setAttribute('target', '_blank');
        }
    });
    
    // Shop category links
    const shopLinks = document.querySelectorAll('.footer-column:nth-child(2) ul li a');
    shopLinks.forEach(link => {
        if (link.getAttribute('href') === '#') {
            const category = link.textContent.trim();
            link.setAttribute('href', `pages/category.html?category=${encodeURIComponent(category)}`);
        }
    });
    
    // Customer service links
    const serviceLinks = document.querySelectorAll('.footer-column:nth-child(3) ul li a');
    serviceLinks.forEach(link => {
        if (link.getAttribute('href') === '#') {
            const service = link.textContent.trim().toLowerCase();
            switch(service) {
                case 'contact us':
                    link.setAttribute('href', 'pages/contact.html');
                    break;
                case 'shipping & returns':
                    link.setAttribute('href', 'pages/shipping.html');
                    break;
                case 'faq':
                    link.setAttribute('href', 'pages/faq.html');
                    break;
                case 'track order':
                    link.setAttribute('href', 'pages/track-order.html');
                    break;
            }
        }
    });
    
    // Footer bottom links
    const bottomLinks = document.querySelectorAll('.footer-bottom .footer-links a');
    bottomLinks.forEach(link => {
        if (link.getAttribute('href') === '#') {
            const page = link.textContent.trim().toLowerCase();
            switch(page) {
                case 'privacy policy':
                    link.setAttribute('href', 'pages/privacy.html');
                    break;
                case 'terms of service':
                    link.setAttribute('href', 'pages/terms.html');
                    break;
                case 'accessibility':
                    link.setAttribute('href', 'pages/accessibility.html');
                    break;
            }
        }
    });
}
