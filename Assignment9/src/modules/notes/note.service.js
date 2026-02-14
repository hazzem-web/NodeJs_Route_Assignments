import { secret } from '../../../config/env.service.js';
import { noteModel } from '../../database/models/note.model.js';
import  jwt  from 'jsonwebtoken';
import { userModel } from '../../database/models/user.model.js';
import mongoose from 'mongoose';

const createNote = async (headers,data)=>{
    let { authorization } = headers;
    let { title , content } = data;
    let verified = jwt.verify(authorization,secret);
    if (!verified) { 
        return {message: 'you are not authorized to create note'};
    }
    let existNote = await noteModel.findOne({title,content,userID:verified.id});
    if (existNote) { 
        return {message: 'this note is already exists'};
    }
    let noteData = await noteModel.create({title,content,userID:verified.id});
    if (!noteData) { 
        return {message: 'cant add note'};
    }
    return {message: 'note added successfully', noteData};
}


const updateNote = async (query,headers,data)=> { 
    let { noteID } = query;
    let { authorization } = headers;
    let { title , content } = data;
    if (!noteID) { 
        return {message: 'please enter the note id'};
    }
    let noteData = await noteModel.findOne({_id:noteID});
    if (!noteData) { 
        return {message: 'note not found'};
    } 

    let verified = jwt.verify(authorization,secret);
    let user = await userModel.findById(verified.id);
    if (!user) { 
        return {message: 'user not found'};
    }
    let userID = noteData.userID.toString();
    if (verified.id !== userID) { 
        return {message: 'you are not the owner'};
    }
    

    let existNote = await noteModel.findOne({title,userID:verified.id,_id:noteID});

    if (existNote) { 
        return {meassge: 'note is already exists'};
    } 
    
    let updatedNote = await noteModel.findByIdAndUpdate(noteID,{title,content},{new:true , runValidators:true});
    if (!updatedNote) { 
        return {message: 'cant update note'}
    }

    return {message: 'note is updated successfully', updatedNote};
}




const replaceNote = async (query,headers,data)=>{
    let {noteID} = query; 
    let { authorization } = headers;
    let { title , content } = data;
    if (!noteID) { 
        return {message: 'note not found'};
    }
    let noteData = await noteModel.findById(noteID);
    if (!noteData) { 
        return {message: 'note not found'};
    }
    let verified = jwt.verify(authorization,secret);
    let userID = noteData.userID.toString();
    if (verified.id !== userID) { 
        return {message: 'you are not the owner'};
    }
    if (title === noteData.title && content === noteData.content) { 
        return {message: 'no changes applied'};
    }
    let replacedData = await noteModel.findOneAndReplace({_id:noteID},{title,content,userID},{new:true,runValidators:true});
    if (!replacedData) { 
        return {message: 'cant replace data'};
    }
    return {message: 'Note replaced successfully', replacedData};
}



const updateAllTitles = async (headers,data)=>{
    let { authorization } = headers;
    let { title } = data;
    if (!authorization) { 
        return {message: 'token not found'};
    }
    let verified = jwt.verify(authorization,secret);
    if (!verified) { 
        return {message: 'you are not the owner'};
    }
    let userID = verified.id;
    let updatedNotes = await noteModel.updateMany({userID},{title},{new:true,runValidators:true});
    if (!updatedNotes) { 
        return {message: 'no notes found'};
    }

    if(updatedNotes.modifiedCount === 0){
        return {message: 'no changes occured'};
    }

    return {message: 'notes updated successfully', updatedNotes};
}



const deleteNote = async (query,headers)=>{
    let { noteID } = query;
    let { authorization } = headers;
    if (!noteID) { 
        return {message: 'please enter noteID'};
    }
    if (!authorization) { 
        return {message: 'token not found'};
    }

    let verified = jwt.verify(authorization,secret);

    if (!verified) { 
        return {message: 'cant verify the token' }
    }

    let noteData = await noteModel.findById(noteID);
    if (!noteData) { 
        return {message: 'note not found'};
    }
    let userID = noteData.userID.toString();
    if (verified.id !== userID) { 
        return {message: 'you are not the owner'};
    }
    let deletedNote = await noteModel.findByIdAndDelete(noteID,{new:true});
    if (deletedNote.deletedCount === 0) { 
        return {message: 'cant delete note'};
    }
    return {message: 'note deleted successfully', deletedNote};
}


