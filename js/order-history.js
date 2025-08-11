// Order history management
let currentPage = 1;
const ordersPerPage = 5;

// Sample order data (in a real application, this would come from a backend)
const orders = [
    {
        id: '12345',
        date: 'January 15, 2024',
        status: 'Delivered',
        items: [
            { name: 'Grilled Chicken', quantity: 2, price: 30.00 },
            { name: 'Caesar Salad', quantity: 1, price: 12.00 },
            { name: 'Fresh Juice', quantity: 2, price: 10.00 }
        ],
        total: 52.00
    },
    {
        id: '12344',
        date: 'January 12, 2024',
        status: 'Delivered',
        items: [
            { name: 'Beef Steak', quantity: 1, price: 35.00 },
            { name: 'Mushroom Soup', quantity: 2, price: 16.00 },
            { name: 'Chocolate Cake', quantity: 1, price: 8.00 }
        ],
        total: 59.00
    }
];

// Function to create an order card
function createOrderCard(order) {
    const itemsList = order.items.map(item => 
        `<li>${item.quantity}x ${item.name} - $${item.price.toFixed(2)}</li>`
    ).join('');

    return `
        <div class="card mb-4">
            <div class="card-body">
                <div class="row">
                    <div class="col-md-8">
                        <h5 class="card-title">Order #${order.id}</h5>
                        <p class="card-text"><strong>Date:</strong> ${order.date}</p>
                        <p class="card-text"><strong>Status:</strong> <span class="badge bg-success">${order.status}</span></p>
                        <div class="order-items mt-3">
                            <h6>Items:</h6>
                            <ul class="list-unstyled">
                                ${itemsList}
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-4 text-md-end">
                        <h5 class="text-primary">Total: $${order.total.toFixed(2)}</h5>
                        <a href="order-tracking.html?order=${order.id}" class="btn btn-outline-primary mt-3">Track Order</a>
                        <button class="btn btn-outline-secondary mt-2" onclick="reorder('${order.id}')">Reorder</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Function to display orders for the current page
function displayOrders() {
    const orderHistoryContainer = document.querySelector('.order-history');
    const startIndex = (currentPage - 1) * ordersPerPage;
    const endIndex = startIndex + ordersPerPage;
    const ordersToDisplay = orders.slice(startIndex, endIndex);

    let orderCardsHtml = '';
    ordersToDisplay.forEach(order => {
        orderCardsHtml += createOrderCard(order);
    });

    // Add pagination
    const totalPages = Math.ceil(orders.length / ordersPerPage);
    const paginationHtml = createPagination(totalPages);

    orderHistoryContainer.innerHTML = orderCardsHtml + paginationHtml;
    updatePaginationState();
}

// Function to create pagination
function createPagination(totalPages) {
    let paginationHtml = `
        <nav aria-label="Order history pagination" class="mt-4">
            <ul class="pagination justify-content-center">
                <li class="page-item${currentPage === 1 ? ' disabled' : ''}">
                    <a class="page-link" href="#" onclick="changePage(${currentPage - 1}); return false;">Previous</a>
                </li>
    `;

    for (let i = 1; i <= totalPages; i++) {
        paginationHtml += `
            <li class="page-item${currentPage === i ? ' active' : ''}">
                <a class="page-link" href="#" onclick="changePage(${i}); return false;">${i}</a>
            </li>
        `;
    }

    paginationHtml += `
                <li class="page-item${currentPage === totalPages ? ' disabled' : ''}">
                    <a class="page-link" href="#" onclick="changePage(${currentPage + 1}); return false;">Next</a>
                </li>
            </ul>
        </nav>
    `;

    return paginationHtml;
}

// Function to change page
function changePage(newPage) {
    if (newPage >= 1 && newPage <= Math.ceil(orders.length / ordersPerPage)) {
        currentPage = newPage;
        displayOrders();
    }
}

// Function to update pagination state
function updatePaginationState() {
    const prevButton = document.querySelector('.pagination .page-item:first-child');
    const nextButton = document.querySelector('.pagination .page-item:last-child');
    const totalPages = Math.ceil(orders.length / ordersPerPage);

    prevButton.classList.toggle('disabled', currentPage === 1);
    nextButton.classList.toggle('disabled', currentPage === totalPages);
}

// Function to handle reorder
function reorder(orderId) {
    const order = orders.find(o => o.id === orderId);
    if (order) {
        // In a real application, this would add items to cart and redirect to checkout
        alert(`Reordering items from Order #${orderId}`);
        // Redirect to menu or cart page
        window.location.href = 'menu.html';
    }
}

// Initialize the order history display when the page loads
document.addEventListener('DOMContentLoaded', () => {
    displayOrders();
});