**Mini Project E-commerce Backend**
Simple e-commerce API for Products, Cart, and Orders using Node.js, Express, MongoDB.

**Base URL**
http://localhost:3000/api/v1

**Endpoints**

**products**

GET /products → Get all products

GET /products/:id → Get product by ID

POST /products → Add a product

PUT /products/:id → Update a product

DELETE /products/:id → Delete a product

**Cart**

GET /cart → Get all cart items

GET /cart/:id → Get cart item by ID

POST /cart → Add item to cart

PUT /cart → Update cart item quantity

DELETE /cart/:productId → Remove item from cart

**Orders**

POST /orders → Create order from cart

GET /orders → Get all orders

GET /orders/:id → Get order by ID

***setup***

1,install dependencies
`npm install

2, create .env
MONGO_URL=<your_mongodb_connection_string>
API_URL=/api/v1
PORT=3000

3,start server
`node app.js

4 test using post man



