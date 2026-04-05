import { commentModel } from "../../database/models/comment.model.js";
import { postModel } from "../../database/models/post.model.js";
import { userModel } from "../../database/models/user.model.js";

const addPost = async (data)=> { 
    let { title , content , userID} = data;
    let user = await userModel.findByPk(userID);
    if (!user) { 
        return {message: "user not found"};
    }
    let existPost = await postModel.findOne({where:{title , content , userID}})
    if (existPost) { 
        return {message: "post is already exists"};
    }
    let postData = new postModel({ title , content , userID});
    await postData.save();
    if (!postData) { 
        return {message: "cant add post"}
    }

    return {message: "post added successfully", postData};
}



const deletePostByOwner = async (params)=>{
    let { postID } = params;
    let postData = await postModel.findByPk(postID,{
        include:[{
            model:userModel
        }]
    });
    if (!postData) { 
        return {message: "post not found"};
    }
    if (postData.userID != postData.user.id) { 
        return {message: "you are not authorized to delete this post"};
    }

    let deletedPost = await postData.destroy();

    if(!deletedPost){
        return {message: "cant delete post"}
    }

    return {message: "post deleted successfully"};
    
}




const getUserPostsAndComments = async (params)=>{
    let { postID } = params;
    let postDetails = await postModel.findAll({where:{postID},
        attributes:['id','title'],
        include:[
            {
                model:userModel,
                attributes:['id','name']
            },
            {
                model:commentModel,
                attributes:['id','content']
            }
        ]
    })
    if(!postDetails){
        return {message:"post not found"}
    }
    return {message: "post fetched successfully ", postDetails};
}



const getPostsAndComments = async (req,res)=>{
    let postsDetails = await postModel.findAll({
        include:[{model:commentModel}]
    })

    if (postsDetails.length == 0) { 
        return {message: "no posts found"};
    }

    return {message: "posts fetched successfully", postsDetails};
}



export { addPost , deletePostByOwner , getUserPostsAndComments , getPostsAndComments }

