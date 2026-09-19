# Nexora — Modern Tech E-Commerce Platform

> A full-stack technology e-commerce platform built with React, Node.js, Express, MongoDB, and Stripe.

**Live Demo:** https://nexora-xhfc.onrender.com/

Nexora is a full-stack e-commerce platform focused on technology products and accessories. It includes product discovery, authentication, cart management, coupons, Stripe checkout, recommendations, and an admin dashboard with analytics.

The project was redesigned from a fashion-store concept into a dedicated technology marketplace with a clean **Midnight Tech** interface.

## Features

* Technology-focused product storefront
* Six product categories: Audio, Gaming, Entertainment, Mobile Accessories, Smart Tech, and Cameras & Creator
* Shopping cart and quantity management
* Coupon system
* Stripe Checkout
* Authentication and protected routes
* Featured products
* Product recommendations
* Cloudinary image uploads
* Redis caching
* Admin dashboard with product and analytics management
* Sales and revenue visualization
* Responsive dark-themed UI

## Tech Stack

### Frontend

* React + Vite
* Tailwind CSS
* Zustand
* Framer Motion
* React Router
* Recharts

### Backend

* Node.js
* Express.js
* MongoDB + Mongoose
* Redis
* Cloudinary
* Stripe
* JWT Authentication

### Deployment

* Render
* MongoDB Atlas
* Cloudinary
* Stripe

## Architecture

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

## Run Locally

```bash
git clone https://github.com/khadijaikram-3/Nexora.git
cd Nexora
```

Install dependencies in both `frontend` and `backend`, configure the required environment variables, and start the development servers.

## Author

**Khadija Ikram**

Computer Science Student • Developer • Cybersecurity Enthusiast

GitHub:
https://github.com/khadijaikram-3/Nexora
