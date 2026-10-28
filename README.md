# CampusKart - E-commerce Website (College Project)

A simple, minimal e-commerce website built with **React + Spring Boot + MySQL**.

Scope (intentionally kept small):
- No real authentication / login
- No payment gateway integration
- No admin panel - all pages are for the shopper

## Pages

| Page | Route | What it does |
|---|---|---|
| Home | `/` | Hero banner, category tiles, featured products |
| Shop | `/shop` | All products with search box + category filter |
| Product Detail | `/product/:id` | Product info, stock, quantity picker, add to cart |
| Cart | `/cart` | Change quantities, remove items, see totals |
| Checkout | `/checkout` | Shipping form + order summary, places the order |
| Order Success | `/order-success` | Confirmation page with the order number |
| Track Order | `/track` | Enter an order number and see its status timeline |

## Tech Stack

- **Frontend:** React 18, React Router 6, Vite (in `frontend/`)
- **Backend:** Spring Boot 3.3 (Web + JPA), Java 17 (in `backend/`)
- **Database:** MySQL (4 tables: `categories`, `products`, `orders`, `order_items`)

## Setup

### 1. MySQL

1. Install MySQL and make sure it is running on `localhost:3306`.
2. The connection URL in `backend/src/main/resources/application.properties` uses
   `createDatabaseIfNotExist=true`, so the `ecommerce_db` database is created
   automatically on first run. If you prefer to create it yourself:

   ```sql
   CREATE DATABASE ecommerce_db;
   ```

3. Update `spring.datasource.username` / `spring.datasource.password` in
   `backend/src/main/resources/application.properties` if yours are different
   (defaults are `root` / `root`).

### 2. Backend (port 8080)

Requires Java 17+ and Maven (or open the project in IntelliJ IDEA / Eclipse and run
`EcommerceApplication` from there).

```bash
cd backend
mvn spring-boot:run
```

On the first start the tables are created automatically and demo data
(5 categories, 17 products) is seeded.

### 3. Frontend (port 5173)

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:5173 and start shopping.
(The Vite dev server proxies `/api/*` requests to the backend on port 8080.)

### 4. Running from VS Code (alternative)

1. Open the `E-commerce` folder in VS Code (File > Open Folder).
2. Install the recommended extensions when prompted (or manually:
   **Extension Pack for Java** and **Spring Boot Extension Pack**).
   Restart VS Code completely after installing so it picks up the updated PATH.
3. Wait until the Java extension finishes importing the backend project
   (status shows "Java: Ready").
4. Backend: open
   `backend/src/main/java/com/example/ecommerce/EcommerceApplication.java`
   and click **Run** (or **Debug**) just above the `main` method.
   - Terminal alternative: `cd backend` then `mvn spring-boot:run`.
5. Frontend: open a new terminal (Ctrl+Shift+`) and run
   `cd frontend` then `npm run dev`.
6. Open http://localhost:5173.

## How the order flow works

- The cart is stored in the browser (localStorage), so no login is needed.
- Placing an order saves it to MySQL with a unique order number like
  `ORD-LTZ4KQ-4821`, and reduces the stock of the purchased products.
  The total is always recalculated on the server from real product prices.
- Since there is no admin panel, order status is **simulated over time**:
  `PLACED` -> (after 1 min) `PROCESSING` -> (after 3 min) `SHIPPED`
  -> (after 6 min) `DELIVERED`. Place an order, then open the Track Order
  page and refresh a minute later to see it move through the timeline.
- Product images are hotlinked from the DummyJSON demo CDN and Open Library
  (book covers), so no image assets need to be stored in the project.

## REST API

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products?category={id}&search={text}` | List products (both filters optional) |
| GET | `/api/products/{id}` | Single product details |
| GET | `/api/categories` | All categories |
| POST | `/api/orders` | Place an order (body: shipping details + `items: [{productId, quantity}]`) |
| GET | `/api/orders/{orderNumber}` | Track an order |

## Project Structure

```
E-commerce/
├── backend/                  Spring Boot REST API
│   └── src/main/java/com/example/ecommerce/
│       ├── bootstrap/        demo data seeder
│       ├── config/           CORS config
│       ├── controller/       REST controllers
│       ├── dto/              request records
│       ├── model/            JPA entities
│       ├── repository/       Spring Data repositories
│       ├── service/          order logic
│       └── EcommerceApplication.java
└── frontend/                 React SPA (Vite)
    └── src/
        ├── components/       Navbar, ProductCard
        ├── context/          cart state (localStorage)
        ├── pages/            Home, Shop, ProductDetail, Cart, Checkout, OrderSuccess, TrackOrder
        ├── api.js            fetch wrapper
        ├── App.jsx           routes
        └── index.css         all styling
```
