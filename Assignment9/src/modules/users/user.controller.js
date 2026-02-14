import { Router } from 'express';
import { deleteUser, getUser, login, signup, updateUser } from './user.service.js';


const router = Router();

router.post('/signup', async(req,res)=>{
    let userData = await signup(req.body);
    res.json(userData);
})

router.post('/login', async(req,res)=>{
    let userData = await login(req.body);
    res.json(userData);
})

router.patch('/update-user', async(req,res)=>{
    let userData = await updateUser(req.headers,req.body);
    res.json(userData);
})


router.delete('/delete-user', async(req,res)=>{
    let userData = await deleteUser(req.headers);
    res.json(userData);
})

router.get('/get-user', async(req,res)=>{
    let userData = await getUser(req.headers);
    res.json(userData);
})

export default router;