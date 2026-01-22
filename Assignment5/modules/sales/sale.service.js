const connection = require('../../database/connection.js');


const addSale = (req,res)=>{
    let{productID , quantitySold , saleDate} = req.body;
    connection.query(`INSERT INTO sales (productID , quantitySold , saleDate) VALUES ('${productID}','${quantitySold}','${saleDate}')`,(err,result)=>{
        if (err) { 
            console.log(err);
            res.json({message:'internal server error'});
            return;
        } else { 
            if (result.affectedRows > 0) { 
                res.json({message:'sale added successfully'});
            } else { 
                res.json({message:"can't add product"});
            }
        }
    })
}


const getQuantitySold = (req,res)=> { 
    connection.query("SELECT p.productID , productName , quantitySold FROM sales s JOIN products p ON s.productID = p.productID",(err,result)=>{
        if(err) { 
            console.log(err);
            res.json({message:'internal server error'});
        } else { 
            if (result.length > 0) { 
                res.json({message:'products fetched successfully',result});
            } else { 
                res.json({message:'no products found'});
            }
        }
    })
}

const getAllSales = (req,res)=> { 
    connection.query("SELECT productName , saleDate FROM sales s JOIN products p ON s.productID = p.productID",(err,result)=>{
        if(err) { 
            console.log(err);
            res.json({message:'internal server error'});
        } else { 
            if (result.length > 0) { 
                res.json({message:'products fetched successfully',result});
            } else { 
                res.json({message:'no products found'});
            }
        }
    })
}


module.exports = { 
    addSale,
    getQuantitySold,
    getAllSales
}