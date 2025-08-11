// Order data management
const OrderDataManager = {
    // Sample order data structure
    sampleOrders: {
        '12345': {
            status: 'preparing',
            estimatedDelivery: '2024-01-20 15:30',
            currentStep: 2,
            items: [
                { name: 'Grilled Chicken', quantity: 2, price: 30.00 },
                { name: 'Caesar Salad', quantity: 1, price: 12.00 },
                { name: 'Fresh Juice', quantity: 2, price: 10.00 }
            ]
        },
        '12344': {
            status: 'delivered',
            estimatedDelivery: '2024-01-19 14:00',
            currentStep: 4,
            items: [
                { name: 'Beef Steak', quantity: 1, price: 35.00 },
                { name: 'Mushroom Soup', quantity: 2, price: 16.00 },
                { name: 'Chocolate Cake', quantity: 1, price: 8.00 }
            ]
        }
    },

    // Initialize orders in localStorage if not exists
    init() {
        if (!localStorage.getItem('orders')) {
            localStorage.setItem('orders', JSON.stringify(this.sampleOrders));
        }
    },

    // Get all orders
    getAllOrders() {
        return JSON.parse(localStorage.getItem('orders')) || {};
    },

    // Get specific order by order number
    getOrder(orderNumber) {
        const orders = this.getAllOrders();
        return orders[orderNumber] || null;
    },

    // Add new order
    addOrder(orderNumber, orderData) {
        const orders = this.getAllOrders();
        orders[orderNumber] = orderData;
        localStorage.setItem('orders', JSON.stringify(orders));
    },

    // Update order status
    updateOrderStatus(orderNumber, status, currentStep) {
        const orders = this.getAllOrders();
        if (orders[orderNumber]) {
            orders[orderNumber].status = status;
            orders[orderNumber].currentStep = currentStep;
            localStorage.setItem('orders', JSON.stringify(orders));
            return true;
        }
        return false;
    }
};

// Initialize order data when the script loads
OrderDataManager.init();