// Cart state
let cartItems = [];

// Create success message element
const createSuccessMessage = () => {
    const messageDiv = document.createElement('div');
    messageDiv.style.position = 'fixed';
    messageDiv.style.top = '20px';
    messageDiv.style.right = '20px';
    messageDiv.style.backgroundColor = '#28a745';
    messageDiv.style.color = 'white';
    messageDiv.style.padding = '15px 25px';
    messageDiv.style.borderRadius = '5px';
    messageDiv.style.zIndex = '1000';
    messageDiv.style.display = 'none';
    messageDiv.style.opacity = '0';
    messageDiv.style.transition = 'opacity 0.3s ease-in-out';
    messageDiv.id = 'success-message';
    document.body.appendChild(messageDiv);
    return messageDiv;
};

// Show success message
const showSuccessMessage = (message) => {
    let messageDiv = document.getElementById('success-message');
    if (!messageDiv) {
        messageDiv = createSuccessMessage();
    }
    messageDiv.textContent = message;
    messageDiv.style.display = 'block';
    setTimeout(() => {
        messageDiv.style.opacity = '1';
    }, 10);
    setTimeout(() => {
        messageDiv.style.opacity = '0';
        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 300);
    }, 3000);
};

// Cart functions
const cart = {
    addItem(item) {
        cartItems.push({
            ...item,
            id: Date.now(),
            quantity: 1
        });
        this.updateCartUI();
        this.saveCart();
        showSuccessMessage('Your product has been successfully added to cart');
    },

    removeItem(id) {
        cartItems = cartItems.filter(item => item.id !== id);
        this.updateCartUI();
        this.saveCart();
    },

    updateQuantity(id, quantity) {
        const item = cartItems.find(item => item.id === id);
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.updateCartUI();
            this.saveCart();
        }
    },

    getSubtotal() {
        const subtotal = cartItems.reduce((total, item) => {
            const price = parseFloat(item.price.replace(/[^0-9.]/g, ''));
            return total + (price * item.quantity);
        }, 0);
        return subtotal.toFixed(2);
    },

    getTax() {
        const subtotal = parseFloat(this.getSubtotal());
        const tax = subtotal * 0.1;
        return tax.toFixed(2);
    },

    getTotal() {
        const subtotal = parseFloat(this.getSubtotal());
        const tax = parseFloat(this.getTax());
        return (subtotal + tax).toFixed(2);
    },

    clearCart() {
        cartItems = [];
        this.updateCartUI();
        this.saveCart();
    },

    saveCart() {
        localStorage.setItem('cart', JSON.stringify(cartItems));
    },

    loadCart() {
        const savedCart = localStorage.getItem('cart');
        if (savedCart) {
            cartItems = JSON.parse(savedCart);
            this.updateCartUI();
        }
    },

    completePurchase() {
        const orderId = 'ORD-' + Date.now();
        const orderData = {
            id: orderId,
            items: cartItems,
            subtotal: this.getSubtotal(),
            tax: this.getTax(),
            total: this.getTotal(),
            date: new Date().toLocaleString()
        };
        localStorage.setItem('lastOrder', JSON.stringify(orderData));
        this.clearCart();
        window.location.href = 'receipt.html';
    },

    updateCartUI() {
        const cartCount = document.getElementById('cart-count');
        const cartTotal = document.getElementById('cart-total');
        const cartItemsList = document.getElementById('cart-items');
        const orderItems = document.getElementById('orderItems');
        const subtotalElement = document.getElementById('subtotal');
        const taxElement = document.getElementById('tax');
        const totalElement = document.getElementById('total');
        
        // Handle receipt page
        const orderIdElement = document.getElementById('order-id');
        const orderItemsElement = document.getElementById('order-items');
        
        if (orderIdElement && orderItemsElement) {
            const lastOrder = JSON.parse(localStorage.getItem('lastOrder') || '{}');
            if (lastOrder.id) {
                orderIdElement.textContent = lastOrder.id;
                orderItemsElement.innerHTML = lastOrder.items.map(item => `
                    <div class="d-flex justify-content-between mb-2">
                        <span>${item.name} x ${item.quantity}</span>
                        <span>$${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}</span>
                    </div>
                `).join('');
            }
        }

        if (cartCount) {
            cartCount.textContent = cartItems.length;
        }

        if (cartTotal) {
            cartTotal.textContent = `$${this.getTotal()}`;
        }

        // Update cart items in checkout page
        if (cartItemsList) {
            cartItemsList.innerHTML = cartItems.map(item => `
                <div class="cart-item d-flex justify-content-between align-items-center border-bottom py-2">
                    <div>
                        <h6 class="mb-0">${item.name}</h6>
                        <small class="text-muted">$${parseFloat(item.price.replace('$', ''))} x ${item.quantity}</small>
                    </div>
                    <div class="d-flex align-items-center">
                        <button class="btn btn-sm btn-outline-primary me-2" onclick="cart.updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                        <span>${item.quantity}</span>
                        <button class="btn btn-sm btn-outline-primary ms-2 me-3" onclick="cart.updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                        <button class="btn btn-sm btn-danger" onclick="cart.removeItem(${item.id})">×</button>
                    </div>
                </div>
            `).join('');
        }

        // Update order items in payment page
        if (orderItems) {
            orderItems.innerHTML = cartItems.map(item => `
                <div class="d-flex justify-content-between mb-3">
                    <div>
                        <h6 class="mb-0">${item.name}</h6>
                        <small class="text-muted">Quantity: ${item.quantity}</small>
                    </div>
                    <h6 class="mb-0">$${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}</h6>
                </div>
            `).join('');
        }

        // Update totals in both checkout and payment pages
        if (subtotalElement) {
            subtotalElement.textContent = `$${this.getSubtotal()}`;
        }
        if (taxElement) {
            taxElement.textContent = `$${this.getTax()}`;
        }
        if (totalElement) {
            totalElement.textContent = `$${this.getTotal()}`;
        }
    },
};

