const express = require('express');
const app = express();
app.use(express.json());

const userRouter = require('./User/user.controller.js');
app.use(userRouter);

app.listen(3000,()=>{
    console.log('server is running on port 3000');
})