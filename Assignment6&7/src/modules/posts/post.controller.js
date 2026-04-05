import { Router } from "express";
import { addPost, deletePostByOwner, getPostsAndComments, getUserPostsAndComments } from "./post.service.js";

const router = Router();

router.post('/add-post', async(req,res)=>{
    let postData = await addPost(req.body);
    res.json(postData);
})

router.delete('/delete-post/:postID', async(req,res)=>{
    let deletedPost = await deletePostByOwner(req.params);
    res.json(deletedPost); 
})

router.get('/posts-details/:postID', async(req,res)=>{
    let postDetails = await getUserPostsAndComments(req.params);
    res.json(postDetails);
})


router.get('/posts-comments', async(req,res)=>{
    let postsDetails = await getPostsAndComments();
    res.json(postsDetails);
})


export default router;