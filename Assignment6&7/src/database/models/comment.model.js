import { DataTypes , Model } from "sequelize"
import { postModel } from "./post.model.js";
import { userModel } from "./user.model.js";
import { sequelize } from "../connection.js";



export class commentModel extends Model {};

commentModel.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
        field:"commentID"
    },
    content:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    postID:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:postModel,
            key:'postID'
        }
    },
    userID:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:userModel,
            key:'userID'
        }
    }
},{
    sequelize,
    modelName:'comments'
})