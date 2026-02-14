import { envSalt, secret } from '../../../config/env.service.js';
import { userModel } from './../../database/models/user.model.js';
import { hash , compare } from 'bcrypt';
import jwt from 'jsonwebtoken';

const signup = async(data)=>{
    let { name , email , password , phone , age} = data;
    let existUser = await userModel.findOne({email});
    if (existUser) { 
        return {message: 'user is already exists'};
    }
    let hashedPassword = await hash(password , +envSalt);
    let userData = await userModel.create({name , email , password:hashedPassword , phone , age});
    if (!userData) { 
        return {message: "cant add user"}
    }
    return {nessage: 'user added successfully', userData};
}

const login = async (data)=> { 
    let { email , password } = data;
    let userData = await userModel.findOne({email});
    if (!userData) { 
        return {message: 'user not found'};
    }
    let isMatched = await compare(password,userData.password)
    if (!isMatched) { 
        return {message: 'incorrect password'};
    }
    let token = jwt.sign({id:userData._id}, secret,{expiresIn:'1d'});
    if (!token) { 
        return
    }
    return {message: 'user logged in successfully', token};
}


const updateUser = async(headers,data)=>{
    let { authorization } = headers;
    let { name , email , age , password } = data;
    if (!password) { 
        return {message: 'enter your password'};
    }
    let verified = jwt.verify(authorization,secret);
    if (!verified) { 
        return {message: 'cant verify token'}
    }
    let userData = await userModel.findById(verified.id);
    if (!userData) {
        return {message: 'user not found'};
    }
    let isMatched = await compare(password,userData.password);
    if (!isMatched) { 
        return {message: 'you are not authorized to update user'};
    }
    
    let updatedData = await userModel.findByIdAndUpdate(verified.id,{name,email,age},{new:true}).select("-password -__v");
    if (!updatedData) { 
        return {message: 'cant update user'}
    }
    return {message: 'user updated successfully', updatedData};
}



const deleteUser = async (headers)=>{
    let { authorization } = headers;
    let verified = jwt.verify(authorization , secret);
    if (!verified) { 
        return {message: 'you are not authorized to update user'}
    }
    let deletedUser = await userModel.findByIdAndDelete(verified.id,{new:true}).select("-password  -__v");
    if (!deletedUser) { 
        return {message: 'user not found'};
    }
    return {message: 'user deleted successfully', deletedUser};
}


const getUser = async(headers)=>{
    let { authorization } = headers;
    let verified = jwt.verify(authorization,secret);
    if (!verified) { 
        return {meassge: 'you are not authorized to get user'};
    }
    userModel.aggregate()
    let userData = await userModel.findById(verified.id).select("-password -__v");
    if (!userData) { 
        return {message: 'user not found'};
    }
    return {message: 'user fetched successfully', userData}
}



export { signup , login , updateUser , deleteUser , getUser } 