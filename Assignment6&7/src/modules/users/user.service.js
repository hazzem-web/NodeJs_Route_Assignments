import { userModel } from "../../database/models/user.model.js";

const signup = async (data)=> { 
    let {name,email,password,role} = data;
    let existUser = await userModel.findOne({where:{email}});
    if (existUser) { 
        return {message: "user is already exists"};
    }

    let userData = userModel.build({name,email,password,role});
    await userData.save(); 
    if (!userData) { 
        return {message: "cant add user"}
    }

    return {message: "user added successfully", userData};
}


const createOrUpdate = async(params , data)=>{
    let { id } = params;
    let {name,email,password,role} = data;
    let userData = await userModel.upsert({
        id,
        name,
        email,
        password,
        role
    },{
        validate:false
    });
    if (!userData) { 
        return {message: "cant add or update user"};
    }
    return {message: "user is created or updated successfully", userData};
}   



const getUserByEmail = async (data)=>{
    let { email } = data;
    if (!email) { 
        return {message: "please enter user email"};
    }
    let userData = await userModel.findOne({where:{email}});
    if (!userData) { 
        return {message: "user not found"};
    }

    return {message: "user fetched successfully", userData};
}



const getUserById = async (data)=> { 
    let { id } = data;
    let userData = await userModel.findByPk(id,{
        attributes:{
            exclude:"role"
        }
    });
    if (!userData) { 
        return {message: "user not found"};
    }

    return {message: "user fetched successfully", userData};
}




export { signup , createOrUpdate , getUserByEmail ,  getUserById };