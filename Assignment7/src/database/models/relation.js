import { commentModel } from "./comment.model.js";
import { postModel } from "./post.model.js";
import { userModel } from "./user.model.js";

userModel.hasMany(postModel,{
    foreignKey:"userID",
    onUpdate:"CASCADE",
    onDelete:"CASCADE"
})


postModel.belongsTo(userModel,{
    foreignKey:"userID",
    onUpdate:"CASCADE",
    onDelete:"CASCADE"
})



postModel.hasMany(commentModel,{
    foreignKey:"postID",
    onUpdate:"CASCADE",
    onDelete:"CASCADE"
})


commentModel.belongsTo(postModel,{
    foreignKey:"postID",
    onUpdate:"CASCADE",
    onDelete:"CASCADE"
})



userModel.hasMany(commentModel,{
    foreignKey:"userID",
    onUpdate:"CASCADE",
    onDelete:"CASCADE"
})


commentModel.belongsTo(userModel,{
    foreignKey:"userID",
    onUpdate:"CASCADE",
    onDelete:"CASCADE"
})


export {userModel , postModel , commentModel}