import { Router } from "express";
import { addCustomAuthor } from "./author.service.js";

const router = Router();

router.post('/add-author', async(req,res)=>{
    let authorData = await addCustomAuthor();
    res.json(authorData);
})


export default router;