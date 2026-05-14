# Online Food Ordering System

A full-stack Online Food Ordering platform built with Spring Boot (backend) and React TypeScript (frontend).

## Tech Stack

### Backend
- Java 21
- Spring Boot 4.0.6
- Spring Data JPA
- Spring Security + JWT
- MySQL 8.0
- Maven
- Lombok

### Frontend
- React 18 (TypeScript)
- React Router
- Axios
- Tailwind CSS
- Context API

## Project Structure
online-food-ordering-system/
├── backend/
│   └── demo/
│       └── src/main/java/com/example/demo/
│           ├── controller/
│           ├── service/
│           ├── repository/
│           ├── entity/
│           ├── security/
│           ├── exception/
│           ├── config/
│           └── dto/
└── frontend/
└── src/
├── api/
├── components/
├── context/
├── pages/
│   ├── auth/
│   ├── food/
│   ├── cart/
│   ├── order/
│   ├── admin/
│   └── user/
├── types/
└── utils/

## Backend Setup

### Prerequisites
- Java 21
- MySQL 8.0
- Maven

### Database Setup
```sql
CREATE DATABASE online_food_db;
```

### Configure Application
Update `backend/demo/src/main/resources/application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/online_food_db
spring.datasource.username=your_username
spring.datasource.password=your_password
app.jwt.secret=your_secret_key
app.jwt.expiration=86400000
server.port=8081
```

### Run Backend
```bash
cd backend/demo
./mvnw spring-boot:run
```
Backend runs on `http://localhost:8081`

## Frontend Setup

### Prerequisites
- Node.js
- npm

### Install and Run
```bash
cd frontend
npm install
npm start
```
Frontend runs on `http://localhost:3000`

## API Endpoints

### Authentication (Public)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/signup | Register new user |
| POST | /api/auth/signin | Login and get JWT token |

### Categories (Public)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/categories | Get all categories |
| GET | /api/categories/{id} | Get category by ID |
| POST | /api/categories | Create category |
| DELETE | /api/categories/{id} | Delete category |

### Food Items (Public)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/foods | Get all food items |
| GET | /api/foods/{id} | Get food item by ID |
| GET | /api/foods/category/{id} | Get foods by category |
| POST | /api/foods | Create food item |
| DELETE | /api/foods/{id} | Delete food item |

### Cart (Requires Authentication)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/cart/{userId} | Get user cart |
| POST | /api/cart/{userId}/add | Add item to cart |
| DELETE | /api/cart/item/{id} | Remove item from cart |

### Orders (Requires Authentication)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/orders | Get all orders |
| GET | /api/orders/user/{userId} | Get orders by user |
| POST | /api/orders | Place new order |
| PUT | /api/orders/{id}/status | Update order status |

### Payments (Requires Authentication)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/payments | Process payment |
| GET | /api/payments/{id} | Get payment by ID |

### Users (Admin Only)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/users | Get all users |
| GET | /api/users/{id} | Get user by ID |
| GET | /api/users/me | Get current user |
| DELETE | /api/users/{id} | Delete user |

## Authentication
This API uses JWT authentication. To access protected endpoints:

1. Register via `/api/auth/signup`
2. Login via `/api/auth/signin` to get your token
3. Add token to request header:

## Features

### Customer
- Browse food menu with category filter
- Add items to cart
- Update cart item quantities
- Place orders and process payments
- View order history
- View user profile

### Admin
- Manage users
- Manage food items
- Manage categories
- Manage and update order statuses

## Entities
- **User** — Roles: ADMIN, CUSTOMER
- **Category** — One-to-Many with Food Item
- **Food Item** — Status: AVAILABLE, OUT_OF_STOCK
- **Cart** — One-to-One with User
- **Cart Item** — Many-to-One with Cart and Food Item
- **Order** — Status: PLACED, PREPARING, DELIVERED, CANCELLED
- **Order Item** — Many-to-One with Order and Food Item
- **Payment** — Status: PENDING, COMPLETED, FAILED