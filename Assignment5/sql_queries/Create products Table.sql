CREATE TABLE products (
	productID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    productName TEXT,
    price DECIMAL NOT NULL,
    stockQuantity INT NOT NULL,
    supplierID INT ,
    FOREIGN KEY (supplierID) REFERENCES suppliers(supplierID)
);