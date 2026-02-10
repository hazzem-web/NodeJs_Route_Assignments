import express from 'express';
import userRouter from './modules/users/user.controller.js';
import postRouter from './modules/posts/post.controller.js';
import commentRouter from './modules/comments/comment.controller.js';
import { databaseConnection, databaseSync } from './database/connection.js';

export const bootstrap = async ()=> { 
    const app = express();
    app.use(express.json());
    const port = 3000;
    app.use('/api/users', userRouter);
    app.use('/api/posts', postRouter);
    app.use('/api/comments', commentRouter);
    await databaseConnection();
    await databaseSync();
    app.use((err,req,res,next)=>{
        res.json({message: 'internal server error', err:err.message});
    })
    app.listen(port , console.log(`server is running on port ${port} `));
}

