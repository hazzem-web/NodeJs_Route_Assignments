CREATE TABLE Premission(
	premissionID INT AUTO_INCREMENT PRIMARY KEY,
    supplierID INT ,
    FOREIGN KEY (supplierID) REFERENCES suppliers(supplierID),
    canSelect BOOLEAN DEFAULT 0,
    canInsert BOOLEAN DEFAULT 0,
    canUpdate BOOLEAN DEFAULT 0,
    canDelete BOOLEAN DEFAULT 0
);

