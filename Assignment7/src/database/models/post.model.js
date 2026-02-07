import { sequelize } from "../connection.js";
import { DataTypes } from 'sequelize';

export const postModel = sequelize.define('posts',{
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
        
    }
})