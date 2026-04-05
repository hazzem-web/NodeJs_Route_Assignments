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
        validate:{
            checkPasswordLength(password){
                if (password.length <= 6) { 
                    throw new Error ("password must be greater than 6 characters");
                }
            }
        }
    },
    role:{
        type:DataTypes.ENUM(['user','admin']),
        defaultValue:"user"
    }
},{
    hooks:{
        beforeCreate:(user)=>{
            if (user.name.length <= 2) { 
                throw new Error("name must be more than 2 chars");
            }
        }
    }
})


