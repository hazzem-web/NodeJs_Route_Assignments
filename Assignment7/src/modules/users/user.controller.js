import { Router } from "express";
import { createOrUpdate, getUserByEmail, getUserById, signup } from "./user.service.js";

const router = Router();


router.post('/signup', async(req,res)=> { 
    let userData = await signup(req.body);
    res.json(userData);
})

router.post('/create-update/:userID', async(req,res)=>{
    let userData = await createOrUpdate(req.params , req.body);
    res.json(userData);
})


router.get('/get-by-email', async(req,res)=>{
    let userData = await getUserByEmail(req.query);
    res.json(userData);
})


router.get('/get-by-id/:id', async(req,res)=>{
    let userData = await getUserById(req.params);
    res.json(userData);
})




export default router;