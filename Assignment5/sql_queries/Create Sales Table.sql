CREATE TABLE sales (
	saleID INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    productID INT,
    quantitySold INT NOT NULL,
    saleDate DATE NOT NULL,
    FOREIGN KEY (productID) REFERENCES products(productID)
);