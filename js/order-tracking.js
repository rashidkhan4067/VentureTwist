// Order tracking functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all necessary DOM elements
    const orderForm = document.querySelector('#trackingForm');
    const orderStatus = document.getElementById('orderStatus');
    const progressbar = document.getElementById('progressbar');
    const displayOrderNumber = document.getElementById('displayOrderNumber');
    const estimatedDelivery = document.getElementById('estimatedDelivery');
    const currentStatus = document.getElementById('currentStatus');
    const orderItems = document.getElementById('orderItems');

    // Create error message div if it doesn't exist
    const errorDiv = createErrorDiv();

    // Ensure all required elements are present
    if (!orderForm || !orderStatus || !progressbar || !displayOrderNumber || 
        !estimatedDelivery || !currentStatus || !orderItems) {
        console.error('Required elements not found. Please check the HTML structure.');
        return;
    }

    // Initialize order storage
    const STORAGE_KEY = 'venture_twist_orders';
    
    // Get orders from localStorage or initialize with sample data
    let orderData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
        '12345': {
            status: 'preparing',
            estimatedDelivery: '2024-01-20 15:30',
            currentStep: 2,
            items: [
                { name: 'Grilled Chicken', quantity: 2, price: 30.00 },
                { name: 'Caesar Salad', quantity: 1, price: 12.00 },
                { name: 'Fresh Juice', quantity: 2, price: 10.00 }
            ],
            orderDate: '2024-01-20 13:30'
        },
        '12344': {
            status: 'delivered',
            estimatedDelivery: '2024-01-19 14:00',
            currentStep: 4,
            items: [
                { name: 'Beef Steak', quantity: 1, price: 35.00 },
                { name: 'Mushroom Soup', quantity: 2, price: 16.00 },
                { name: 'Chocolate Cake', quantity: 1, price: 8.00 }
            ],
            orderDate: '2024-01-19 12:00'
        }
    };

    // Save initial data if not exists
    if (!localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(orderData));
    }

    // Handle form submission
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent form submission
        const orderNumberInput = document.getElementById('orderNumber');
        const orderNumber = orderNumberInput?.value?.trim() || '';

        // Reset previous state
        orderStatus.style.display = 'none';
        errorDiv.style.display = 'none';

        // Validate input
        if (!orderNumber) {
            showError('Please enter an order number.');
            return;
        }

        if (orderData[orderNumber]) {
            displayOrderStatus(orderNumber);
            // Show order status section
            orderStatus.style.display = 'block';
            // Scroll to order status section smoothly
            orderStatus.scrollIntoView({ behavior: 'smooth' });
        } else {
            // Show error message
            showError(`We couldn't find any order with the number <strong>${orderNumber}</strong>.<br>Please check your order number and try again.`);
        }
    });

    // Show error message with fade-in effect
    function showError(message) {
        errorDiv.innerHTML = `
            <div class="col-lg-6">
                <div class="alert alert-danger text-center" role="alert">
                    <i class="fas fa-exclamation-circle me-2"></i>
                    ${message}
                </div>
            </div>
        `;
        errorDiv.style.display = 'block';
        errorDiv.style.opacity = '0';
        setTimeout(() => {
            errorDiv.style.transition = 'opacity 0.5s ease-in-out';
            errorDiv.style.opacity = '1';
        }, 10);
        errorDiv.scrollIntoView({ behavior: 'smooth' });
    }

    // Create error message div if it doesn't exist
    function createErrorDiv() {
        let div = document.getElementById('errorMessage');
        if (!div) {
            div = document.createElement('div');
            div.id = 'errorMessage';
            div.className = 'row justify-content-center mt-4';
            orderForm.parentNode.insertBefore(div, orderForm.nextSibling);
        }
        return div;
    }

    // Display order status
    function displayOrderStatus(orderNumber) {
        const order = orderData[orderNumber];
        
        // Show the order status section with a fade-in effect
        orderStatus.style.opacity = '0';
        orderStatus.style.display = 'block';
        setTimeout(() => {
            orderStatus.style.transition = 'opacity 0.5s ease-in-out';
            orderStatus.style.opacity = '1';
        }, 10);

        // Update progress bar
        updateProgressBar(order.currentStep);

        // Update order details
        displayOrderNumber.textContent = orderNumber;
        estimatedDelivery.textContent = formatDateTime(order.estimatedDelivery);
        currentStatus.textContent = capitalizeFirstLetter(order.status);

        // Display order items
        const itemsList = orderItems.querySelector('ul');
        itemsList.innerHTML = '';
        let totalAmount = 0;

        order.items.forEach(item => {
            const itemTotal = item.price * item.quantity;
            totalAmount += itemTotal;
            const li = document.createElement('li');
            li.className = 'mb-2';
            li.innerHTML = `
                <div class="d-flex justify-content-between align-items-center">
                    <span>${item.name} x ${item.quantity}</span>
                    <span>$${itemTotal.toFixed(2)}</span>
                </div>
            `;
            itemsList.appendChild(li);
        });

        // Add total amount
        const totalLi = document.createElement('li');
        totalLi.className = 'mt-3 border-top pt-3';
        totalLi.innerHTML = `
            <div class="d-flex justify-content-between align-items-center">
                <strong>Total Amount:</strong>
                <strong>$${totalAmount.toFixed(2)}</strong>
            </div>
        `;
        itemsList.appendChild(totalLi);
    }

    // Update progress bar based on current step
    function updateProgressBar(currentStep) {
        const steps = progressbar.children;
        for (let i = 0; i < steps.length; i++) {
            if (i < currentStep) {
                steps[i].classList.add('active');
            } else {
                steps[i].classList.remove('active');
            }
        }
    }

    // Helper function to format date time
    function formatDateTime(dateTimeStr) {
        const options = { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric', 
            hour: '2-digit', 
            minute: '2-digit' 
        };
        return new Date(dateTimeStr).toLocaleDateString('en-US', options);
    }

    // Helper function to capitalize first letter
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
});