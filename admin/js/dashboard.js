// Initialize dashboard data
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    checkAuth();

    // Load dashboard statistics
    loadDashboardStats();

    // Load recent orders
    loadRecentOrders();
});

// Load dashboard statistics
function loadDashboardStats() {
    // In a real application, these would be fetched from a server
    const stats = {
        orders: 156,
        revenue: 8459.99,
        bookings: 24,
        menuItems: Object.values(menuData).flat().length
    };

    // Update the dashboard statistics
    document.getElementById('totalOrders').textContent = stats.orders;
    document.getElementById('totalRevenue').textContent = `$${stats.revenue.toFixed(2)}`;
    document.getElementById('totalBookings').textContent = stats.bookings;
    document.getElementById('totalMenuItems').textContent = stats.menuItems;
}

// Load recent orders
function loadRecentOrders() {
    // In a real application, these would be fetched from a server
    const recentOrders = [
        {
            id: 'ORD-2023-001',
            customer: 'John Doe',
            items: 'Artisan Burger, Fresh Fruit Smoothie',
            total: 25.98,
            status: 'Completed'
        },
        {
            id: 'ORD-2023-002',
            customer: 'Jane Smith',
            items: 'Seafood Paella, Berry Blast',
            total: 41.98,
            status: 'Processing'
        },
        {
            id: 'ORD-2023-003',
            customer: 'Mike Johnson',
            items: 'Classic American Breakfast, Espresso',
            total: 19.98,
            status: 'Pending'
        }
    ];

    // Populate the recent orders table
    const tableBody = document.getElementById('recentOrdersTable');
    tableBody.innerHTML = recentOrders.map(order => `
        <tr>
            <td>${order.id}</td>
            <td>${order.customer}</td>
            <td>${order.items}</td>
            <td>$${order.total.toFixed(2)}</td>
            <td><span class="badge bg-${getStatusColor(order.status)}">${order.status}</span></td>
            <td>
                <button class="btn btn-sm btn-primary" onclick="viewOrder('${order.id}')">View</button>
                <button class="btn btn-sm btn-success" onclick="updateStatus('${order.id}')">Update</button>
            </td>
        </tr>
    `).join('');
}

// Get appropriate color for status badge
function getStatusColor(status) {
    switch(status.toLowerCase()) {
        case 'completed': return 'success';
        case 'processing': return 'primary';
        case 'pending': return 'warning';
        default: return 'secondary';
    }
}

// View order details (to be implemented)
function viewOrder(orderId) {
    alert(`Viewing order ${orderId}`);
    // In a real application, this would open a modal or navigate to an order details page
}

// Update order status (to be implemented)
function updateStatus(orderId) {
    alert(`Updating status for order ${orderId}`);
    // In a real application, this would open a modal to update the order status
}