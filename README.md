# Nexora — Modern Tech E-Commerce Platform

> A full-stack technology e-commerce platform built with React, Node.js, Express, MongoDB, and Stripe.

 **Live Demo:** https://nexora-xhfc.onrender.com/

Nexora is a modern full-stack e-commerce platform designed around technology products and accessories. It provides a complete shopping experience with authentication, product discovery, cart management, coupons, Stripe checkout, recommendations, and an admin dashboard with analytics.

The project was originally built around a fashion-store concept and was redesigned into a dedicated technology marketplace with a clean **Midnight Tech** visual system.

---

##  Features

###  Customer Experience

* Modern responsive technology storefront
* Browse products by category
* Featured products carousel
* Product cards with interactive hover states
* Add products to cart
* Update product quantities
* Remove products from cart
* Product recommendations
* Coupon application and removal
* Responsive shopping cart
* User authentication
* Protected customer actions

###  Payments

* Stripe Checkout integration
* Secure checkout flow
* Successful payment confirmation
* Cancelled checkout handling
* Coupon-aware checkout
* Cart clearing after successful purchase

###  Authentication & Authorization

* User registration
* User login
* Protected routes
* Admin-only functionality
* Authentication state management

###  Admin Dashboard

* Create products
* Upload product images
* Cloudinary image storage
* Product inventory management
* Delete products
* Toggle featured products
* Product category management
* Sales analytics
* Revenue tracking
* Daily sales visualization

###  Performance & Infrastructure

* Redis caching for featured products
* MongoDB database
* Cloudinary image storage
* REST API architecture
* Responsive frontend
* Optimized product fetching

---

##  Technology Categories

Nexora organizes products into six technology-focused categories:

* 🔊 Audio
* 🎮 Gaming
* 📺 Entertainment
* 📱 Mobile Accessories
* ⌚ Smart Tech
* 📷 Cameras & Creator

---

## 🛠️ Tech Stack

### Frontend

* React
* Vite
* Tailwind CSS
* Zustand
* Framer Motion
* React Router
* Axios
* Recharts
* Lucide React
* React Hot Toast

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* Redis
* Cloudinary
* Stripe
* JWT Authentication

### Deployment

* Render
* MongoDB Atlas
* Cloudinary
* Stripe

---

##  Design System

Nexora uses a **Midnight Tech** visual direction focused on clarity, product imagery, and restrained interaction design.

| Purpose              | Color     |
| -------------------- | --------- |
| Main Background      | `#080B12` |
| Secondary Background | `#0D111A` |
| Card / Surface       | `#121824` |
| Primary Text         | `#F5F7FA` |
| Secondary Text       | `#9AA4B2` |
| Primary Accent       | `#38BDF8` |
| Accent Hover         | `#0EA5E9` |
| Border               | `#1E293B` |
| Success              | `#22C55E` |
| Warning              | `#F59E0B` |
| Error                | `#EF4444` |

The interface intentionally avoids excessive neon effects and distracting animations so that the products remain the focus.

---

##  Architecture

```text
Nexora
│
├── frontend
│   ├── components
│   ├── pages
│   ├── stores
│   ├── lib
│   └── App.jsx
│
├── backend
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   ├── lib
│   └── server.js
│
└── README.md
```

### Request Flow

```text
React Frontend
      │
      ▼
Axios API Client
      │
      ▼
Express REST API
      │
      ├──────────────► MongoDB
      │
      ├──────────────► Redis
      │
      ├──────────────► Cloudinary
      │
      └──────────────► Stripe
```

---

##  Core Shopping Flow

```text
Browse Products
       ↓
Explore Category
       ↓
Add to Cart
       ↓
Apply Coupon
       ↓
Review Order
       ↓
Stripe Checkout
       ↓
Payment Confirmation
       ↓
Order Completed
```

---

##  Admin Analytics

The admin dashboard provides an overview of:

* Total users
* Total products
* Total sales
* Total revenue
* Daily sales
* Daily revenue

The analytics section uses **Recharts** to visualize sales and revenue trends.

---

##  Security Considerations

Nexora includes several security-oriented practices:

* Protected admin routes
* Authentication middleware
* Server-side authorization
* Environment variables for sensitive configuration
* Stripe handled through the backend
* Database access through Mongoose
* No payment credentials stored directly in the application

> Production deployments should use strong secrets, restricted database permissions, secure environment variables, and appropriate production CORS configuration.

---

##  Running Locally

### 1. Clone the repository

```bash
git clone https://github.com/khadijaikram-3/Nexora.git
cd Nexora
```

### 2. Install dependencies

Install frontend dependencies:

```bash
cd frontend
npm install
```

Install backend dependencies:

```bash
cd ../backend
npm install
```

### 3. Configure environment variables

Create the required `.env` files for the backend and frontend.

Typical backend configuration includes:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
REDIS_URL=your_redis_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
STRIPE_SECRET_KEY=your_stripe_secret
JWT_SECRET=your_jwt_secret
```

Use your project's actual environment variable names when configuring the application.

### 4. Start the backend

```bash
npm run dev
```

### 5. Start the frontend

From the frontend directory:

```bash
npm run dev
```

The application will then be available through the Vite development server.

---

##  Main Application Areas

| Area       | Purpose                                 |
| ---------- | --------------------------------------- |
| Home       | Product discovery and featured products |
| Categories | Browse products by technology category  |
| Cart       | Manage selected products                |
| Checkout   | Stripe payment flow                     |
| Login      | User authentication                     |
| Signup     | Account creation                        |
| Admin      | Product and store management            |
| Analytics  | Sales and revenue insights              |

---

##  Live Application

**Nexora:**
https://nexora-xhfc.onrender.com/

---

##  Project Goals

Nexora was built to demonstrate how a modern full-stack e-commerce application can combine:

* Responsive UI design
* RESTful backend architecture
* Database-driven products
* Authentication and authorization
* Cloud image storage
* Payment processing
* Caching
* Recommendation systems
* Administrative analytics

The goal was not only to build a storefront, but to create a complete application covering the major components of a real-world e-commerce system.

---

##  Future Improvements

Potential future improvements include:

* Product search
* Advanced filtering and sorting
* Product detail pages
* Reviews and ratings
* Order history
* Wishlist functionality
* Improved inventory tracking
* Email order notifications
* More detailed admin analytics
* Automated product import
* Pagination for large product catalogs

---

##  Author

**Khadija Ikram**

Computer Science Student • Developer • Cybersecurity Enthusiast

GitHub:
https://github.com/khadijaikram-3

---

##  Support

If you found Nexora interesting, consider giving the repository a ⭐ on GitHub.
