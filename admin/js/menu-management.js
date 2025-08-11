// Initialize menu management page
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    checkAuth();

    // Initialize the menu data service
    window.menuDataService = new MenuDataService();

    // Load menu items for each category
    loadMenuItems();

    // Setup form submission handler
    setupFormHandler();
});

// Load menu items
function loadMenuItems() {
    const menuData = window.menuDataService.menuData;
    const tabContent = document.getElementById('menuTabContent');
    if (!tabContent) return;
    
    tabContent.innerHTML = ''; // Clear existing content
    
    // Generate content for each category
    Object.keys(menuData).forEach(category => {
        const items = menuData[category] || [];
        const categoryId = category.toLowerCase();
        
        const categoryContent = `
            <div class="tab-pane fade ${categoryId === 'breakfast' ? 'show active' : ''}" id="${categoryId}">
                <div class="row g-4">
                    ${items.map(item => createMenuItemCard(item, category)).join('')}
                </div>
            </div>
        `;
        
        tabContent.innerHTML += categoryContent;
    });
}

// Create menu item card
function createMenuItemCard(item, category) {
    return `
        <div class="col-lg-4 col-md-6">
            <div class="menu-item-card">
                <img src="../${item.image}" class="menu-item-image" alt="${item.name}">
                <div class="p-3">
                    <div class="d-flex justify-content-between mb-2">
                        <h5 class="mb-0">${item.name}</h5>
                        <h5 class="text-primary mb-0">${item.price}</h5>
                    </div>
                    <p class="text-muted small mb-3">${item.description}</p>
                    <div class="d-flex gap-2">
                        <button class="btn btn-sm btn-primary" onclick='editMenuItem(${JSON.stringify({ ...item, category })});'>
                            <i class="bi bi-pencil"></i> Edit
                        </button>
                        <button class="btn btn-sm btn-danger" onclick='deleteMenuItem(${JSON.stringify({ ...item, category })});'>
                            <i class="bi bi-trash"></i> Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// Setup form submission handler
function setupFormHandler() {
    const form = document.getElementById('menuItemForm');
    if (!form) return;

    form.addEventListener('submit', function(e) {
        e.preventDefault();
        saveMenuItem();
    });
}

// Save menu item
function saveMenuItem() {
    const form = document.getElementById('menuItemForm');
    if (!form || !form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const formData = {
        name: document.getElementById('itemName').value,
        price: document.getElementById('itemPrice').value,
        description: document.getElementById('itemDescription').value,
        image: document.getElementById('itemImage').value.replace('../', ''),  // Remove '../' if present
        category: document.getElementById('itemCategory').value
    };

    const editingItem = form.getAttribute('data-editing-item');
    
    try {
        if (editingItem) {
            // Update existing item
            const oldItem = JSON.parse(editingItem);
            const category = oldItem.category;
            
            if (window.menuDataService.updateMenuItem(category, oldItem, formData)) {
                showAlert('Item updated successfully!', 'success');
            } else {
                showAlert('Failed to update item!', 'danger');
            }
            form.removeAttribute('data-editing-item');
        } else {
            // Add new item
            const category = formData.category;
            window.menuDataService.addMenuItem(category, formData);
            showAlert('Item added successfully!', 'success');
        }

        // Reset form and reload menu items
        form.reset();
        loadMenuItems();
        $('#addItemModal').modal('hide');
    } catch (error) {
        showAlert('An error occurred while saving the item: ' + error.message, 'danger');
    }
}

// Edit menu item
function editMenuItem(item) {
    const form = document.getElementById('menuItemForm');
    if (!form) return;

    document.getElementById('itemName').value = item.name;
    document.getElementById('itemPrice').value = item.price;
    document.getElementById('itemDescription').value = item.description;
    document.getElementById('itemImage').value = item.image;
    document.getElementById('itemCategory').value = item.category;

    form.setAttribute('data-editing-item', JSON.stringify(item));
    $('#addItemModal').modal('show');
}

// Delete menu item
function deleteMenuItem(item) {
    if (!confirm('Are you sure you want to delete this item?')) return;

    try {
        const category = item.category;
        if (window.menuDataService.deleteMenuItem(category, item)) {
            showAlert('Item deleted successfully!', 'success');
            loadMenuItems();
        } else {
            showAlert('Failed to delete item!', 'danger');
        }
    } catch (error) {
        showAlert('An error occurred while deleting the item: ' + error.message, 'danger');
    }
}

// Show alert message
function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const container = document.querySelector('.container-fluid');
    container.insertBefore(alertDiv, container.firstChild);

    setTimeout(() => alertDiv.remove(), 3000);
}