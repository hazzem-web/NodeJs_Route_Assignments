import { Model , DataTypes } from 'sequelize';
import { userModel } from "./user.model.js";
import { sequelize } from '../connection.js';


export class postModel extends Model {};

postModel.init({    
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
        field:"postID"
    },
    title:{
        type:DataTypes.STRING,
        allowNull:false
    },
    content:{
        type:DataTypes.TEXT,
        allowNull:false
    },
    userID:{
        type:DataTypes.INTEGER,
        allowNull:false,
        references:{
            model:userModel,
            key:'userID'
        }
    },
},{
    sequelize,
    paranoid:true,
    modelName:'posts'
})