import { authorModel } from "../../../database/models/author.model.js";


const addCustomAuthor = async ()=>{
    let authorData = await authorModel.insertOne({name:"author1",nationality:"British"});
    if (!authorData.acknowledged) { 
        return {message: "can't add author"}
    }

    return {message:"author created successfully", authorData};
}



export {addCustomAuthor};