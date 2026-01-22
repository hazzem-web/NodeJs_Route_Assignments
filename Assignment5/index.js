const express = require('express');
const app = express();
app.use(express.json());

const port = 3000;

const connection = require('./database/connection.js');

const productsRouter = require('./modules/products/product.controller.js');
const suppliersRouter = require('./modules/suppliers/supplier.controller.js');
const salesRouter = require('./modules/sales/sale.controller.js');

app.use('/products',productsRouter);
app.use('/suppliers',suppliersRouter);
app.use('/sales',salesRouter);



app.get('/',(req,res)=>{
    connection.query('SELECT 1+1 AS RESULT',(err,result)=>{
        if (err) { 
            console.log(err);
        } else { 
            console.log(result);
        }
    })
})



app.listen(port ,()=> console.log(`server is running on port ${port}`));