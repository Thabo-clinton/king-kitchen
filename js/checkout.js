// King Kitchen - Checkout JavaScript

document.addEventListener('DOMContentLoaded', function() {
    console.log('Checkout page loaded');
    
    // Check if cart exists and is not empty
    const cart = JSON.parse(localStorage.getItem('kingKitchenCart')) || [];
    if (cart.length === 0) {
        console.log('Cart is empty, redirecting to home page');
        window.location.href = 'index.html';
        return;
    }
    
    // Initialize checkout page
    loadOrderSummary();
    setupPaymentToggle();
    setupCheckoutForm();
    updateCartCount();
    initFooterLinks();
});

// Load and display order summary
function loadOrderSummary() {
    const cart = JSON.parse(localStorage.getItem('kingKitchenCart')) || [];
    const orderItems = document.getElementById('orderItems');
    const orderSubtotal = document.getElementById('orderSubtotal');
    const orderShipping = document.getElementById('orderShipping');
    const orderTax = document.getElementById('orderTax');
    const orderTotal = document.getElementById('orderTotal');
    
    if (!orderItems) {
        console.error('Order items container not found');
        return;
    }
    
    // Clear previous items
    orderItems.innerHTML = '';
    
    // Calculate totals
    let subtotal = 0;
    
    // Add each item to the order summary
    cart.forEach(item => {
        const price = Number(item.price) || 0;
        const quantity = Number(item.quantity) || 1;
        const itemTotal = price * quantity;
        subtotal += itemTotal;
        
        const orderItem = document.createElement('div');
        orderItem.className = 'order-item';
        orderItem.innerHTML = `
            <div class="order-item-image">
                <img src="${item.image}" alt="${item.name}">
            </div>
            <div class="order-item-details">
                <h4 class="order-item-name">${item.name}</h4>
                <p class="order-item-price">$${price.toFixed(2)}</p>
                <p class="order-item-quantity">Quantity: ${quantity}</p>
            </div>
        `;
        
        orderItems.appendChild(orderItem);
    });
    
    // Calculate shipping, tax, and total
    const shipping = subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.08; // 8% tax rate
    const total = subtotal + shipping + tax;
    
    // Update summary display
    if (orderSubtotal) orderSubtotal.textContent = `$${subtotal.toFixed(2)}`;
    if (orderShipping) orderShipping.textContent = shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`;
    if (orderTax) orderTax.textContent = `$${tax.toFixed(2)}`;
    if (orderTotal) orderTotal.textContent = `$${total.toFixed(2)}`;
    
    console.log('Order summary loaded:', {subtotal, shipping, tax, total});
}

// Setup payment method toggle
function setupPaymentToggle() {
    const creditCardRadio = document.getElementById('creditCard');
    const paypalRadio = document.getElementById('paypal');
    const creditCardForm = document.getElementById('creditCardForm');
    const paypalForm = document.getElementById('paypalForm');
    
    if (creditCardRadio && paypalRadio && creditCardForm && paypalForm) {
        creditCardRadio.addEventListener('change', function() {
            if (this.checked) {
                creditCardForm.classList.remove('hidden');
                paypalForm.classList.add('hidden');
            }
        });
        
        paypalRadio.addEventListener('change', function() {
            if (this.checked) {
                creditCardForm.classList.add('hidden');
                paypalForm.classList.remove('hidden');
            }
        });
    }
}

// Setup checkout form submission
function setupCheckoutForm() {
    const checkoutForm = document.getElementById('checkoutForm');
    const overlay = document.getElementById('overlay');
    const orderConfirmationModal = document.getElementById('orderConfirmationModal');
    const closeConfirmationModal = document.getElementById('closeConfirmationModal');
    
    if (!checkoutForm) {
        console.error('Checkout form not found');
        return;
    }
    
    checkoutForm.addEventListener('submit', function(e) {
        e.preventDefault();
        console.log('Form submitted');
        
        // Basic form validation
        if (!validateForm()) {
            return;
        }
        
        // Process the order
        processOrder();
        
        // Show confirmation
        if (overlay && orderConfirmationModal) {
            overlay.classList.add('active');
            orderConfirmationModal.classList.add('active');
        } else {
            alert('Order placed successfully! Thank you for your purchase.');
        }
    });
    
    if (closeConfirmationModal) {
        closeConfirmationModal.addEventListener('click', function() {
            if (overlay && orderConfirmationModal) {
                overlay.classList.remove('active');
                orderConfirmationModal.classList.remove('active');
            }
        });
    }
}

// Form validation function
function validateForm() {
    // Get required fields
    const email = document.getElementById('email');
    const firstName = document.getElementById('firstName');
    const lastName = document.getElementById('lastName');
    const address = document.getElementById('address');
    const city = document.getElementById('city');
    const zipCode = document.getElementById('zipCode');
    
    // Basic validation
    if (!email || !email.value) {
        alert('Please enter your email address');
        return false;
    }
    
    if (!firstName || !firstName.value) {
        alert('Please enter your first name');
        return false;
    }
    
    if (!lastName || !lastName.value) {
        alert('Please enter your last name');
        return false;
    }
    
    if (!address || !address.value) {
        alert('Please enter your address');
        return false;
    }
    
    if (!city || !city.value) {
        alert('Please enter your city');
        return false;
    }
    
    if (!zipCode || !zipCode.value) {
        alert('Please enter your zip/postal code');
        return false;
    }
    
    // Credit card validation if selected
    const creditCardRadio = document.getElementById('creditCard');
    if (creditCardRadio && creditCardRadio.checked) {
        const cardNumber = document.getElementById('cardNumber');
        const expiryDate = document.getElementById('expiryDate');
        const cvv = document.getElementById('cvv');
        
        if (!cardNumber || !cardNumber.value) {
            alert('Please enter your card number');
            return false;
        }
        
        if (!expiryDate || !expiryDate.value) {
            alert('Please enter your card expiry date');
            return false;
        }
        
        if (!cvv || !cvv.value) {
            alert('Please enter your card CVV');
            return false;
        }
    }
    
    return true;
}

// Process the order
function processOrder() {
    // Get cart data
    const cart = JSON.parse(localStorage.getItem('kingKitchenCart')) || [];
    
    // Get customer information
    const customerInfo = {
        firstName: document.getElementById('firstName')?.value || '',
        lastName: document.getElementById('lastName')?.value || '',
        email: document.getElementById('email')?.value || '',
        phone: document.getElementById('phone')?.value || '',
        address: document.getElementById('address')?.value || '',
        addressLine2: document.getElementById('addressLine2')?.value || '',
        city: document.getElementById('city')?.value || '',
        state: document.getElementById('state')?.value || '',
        zipCode: document.getElementById('zipCode')?.value || '',
        country: document.getElementById('country')?.value || ''
    };
    
    // Get payment method
    const paymentMethod = document.getElementById('creditCard')?.checked ? 'creditCard' : 'paypal';
    
    // Generate order number and get date
    const orderNumber = generateOrderNumber();
    const orderDate = new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Calculate totals
    let subtotal = 0;
    cart.forEach(item => {
        const price = Number(item.price) || 0;
        const quantity = Number(item.quantity) || 1;
        subtotal += price * quantity;
    });
    
    const shipping = subtotal > 100 ? 0 : 10;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    
    // Create order object
    const order = {
        orderNumber: orderNumber,
        orderDate: orderDate,
        customerInfo: customerInfo,
        paymentMethod: paymentMethod,
        items: cart,
        subtotal: subtotal,
        shipping: shipping,
        tax: tax,
        total: total
    };
    
    // Save order to localStorage
    saveOrder(order);
    
    // Update confirmation modal
    const confirmationOrderNumber = document.getElementById('confirmationOrderNumber');
    const confirmationOrderDate = document.getElementById('confirmationOrderDate');
    const confirmationOrderTotal = document.getElementById('confirmationOrderTotal');
    const confirmationEmail = document.getElementById('confirmationEmail');
    
    if (confirmationOrderNumber) confirmationOrderNumber.textContent = orderNumber;
    if (confirmationOrderDate) confirmationOrderDate.textContent = orderDate;
    if (confirmationOrderTotal) confirmationOrderTotal.textContent = `$${total.toFixed(2)}`;
    if (confirmationEmail) confirmationEmail.textContent = customerInfo.email;
    
    // Clear cart
    localStorage.removeItem('kingKitchenCart');
    
    console.log('Order processed successfully:', order);
}

// Generate a unique order number
function generateOrderNumber() {
    const timestamp = new Date().getTime().toString().slice(-6);
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `KK-${timestamp}-${random}`;
}

// Save order to localStorage
function saveOrder(order) {
    // Get existing orders
    const orders = JSON.parse(localStorage.getItem('kingKitchenOrders')) || [];
    
    // Add new order
    orders.push(order);
    
    // Save to localStorage
    localStorage.setItem('kingKitchenOrders', JSON.stringify(orders));
}

// Update cart count
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const cart = JSON.parse(localStorage.getItem('kingKitchenCart')) || [];
    
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Format credit card input
document.addEventListener('DOMContentLoaded', function() {
    const cardNumberInput = document.getElementById('cardNumber');
    const expiryDateInput = document.getElementById('expiryDate');
    
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            // Remove non-digits
            let input = this.value.replace(/\D/g, '');
            
            // Add spaces after every 4 digits
            let formatted = '';
            for (let i = 0; i < input.length; i++) {
                if (i > 0 && i % 4 === 0) {
                    formatted += ' ';
                }
                formatted += input[i];
            }
            
            // Limit to 16 digits (19 characters with spaces)
            this.value = formatted.substring(0, 19);
        });
    }
    
    if (expiryDateInput) {
        expiryDateInput.addEventListener('input', function(e) {
            // Remove non-digits
            let input = this.value.replace(/\D/g, '');
            
            // Format as MM/YY
            if (input.length > 2) {
                this.value = input.substring(0, 2) + '/' + input.substring(2, 4);
            } else {
                this.value = input;
            }
        });
    }
});

// Initialize footer links
function initFooterLinks() {
    // Social media links
    const socialLinks = document.querySelectorAll('.social-icons a');
    socialLinks.forEach(link => {
        if (!link.getAttribute('target')) {
            link.setAttribute('target', '_blank');
        }
        
        // Set social media URLs
        const icon = link.querySelector('i');
        if (icon) {
            if (icon.classList.contains('fa-facebook-f')) {
                link.setAttribute('href', 'https://facebook.com');
            } else if (icon.classList.contains('fa-instagram')) {
                link.setAttribute('href', 'https://instagram.com');
            } else if (icon.classList.contains('fa-twitter')) {
                link.setAttribute('href', 'https://twitter.com');
            } else if (icon.classList.contains('fa-pinterest-p')) {
                link.setAttribute('href', 'https://pinterest.com');
            }
        }
    });
    
    // Shop category links
    const shopLinks = document.querySelectorAll('.footer-column:nth-child(2) ul li a');
    shopLinks.forEach(link => {
        if (!link.getAttribute('href') || link.getAttribute('href') === '#') {
            const category = link.textContent.trim();
            link.setAttribute('href', `./pages/category.html?category=${encodeURIComponent(category)}`);
        }
    });
    
    // Customer service links
    const serviceLinks = document.querySelectorAll('.footer-column:nth-child(3) ul li a');
    serviceLinks.forEach(link => {
        if (!link.getAttribute('href') || link.getAttribute('href') === '#') {
            const service = link.textContent.trim().toLowerCase();
            switch(service) {
                case 'contact us':
                    link.setAttribute('href', './pages/contact.html');
                    break;
                case 'shipping & returns':
                    link.setAttribute('href', './pages/shipping.html');
                    break;
                case 'faq':
                    link.setAttribute('href', './pages/faq.html');
                    break;
                case 'track order':
                    link.setAttribute('href', './pages/track-order.html');
                    break;
            }
        }
    });
    
    // Footer bottom links
    const bottomLinks = document.querySelectorAll('.footer-bottom .footer-links a');
    bottomLinks.forEach(link => {
        if (!link.getAttribute('href') || link.getAttribute('href') === '#') {
            const page = link.textContent.trim().toLowerCase();
            switch(page) {
                case 'privacy policy':
                    link.setAttribute('href', './pages/privacy.html');
                    break;
                case 'terms of service':
                    link.setAttribute('href', './pages/terms.html');
                    break;
                case 'accessibility':
                    link.setAttribute('href', './pages/accessibility.html');
                    break;
            }
        }
    });
    
    // Newsletter form
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        // Remove any existing event listeners by cloning and replacing
        const newForm = newsletterForm.cloneNode(true);
        newsletterForm.parentNode.replaceChild(newForm, newsletterForm);
        
        newForm.addEventListener('submit', function(e) {
            e.preventDefault();
            console.log('Newsletter form submitted');
            const emailInput = this.querySelector('input[type="email"]');
            if (emailInput && emailInput.value) {
                showNewsletterConfirmation(emailInput.value);
                emailInput.value = '';
            }
        });
    }
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
