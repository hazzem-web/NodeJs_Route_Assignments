import mongoose from 'mongoose';
import { databaseUri } from "../../config/env.service.js"

export const databaseConnection = async()=>{
    mongoose.connect(databaseUri)
    .then(()=>{
        console.log('database connected successfully');
    })
    .catch((err)=>{
        console.error('cant connect to database ' , err);
    });
};