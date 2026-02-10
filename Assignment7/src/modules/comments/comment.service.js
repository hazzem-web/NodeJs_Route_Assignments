import { Op } from 'sequelize';
import { postModel } from '../../database/models/post.model.js';
import { userModel } from '../../database/models/user.model.js';
import { commentModel } from './../../database/models/comment.model.js';

const addComments = async (data)=> {
    const filterdComments = data.filter(comment => comment.content && comment.userID && comment.postID);

    if(!Array.isArray(filterdComments)) { 
        return {message: "comments must be an array"};
    }
    if (filterdComments.length == 0) { 
        return {message: "please enter at least one comment"};
    }
    
    let commentsData = await commentModel.bulkCreate(filterdComments);
    if (commentsData.length == 0) { 
        return {message: "cant create comments"};
    }

    return {message: "comments created successfully", commentsData}; 
}




const updateComment = async (params , data)=>{
    let { commentID } = params;
    let { userID , content } = data;
    let user = await userModel.findByPk(userID);
    if (!user) { 
        return {message: "user not found"};
    }
    let comment = await commentModel.findByPk(commentID);
    if (!comment) { 
        return {message: "comment not found"};
    }
    if (userID !== comment.userID) {
        return {message: "you are not authorized to update this comment"};
    }

    let updatedComment = await comment.update({content} , {where:{commentID}});
    if (updatedComment[0] == 0) { 
        return {message: "cant update comment"};
    }

    
    return {message: "comment updated Successfully", comment};
}



const FindOrCreateComment = async(data)=>{
    let { postID , userID , content} = data;
    let user = await userModel.findByPk(userID,{
        attributes:{
            exclude:['password','role']
        }
    });
    let post = await postModel.findByPk(postID);
    if (!user) { 
        return {message: "user not found"};
    }
    if (!post) { 
        return {message: "post not found"}
    }
    let existComment = await commentModel.findOne({where:{ postID , userID , content}});
    if (existComment) { 
        return {message: "comment is already exists", existComment};
    }
    let commentData = await commentModel.create({
        postID,
        userID,
        content
    })
    if (!commentData) { 
        return {message: "cant create comment"};
    }

    return {message: 'comment created successfully', commentData};
}


const getCommentsWithSpecificWord = async (data)=> { 
    let { word } = data;
    if (!word) { 
        return {message: "please search for word"}; 
    }
    let comments = await commentModel.findAndCountAll({
        where:{
            content:{
                [Op.like]:`%${word}%`
            }}
    })

    if (comments.rows.length == 0) { 
        return {message: "no comments found with this word"};
    }

    return {message: `comments with word ${word} fetched successfully`, comments};
}



const getNewestComments = async (params)=>{
    let { postID } = params;
    let post = await postModel.findByPk(postID);
    if (!post) { 
        return {message: "post not found"};
    }
    let comments = await commentModel.findAll({
        where:{postID},
        order:[['createdAT','DESC']],
        limit:3
    });

    if (comments.length == 0) { 
        return {message: "no commnets found"};
    }

    return {message: `recent ${comments.length} comments`, comments};
}


const getCommentDetails = async (params)=>{
    let { commentID } = params;
    let comment = await commentModel.findByPk(commentID,{
        include:[
            {model:userModel,attributes:{
                exclude:['password','role']
            }},
            {model:postModel}
        ]
    });
    if (!comment) { 
        return {message: "comment not found"};
    }

    return {message: "comment fetched successfully", comment};
}



export { addComments , updateComment , FindOrCreateComment , getCommentsWithSpecificWord , getNewestComments , getCommentDetails };  