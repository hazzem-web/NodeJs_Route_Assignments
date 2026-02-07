import { DataTypes } from "sequelize";
import { sequelize } from "../connection.js";

export const userModel = sequelize.define('user',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false,
        field:"userID"
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
        unique:true,
        validate:{
            isEmail:true
        }
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
        
    },
    role:{
        type:DataTypes.ENUM(['user','admin']),
        defaultValue:"user"
    }
},{
    hooks:{
        
    }
})


