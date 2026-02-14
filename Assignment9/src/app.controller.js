import express from 'express';
import { databaseConnection } from './database/connection.js';
import userRouter from './modules/users/user.controller.js';
import noteRouter from './modules/notes/note.controller.js'; 
import { port } from '../config/env.service.js';

export const bootstarp = async()=>{
    const app = express();
    app.use(express.json());
    app.use('/users',userRouter);
    app.use('/notes',noteRouter);

    await databaseConnection();
    app.use((err,req,res,next)=>{
        res.json({message: 'internal server error', err:err.message});
    })

    app.listen(port, ()=> console.log(`server is running on port ${port}`));
}