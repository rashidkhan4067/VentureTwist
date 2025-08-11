# VentureTwist Restaurant Website

Welcome to VentureTwist, a modern restaurant website built with HTML, CSS, and JavaScript. This project provides a complete online dining experience with features like menu browsing, online ordering, table booking, and order tracking.

## Table of Contents
- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Key Functionalities](#key-functionalities)
- [Admin Panel](#admin-panel)
- [Technologies Used](#technologies-used)
- [License](#license)

## Features

- **Responsive Design**: Works on all device sizes
- **Online Ordering**: Add items to cart and place orders
- **Menu Management**: Browse food items by category
- **Table Booking**: Reserve tables online
- **Order Tracking**: Track the status of your orders
- **Admin Panel**: Manage menu items and view orders
- **Order History**: View past orders
- **Payment Processing**: Secure checkout process

## Project Structure

```
VentureTwist/
├── admin/
│   ├── dashboard.html
│   ├── login.html
│   ├── menu-management.html
│   └── js/
│       ├── auth.js
│       ├── dashboard.js
│       ├── menu-data-service.js
│       └── menu-management.js
├── css/
│   ├── bootstrap.min.css
│   └── style.css
├── img/
├── js/
│   ├── cart.js
│   ├── main.js
│   ├── menu.js
│   ├── order-data.js
│   ├── order-history.js
│   ├── order-tracking.js
├── lib/
├── scss/
├── about.html
├── booking.html
├── checkout.html
├── contact.html
├── index.html
├── menu.html
├── order-history.html
├── order-tracking.html
├── payment.html
├── receipt.html
├── service.html
├── team.html
└── testimonial.html
```

## Getting Started

1. Clone or download the repository
2. Open `index.html` in your web browser
3. To access the admin panel, navigate to `admin/login.html`
4. Use the default credentials to log in:
   - Username: admin
   - Password: admin123

## Key Functionalities

### Frontend Features

- **Home Page**: Showcases the restaurant with hero section, services, menu highlights, and testimonials
- **Menu Page**: Browse food items organized by categories (Breakfast, Lunch, Dinner)
- **Online Ordering**: Add items to cart with real-time updates
- **Shopping Cart**: View and manage items in the cart
- **Checkout Process**: Enter delivery information and select payment method
- **Order Tracking**: Track order status with progress indicators
- **Order History**: View past orders with details
- **Table Booking**: Reserve tables with date, time, and party size
- **Team Page**: Meet the restaurant staff
- **Testimonials**: Customer reviews and feedback

### Cart System

The cart functionality is implemented with JavaScript and uses localStorage for persistence:
- Add/remove items from cart
- Update item quantities
- Calculate subtotal, tax, and total
- Save cart data between sessions

### Order Management

- Complete purchase flow from cart to receipt
- Order confirmation with unique order ID
- Order history tracking
- Order status tracking

## Admin Panel

The admin panel provides a comprehensive management system:

### Dashboard
- Overview of total orders, revenue, bookings, and menu items
- Recent orders display

### Menu Management
- Add new menu items
- Edit existing items
- Delete items
- Organize items by categories (Breakfast, Lunch, Dinner, Coffee, Drinks)
- Data persistence using localStorage

### Authentication
- Login/logout functionality
- Session management

## Technologies Used

- **HTML5**: Structure and content
- **CSS3**: Styling and responsive design
- **JavaScript**: Interactivity and functionality
- **Bootstrap 5**: Frontend framework for responsive design
- **jQuery**: DOM manipulation and AJAX
- **LocalStorage**: Client-side data storage
- **Owl Carousel**: Testimonial slider
- **Animate.css**: Page animations
- **Font Awesome**: Icons
- **Google Fonts**: Typography

## License

This project is created and developed by You. All Rights Reserved.

---

For any issues or questions, please contact us at venturetwist@gmail.com
