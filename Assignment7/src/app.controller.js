import express from 'express';

export const bootstrap = ()=> { 
    const app = express();
    app.use(express.json());
    const port = 3000;

    // app.use((err , req , res , next)=>{

    // })
    app.listen(port , console.log(`server is running on port ${port} `));
}