// Initialize cart when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    cart.loadCart();
});

function handleCashOnDelivery() {
    const form = document.getElementById('checkout-form');
    if (!form) return;

    // Get form data
    const formData = new FormData(form);
    const orderData = {
        items: cartItems,
        subtotal: cart.getSubtotal(),
        tax: cart.getTax(),
        total: cart.getTotal(),
        shippingInfo: {
            firstName: formData.get('firstName'),
            lastName: formData.get('lastName'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            address: formData.get('address'),
            city: formData.get('city'),
            postalCode: formData.get('postalCode')
        },
        paymentMethod: 'Cash on Delivery'
    };

    // Save order data for receipt
    orderData.orderId = generateOrderId();
    localStorage.setItem('currentOrder', JSON.stringify(orderData));

    // Clear cart and redirect to receipt
    cart.clearCart();
    window.location.href = 'receipt.html';
}

// Generate a unique order ID
function generateOrderId() {
    return 'ORDER-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
}

// Function to display receipt details
function displayReceipt() {
    const orderData = JSON.parse(localStorage.getItem('currentOrder'));
    if (!orderData) return;

    // Display order ID
    document.getElementById('order-id').textContent = orderData.orderId;

    // Display order items
    const orderItemsContainer = document.getElementById('order-items');
    if (orderItemsContainer) {
        orderItemsContainer.innerHTML = orderData.items.map(item => `
            <div class="d-flex justify-content-between mb-2">
                <span>${item.name} x ${item.quantity}</span>
                <span>$${(parseFloat(item.price.replace('$', '')) * item.quantity).toFixed(2)}</span>
            </div>
        `).join('');
    }

    // Display delivery information
    const deliveryInfoContainer = document.getElementById('delivery-info');
    if (deliveryInfoContainer) {
        deliveryInfoContainer.innerHTML = `
            <p class="mb-1">${orderData.shippingInfo.firstName} ${orderData.shippingInfo.lastName}</p>
            <p class="mb-1">${orderData.shippingInfo.address}</p>
            <p class="mb-1">${orderData.shippingInfo.city}, ${orderData.shippingInfo.postalCode}</p>
            <p class="mb-1">Email: ${orderData.shippingInfo.email}</p>
            <p class="mb-1">Phone: ${orderData.shippingInfo.phone}</p>
        `;
    }

    // Display payment summary
    document.getElementById('receipt-subtotal').textContent = `$${orderData.subtotal}`;
    document.getElementById('receipt-tax').textContent = `$${orderData.tax}`;
    document.getElementById('receipt-total').textContent = `$${orderData.total}`;

    // Clear the stored order data
    localStorage.removeItem('currentOrder');
}

// Initialize receipt page if we're on it
if (window.location.pathname.includes('receipt.html')) {
    displayReceipt();
}