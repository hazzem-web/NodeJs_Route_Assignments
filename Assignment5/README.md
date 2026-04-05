# 🛒 Products & Suppliers API

A RESTful API built with **Node.js**, **Express**, and **raw MySQL queries** via `mysql2` — no ORM. Covers DDL operations (ALTER TABLE), DML operations (INSERT, UPDATE, DELETE), JOIN queries, permission management, and a custom ORM mapping design included as reference.

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Runtime | Node.js (CommonJS) |
| Framework | Express.js |
| Database | MySQL |
| Driver | mysql2 |
| Query Style | Raw SQL (no ORM) |

---

## 📁 Project Structure

```
Assignment5/
├── ORM Mapping (Part2)/
│   └── ORM_Mapping.jpg         # ORM mapping diagram (User → Product)
├── database/
│   └── connection.js           # mysql2 connection setup
├── modules/
│   ├── products/
│   │   ├── product.controller.js
│   │   └── product.service.js
│   ├── sales/
│   │   ├── sale.controller.js
│   │   └── sale.service.js
│   └── suppliers/
│       ├── supplier.controller.js
│       └── supplier.service.js
├── sql_queries/
│   ├── Create Products Table.sql
│   ├── Create Sales Table.sql
│   ├── Create Supplier Table.sql
│   └── Create Permission Table.sql
├── index.js                    # Entry point + Express app setup
├── package.json
└── package-lock.json
```

---

## ⚙️ Database Configuration

Update `database/connection.js` with your MySQL credentials:

```js
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "your_password",
    database: "assignment5"
});
```

---

## 🛠️ Installation & Setup

```bash
# 1. Clone the repo
git clone https://github.com/your-username/products-suppliers-api.git
cd products-suppliers-api/Assignment5

# 2. Install dependencies
npm install

# 3. Create the database and tables
# Run the SQL files in /sql_queries in this order:
# 1. Create Supplier Table.sql
# 2. Create Products Table.sql
# 3. Create Sales Table.sql
# 4. Create Permission Table.sql

# 4. Update database/connection.js with your credentials

# 5. Start the server
node index.js
```

Server runs on **http://localhost:3000**

---

## 📌 API Endpoints

### 📦 Products — `/products`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/add-column-category` | Add `category` column to products table (DDL) |
| DELETE | `/delete-column-category` | Drop `category` column from products table (DDL) |
| PATCH | `/add-constraint` | Add `NOT NULL` constraint to `productName` (DDL) |
| POST | `/add-product` | Insert a new product |
| PATCH | `/update-product/:id` | Update product price by ID |
| DELETE | `/delete-product/:id` | Delete a product by ID |
| GET | `/get-highest-stock` | Get the product with the highest stock quantity |
| GET | `/get-not-sold-products` | Get products that have never been sold (LEFT JOIN) |

**POST `/add-product` — Request Body:**
```json
{
  "productName": "Laptop",
  "price": 1500,
  "stockQuantity": 50,
  "supplierID": 1
}
```

**GET `/get-not-sold-products`** — Uses `LEFT JOIN` between `products` and `sales`, returns products where `saleID IS NULL`.

---

### 🏭 Suppliers — `/suppliers`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/add-supplier` | Insert a new supplier |
| PATCH | `/change-contactnumber-to-varchar` | Change `contactNumber` column type to `VARCHAR(15)` (DDL) |
| GET | `/get-suppliers-start-f` | Get suppliers whose name starts with `F` (LIKE) |
| POST | `/set-Permission` | Grant SELECT, INSERT, UPDATE to `store_manager` supplier |
| PATCH | `/revoke-update` | Revoke UPDATE permission from supplier ID 15 |
| PATCH | `/grant-delete` | Grant DELETE permission to supplier ID 15 |

**POST `/add-supplier` — Request Body:**
```json
{
  "supplierName": "FastSupply Co.",
  "contactNumber": "01012345678"
}
```

---

### 💰 Sales — `/sales`

| Method | Endpoint | Description |
|---|---|---|
| POST | `/add-sale` | Insert a new sale record |
| GET | `/get-quantity-sold` | Get products with quantity sold (INNER JOIN) |
| GET | `/get-all-sales` | Get all sales with product names (INNER JOIN) |

**POST `/add-sale` — Request Body:**
```json
{
  "productID": 1,
  "quantitySold": 5,
  "saleDate": "2024-01-15"
}
```

---

## 🗄️ Database Schema

### products
```sql
CREATE TABLE products (
    productID     INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    productName   TEXT,
    price         DECIMAL NOT NULL,
    stockQuantity INT NOT NULL,
    supplierID    INT,
    FOREIGN KEY (supplierID) REFERENCES suppliers(supplierID)
);
```

### suppliers
```sql
CREATE TABLE suppliers (
    supplierID    INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    supplierName  TEXT NOT NULL,
    contactNumber TEXT NOT NULL
);
```

### sales
```sql
CREATE TABLE sales (
    saleID       INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    productID    INT,
    quantitySold INT NOT NULL,
    saleDate     DATE NOT NULL,
    FOREIGN KEY (productID) REFERENCES products(productID)
);
```

### premission
```sql
CREATE TABLE Premission (
    premissionID INT AUTO_INCREMENT PRIMARY KEY,
    supplierID   INT,
    FOREIGN KEY (supplierID) REFERENCES suppliers(supplierID),
    canSelect    BOOLEAN DEFAULT 0,
    canInsert    BOOLEAN DEFAULT 0,
    canUpdate    BOOLEAN DEFAULT 0,
    canDelete    BOOLEAN DEFAULT 0
);
```

---

## 🔗 Table Relationships

```
suppliers ──< products ──< sales
suppliers ──< premission
```

---

## 🗺️ ORM Mapping Diagram

The `ORM Mapping (Part2)/ORM_Mapping.jpg` file contains a conceptual ORM design showing:

- **User** entity with fields: `id`, `userName`, `Email`, `Role`, `Password`
- **User** has separate sub-tables for: `PhoneNumber` and `Name (FirstName, LastName)`
- **Product** entity with fields: `id`, `Price`, `Name`, `Stock`, `isDeleted`, `userID`
- **User → Product** relationship: One User **OWN**s many Products (1-to-N)

---

## 🎯 Core Features

- ✅ **Raw MySQL queries** via `mysql2` — no ORM abstraction
- ✅ **DDL operations** — `ALTER TABLE` to add/drop columns and change constraints at runtime
- ✅ **DML operations** — INSERT, UPDATE, DELETE with `affectedRows` checks
- ✅ **INNER JOIN** — sales joined with products for reporting
- ✅ **LEFT JOIN** — find products that have never appeared in sales
- ✅ **LIKE query** — filter suppliers by name pattern (`F%`)
- ✅ **Permission management** — custom `premission` table with boolean flags per supplier
- ✅ **ORM Mapping diagram** — conceptual design for next phase
- ✅ SQL schema files included for easy DB setup
