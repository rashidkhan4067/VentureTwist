// Menu data service for handling menu operations
class MenuDataService {
    constructor() {
        this.menuData = this.loadMenuData();
    }

    // Load menu data from localStorage or use default data
    loadMenuData() {
        const savedData = localStorage.getItem('menuData');
        if (savedData) {
            return JSON.parse(savedData);
        }
        
        // Default menu data
        return {
            breakfast: [
                {
                    name: "Classic American Breakfast",
                    price: "$15.99",
                    description: "Two eggs any style, crispy bacon, hash browns, and toast",
                    image: "img/menu-1.jpg"
                }
            ],
            lunch: [
                {
                    name: "Grilled Chicken Caesar",
                    price: "$16.99",
                    description: "Grilled chicken breast, romaine, parmesan, house-made dressing",
                    image: "img/menu-2.jpg"
                }
            ],
            dinner: [
                {
                    name: "Prime Ribeye Steak",
                    price: "$36.99",
                    description: "12oz ribeye with roasted garlic butter and seasonal vegetables",
                    image: "img/menu-3.jpg"
                }
            ],
            coffee: [
                {
                    name: "Espresso",
                    price: "$3.99",
                    description: "Rich and bold single shot of espresso",
                    image: "img/menu-4.jpg"
                }
            ],
            drinks: [
                {
                    name: "Fresh Fruit Smoothie",
                    price: "$6.99",
                    description: "Blend of seasonal fruits with yogurt and honey",
                    image: "img/menu-5.jpg"
                }
            ]
        };
    }

    // Save menu data to localStorage
    saveMenuData() {
        localStorage.setItem('menuData', JSON.stringify(this.menuData));
    }

    // Get all menu items for a category
    getMenuItems(category) {
        return this.menuData[category] || [];
    }

    // Add a new menu item
    addMenuItem(category, item) {
        if (!this.menuData[category]) {
            this.menuData[category] = [];
        }
        this.menuData[category].push(item);
        this.saveMenuData();
        return item;
    }

    // Update an existing menu item
    updateMenuItem(category, oldItem, newItem) {
        const items = this.menuData[category];
        const index = items.findIndex(item => 
            item.name === oldItem.name && 
            item.price === oldItem.price && 
            item.description === oldItem.description
        );
        
        if (index !== -1) {
            items[index] = newItem;
            this.saveMenuData();
            return true;
        }
        return false;
    }

    // Delete a menu item
    deleteMenuItem(category, item) {
        const items = this.menuData[category];
        const index = items.findIndex(i => 
            i.name === item.name && 
            i.price === item.price && 
            i.description === item.description
        );
        
        if (index !== -1) {
            items.splice(index, 1);
            this.saveMenuData();
            return true;
        }
        return false;
    }
}

// Create a global instance of the menu data service
const menuDataService = new MenuDataService();