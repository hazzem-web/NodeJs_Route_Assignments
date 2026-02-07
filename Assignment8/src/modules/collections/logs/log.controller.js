import { Router } from "express";
import { aggregateFour, createCappedLog, insertLog } from "./log.service.js";


const router = Router();

router.post('/capped', async(req,res)=>{ 
    let logData = await createCappedLog();
    res.json(logData);
})


router.post('/insert-log', async(req,res)=>{
    let logData = await insertLog(req.body);
    res.json(logData);
})


router.get('/aggregate4', async(req,res)=>{
    let aggregatedData = await aggregateFour();
    res.json(aggregatedData);
})

export default router;