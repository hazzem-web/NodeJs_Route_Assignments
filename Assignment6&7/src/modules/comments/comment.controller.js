import { Router } from "express";
import { addComments, FindOrCreateComment, getCommentDetails, getCommentsWithSpecificWord, getNewestComments, updateComment } from "./comment.service.js";

const router = Router();

router.post('/add-comments', async(req,res)=>{  
    let comments = await addComments(req.body);
    res.json(comments);
})


router.patch('/update-comment/:commentID', async(req,res)=>{
    let updatedComment = await updateComment(req.params,req.body);
    res.json(updatedComment);
})


router.post('/find-or-create', async(req,res)=>{
    let upsertedData = await FindOrCreateComment(req.body);
    res.json(upsertedData);
})

router.get('/search', async(req,res)=>{
    let comments = await getCommentsWithSpecificWord(req.query);
    res.json(comments);
})


router.get('/newest/:postID', async(req,res)=>{
    let comments = await getNewestComments(req.params);
    res.json(comments);
})


router.get('/get-comment-details/:commentID', async(req,res)=>{
    let commentDetails = await getCommentDetails(req.params);
    res.json(commentDetails);
})



export default router;