const paginateNotes = async(query,headers)=> {
    let { page , limit } = query;
    page = Number(page);
    limit = Number(limit);
    let { authorization } = headers;
    if (!page || !limit) { 
        return {message: 'please enter page and limit'};
    }
    if (!authorization) { 
        return {message: 'token not found'};
    }

    let verified = jwt.verify(authorization,secret);

    if (!verified) { 
        return {message: 'cant verify the token' }
    }
    let userID = verified.id;
    let notesData = await noteModel.find({userID}).skip((page -1 ) * limit).limit(limit).sort({'createdAt':-1}).select("-__v");
    if (notesData.length == 0) { 
        return {message: 'no notes found'};
    }
    
    return {message: 'user notes fetched successfully', notesData};
}



const getNote = async(query,headers)=>{
    let { noteID } = query;
    if (!noteID) { 
        return {meassge: 'please enter noteID'};
    }
    let { authorization } = headers;
    let verified = jwt.verify(authorization,secret);
    if (!verified) { 
        return {message: 'cant verify token'}
    } 
    let noteData = await noteModel.findById(noteID).select("-__v");
    if (!noteData) { 
        return {message: 'note not found'};
    }
    let userID = noteData.userID.toString();
    if (userID !== verified.id) { 
        return {meassge: 'you are not authorized to get note'};
    }
    return {message: 'note fetched successfully', noteData}
}



const getUserNotes = async(headers)=>{
    let { authorization } = headers;
    if (!authorization) { 
        return {message: 'no token found'};
    }

    let verified = jwt.verify(authorization,secret);
    if (!verified) { 
        return {message: 'cant verify token'};
    }
    
    let user = await userModel.findById(verified.id);
    if (!user) { 
        return {message: 'user not found'};
    }

    let userID = user._id.toString();
    if (userID !== verified.id) { 
        return {message: 'you are not authorized to get this notes'};
    }
    let userNotes = await noteModel.find({userID}).populate('userID','-_id email').select("title userID createdAt");
    if (userNotes.length == 0) { 
        return {message: 'no Note found'};
    }

    return {message: 'Notes fetched successfully', userNotes};
}



const aggregateNote = async(query,headers)=>{
    let { title} = query;
    let { authorization } = headers;
    if (!title) { 
        return {message: 'please enter Note Title'};
    }


    if (!authorization) { 
        return {message: 'no token found'};
    }

    let verified = jwt.verify(authorization,secret);
    if (!verified) { 
        return {message: 'cant verify token'}
    }

    let aggregatedNotes = await noteModel.aggregate([
        {
            $match: {
                title:title,
                userID: new mongoose.Types.ObjectId(verified.id)
            }
        },
        {
            $lookup:{
                from: "users", 
                localField: "userID",
                foreignField: "_id",
                as: "user"
            }
        },
        {
            $unwind:"$user"
        },
        {
            $project:{
                title:1,
                userID:1,
                createdAt:1,
                "user.name":1,
                "user.email":1,
                _id:0
            }
        }
  ])

  if (aggregatedNotes.length === 0) { 
    return {message: 'note not found'}
  }

  return {message: 'notes fetched successfully', aggregatedNotes};
}



const deleteUserNotes = async(headers)=>{
    let { authorization } = headers;
    if (!authorization) { 
        return {message: 'token not found'};
    }

    let verified = jwt.verify(authorization,secret);

    if (!verified) { 
        return {message: 'cant verify the token' }
    }


    let userID = verified.id;
    let deletedNotes = await noteModel.deleteMany({userID},{new:true});
    if (deletedNotes.deletedCount === 0) { 
        return {message: 'no Notes found for this user'};
    }
    return {message: 'note deleted successfully', deletedNotes};
}



export { 
    createNote , 
    updateNote , 
    replaceNote,
    updateAllTitles , 
    deleteNote , 
    paginateNotes , 
    getNote , 
    getUserNotes,
    aggregateNote,
    deleteUserNotes
};