const connection = require('../../database/connection.js');

const addCategoryColumn = (req,res)=>{
    connection.query("ALTER TABLE products ADD COLUMN category VARCHAR(255)",(err,result)=>{
        if (err) { 
            console.log(err);
            res.json({message:'internal server error'});
            return;
        } else { 
            res.json({message:"column added successfully"});
        }
    })
}

const deleteCategoryColumn = (req,res)=> { 
    connection.query("ALTER TABLE products DROP COLUMN category",(err,result)=>{
        if (err) { 
            console.log(err);
            res.json({message:'internal server error'});
            return;
        } else {    
            res.json({message:"column deleted successfully"});
        }
    })
}


const AddNotNull = (req,res)=> {
        connection.query("ALTER TABLE products CHANGE COLUMN productName productName TEXT NOT NULL",(err,result)=>{
        if (err) { 
            console.log(err);
            res.json({message:'internal server error'});
            return;
        } else { 
            res.json({message:'NOT NULL Constriant added successfully'});
        }
    })
}


const addProduct = (req,res)=>{
    let {productName , price , stockQuantity , supplierID} = req.body;
        connection.query(`INSERT INTO products (productName , Price , stockQuantity , supplierID) VALUES('${productName}','${price}','${stockQuantity}','${supplierID}')`,(err,result)=>{
        if (err) { 
            console.log(err);
            res.json({message:'internal server error'});
            return;
        } else {
            if (result.affectedRows > 0) { 
                res.json({message:'product added successfully'});
            } else { 
                res.json({message:"can't add product"});
            }
        }
    })
};


const updateProductPrice = (req,res)=>{
    let productID = req.params.id;
    let {price} = req.body;
    connection.query(`UPDATE products SET price = ${price} WHERE productID = ${productID}`,(err,result)=>{
        if (err) { 
            console.log(err);
            res.json({message:'internal server error'});
            return;
        } else { 
            if (result.affectedRows > 0) { 
                res.json({message:'product Price updated successfully'});
            } else { 
                res.json({message:"can't update price"});
            }
        }
    })
}


const deleteProduct = (req,res)=>{
    let productID = req.params.id;
    connection.query(`DELETE FROM products WHERE productID = ${productID}`,(err,result)=>{
        if (err) { 
            console.log(err);
            res.json({message:'internal server error'});
            return;
        } else { 
            if (result.affectedRows > 0) { 
                res.json({message:'product deleted successfully'});
            } else { 
                res.json({message:"can't delete product"});
            }
        }
    })
}


const getHighestStock = (req,res)=> { 
    connection.query("SELECT * FROM products ORDER BY stockQuantity DESC LIMIT 1;",(err,result)=>{
        if (err) { 
            console.log(err);
            res.json({message:'internal serever error'});
            return;
        } else { 
            if (result.length > 0) { 
                res.json({message:'product fetched successfully',result});
            } else { 
                res.json({message:'product not found'});
            }
        }
    })
}

const getNotSoldProducts = (req,res)=> {
    connection.query("SELECT p.productID , productName , stockQuantity , supplierID , s.saleID FROM products p LEFT JOIN sales s ON p.productID = s.productID WHERE s.saleID IS NULL",(err,result)=>{
        if(err) { 
            console.log(err);
            res.json({message:'internal server error'});
            return;
        } else { 
            if (result.length > 0) { 
                res.json({message:'products fetched successfully'});
            } else { 
                res.json({message:'no products found'});
            }
        }
    })
}



module.exports = { 
    addCategoryColumn,
    deleteCategoryColumn,
    AddNotNull,
    addProduct,
    updateProductPrice,
    deleteProduct,
    getHighestStock,
    getNotSoldProducts 
}