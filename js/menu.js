// Function to render menu items
function renderMenuItems(items, containerId) {
    const container = document.querySelector(containerId + ' .row');
    if (!container) return;

    container.innerHTML = items.map(item => `
        <div class="col-lg-6 mb-4">
            <div class="d-flex align-items-center menu-item p-3 bg-light rounded">
                <img class="flex-shrink-0 img-fluid rounded" src="${item.image}" alt="${item.name}" style="width: 80px;">
                <div class="w-100 d-flex flex-column text-start ps-4">
                    <h5 class="d-flex justify-content-between border-bottom pb-2">
                        <span>${item.name}</span>
                        <span class="text-primary fs-5">${item.price}</span>
                    </h5>
                    <small class="fst-italic">${item.description}</small>
                    <div class="d-flex gap-2 mt-2">
                        <button class="btn btn-primary btn-sm" onclick='cart.addItem(${JSON.stringify(item)})'>Add to Cart</button>
                        <button class="btn btn-success btn-sm" onclick='window.location.href="checkout.html?item=${encodeURIComponent(JSON.stringify(item))}";'>Buy Now</button>
                    </div>
                </div>
            </div>
        </div>
    `).join('');
}

// Initialize menu when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    renderMenuItems(menuData.breakfast, '#tab-1');
    renderMenuItems(menuData.lunch, '#tab-2');
    renderMenuItems(menuData.dinner, '#tab-3');

    // Add tab change listeners
    document.querySelectorAll('[data-bs-toggle="pill"]').forEach(tab => {
        tab.addEventListener('shown.bs.tab', (e) => {
            const targetId = e.target.getAttribute('href');
            const category = targetId === '#tab-1' ? 'breakfast' : 
                           targetId === '#tab-2' ? 'lunch' : 
                           targetId === '#tab-3' ? 'dinner' :
                           targetId === '#tab-4' ? 'coffee' : 'drinks';
            renderMenuItems(menuData[category], targetId);
        });
    });

    // Initialize coffee and drinks tabs
    renderMenuItems(menuData.coffee, '#tab-4');
    renderMenuItems(menuData.drinks, '#tab-5');
});

// Menu data for different categories
const menuData = {
    coffee: [
        {
            name: "Espresso",
            price: "$3.99",
            description: "Rich and bold single shot of espresso",
            image: "https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=300&h=300&fit=crop"
        },
        {
            name: "Cappuccino",
            price: "$4.99",
            description: "Espresso topped with foamy milk and cocoa powder",
            image: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=300&h=300&fit=crop"
        },
        {
            name: "Caramel Macchiato",
            price: "$5.49",
            description: "Espresso with steamed milk and vanilla, topped with caramel",
            image: "https://images.unsplash.com/photo-1485808191679-5f86510681a2?w=300&h=300&fit=crop"
        },
        {
            name: "Cold Brew",
            price: "$4.49",
            description: "Smooth, slow-steeped cold coffee served over ice",
            image: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?w=300&h=300&fit=crop"
        }
    ],
    drinks: [
        {
            name: "Fresh Fruit Smoothie",
            price: "$6.99",
            description: "Blend of seasonal fruits with yogurt and honey",
            image: "https://images.unsplash.com/photo-1505252585461-04db1eb84625?w=300&h=300&fit=crop"
        },
        {
            name: "Iced Green Tea Latte",
            price: "$4.99",
            description: "Premium matcha green tea with milk over ice",
            image: "https://images.unsplash.com/photo-1515823662972-da6a2e4d3002?w=300&h=300&fit=crop"
        },
        {
            name: "Tropical Paradise",
            price: "$7.99",
            description: "Coconut water, pineapple, and mango blend",
            image: "https://images.unsplash.com/photo-1546171753-97d7676e4602?w=300&h=300&fit=crop"
        },
        {
            name: "Berry Blast",
            price: "$6.99",
            description: "Mixed berries smoothie with almond milk",
            image: "https://images.unsplash.com/photo-1508253730651-e5ace80a7025?w=300&h=300&fit=crop"
        }
    ],
    breakfast: [
        {
            name: "Classic American Breakfast",
            price: "$15.99",
            description: "Two eggs any style, crispy bacon, hash browns, and toast",
            image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=300&h=300&fit=crop"
        },
        {
            name: "Healthy Morning Bowl",
            price: "$13.99",
            description: "Steel-cut oatmeal, chia seeds, fresh fruits, and honey",
            image: "https://images.unsplash.com/photo-1495214783159-3503fd1b572d?w=300&h=300&fit=crop"
        },
        {
            name: "Eggs Royale",
            price: "$16.99",
            description: "Poached eggs with smoked salmon on English muffin with hollandaise",
            image: "https://images.unsplash.com/photo-1608039829572-78524f79c4c7?w=300&h=300&fit=crop"
        },
        {
            name: "Breakfast Pizza",
            price: "$14.99",
            description: "Thin crust pizza with eggs, bacon, cheese, and fresh herbs",
            image: "https://images.unsplash.com/photo-1513442542250-854d436a73f2?w=300&h=300&fit=crop"
        },
        {
            name: "Protein Pancake Stack",
            price: "$13.99",
            description: "Protein-rich pancakes with mixed berries and maple syrup",
            image: "https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=300&h=300&fit=crop"
        }
    ],
    lunch: [
        {
            name: "Grilled Chicken Caesar",
            price: "$16.99",
            description: "Grilled chicken breast, romaine, parmesan, house-made dressing",
            image: "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=300&h=300&fit=crop"
        },
        {
            name: "Artisan Burger",
            price: "$18.99",
            description: "Angus beef, caramelized onions, aged cheddar, brioche bun",
            image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300&h=300&fit=crop"
        },
        {
            name: "Seafood Linguine",
            price: "$19.99",
            description: "Fresh pasta with mixed seafood in white wine sauce",
            image: "https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=300&h=300&fit=crop"
        },
        {
            name: "Asian Fusion Bowl",
            price: "$17.99",
            description: "Teriyaki chicken, quinoa, roasted vegetables, sesame dressing",
            image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=300&h=300&fit=crop"
        },
        {
            name: "Mediterranean Plate",
            price: "$15.99",
            description: "Falafel, hummus, tabbouleh, pita bread, and tzatziki",
            image: "https://images.unsplash.com/photo-1542528180-a1208c5169a5?w=300&h=300&fit=crop"
        }
    ],
    dinner: [
        {
            name: "Prime Ribeye Steak",
            price: "$36.99",
            description: "12oz ribeye with roasted garlic butter and seasonal vegetables",
            image: "https://images.unsplash.com/photo-1546964124-0cce460f38ef?w=300&h=300&fit=crop"
        },
        {
            name: "Pan-Seared Salmon",
            price: "$28.99",
            description: "Atlantic salmon with quinoa risotto and lemon butter sauce",
            image: "https://images.unsplash.com/photo-1485921325833-c519f76c4927?w=300&h=300&fit=crop"
        },
        {
            name: "Braised Short Ribs",
            price: "$32.99",
            description: "Slow-cooked short ribs with mashed potatoes and glazed carrots",
            image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=300&fit=crop"
        },
        {
            name: "Vegetable Wellington",
            price: "$24.99",
            description: "Roasted vegetables in puff pastry with mushroom sauce",
            image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=300&h=300&fit=crop"
        },
        {
            name: "Seafood Paella",
            price: "$34.99",
            description: "Spanish rice with mixed seafood, chorizo, and saffron",
            image: "https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=300&h=300&fit=crop"
        }
    ]
};