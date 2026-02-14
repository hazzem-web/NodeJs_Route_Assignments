import mongoose from 'mongoose';

let userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    age:{
        type:Number,
        required:true,
        min:[18, 'age must be at least 18'],
        max:[60 , 'age must be max 60']
    }
},{
    timestamps:true
})



export const userModel = mongoose.model('users',userSchema);