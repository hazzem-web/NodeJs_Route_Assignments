import express from 'express';

import bookRouter from './modules/books/book.controller.js'
import authorRouter from './modules/collections/authors/author.controller.js'
import logsRouter from './modules/collections/logs/log.controller.js'
import { port } from '../config/env.service.js';
import { databaseConnection } from './database/connection.js';

export const bootstarp = async ()=> { 
    const app = express();
    app.use(express.json());
    app.use('/books',bookRouter);
    app.use('/collection/authors',authorRouter)
    app.use('/collection/logs',logsRouter)
    await databaseConnection();
    app.use((err,req,res,next)=>{
        res.json({message:'internal server error' , err:err.message});
    })
    app.listen(port , ()=> console.log(`server is running on port ${port}`));
}