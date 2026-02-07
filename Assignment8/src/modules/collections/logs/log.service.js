import { db } from "../../../database/connection.js";
import { bookModel } from "../../../database/models/book.model.js";
import { logModel } from "../../../database/models/log.model.js";

const createCappedLog = async ()=>{
    let logsData = await db.createCollection('logs',{capped:true,size:1000,max:5});
    if(!logsData) { 
        return {message:"can't create log"}
    }

    return {message: "capped log created successfully"};
}


const insertLog = async (data)=> { 
    let { book_id , action } = data;
    let logData = await logModel.insertOne({book_id,action});
    if (!logData) { 
        return {message: 'cant create log'}
    }   
    
    return {message: 'log created successfully', logData};
}       


const aggregateFour = async ()=>{
    let logsData = await logModel.aggregate([
    {
        $addFields: {
            book_id: { $toObjectId: "$book_id" }
        }
    },
    {
        $lookup: {
            from: "books",
            localField: "book_id",
            foreignField: "_id",
            as: "book_details"
        }
    }
    ])
    .toArray();

    if (logsData.length == 0) { 
        return {message: "books not found"};
    }

    return {message: "aggregated data", logsData};
}


export { createCappedLog , insertLog , aggregateFour};