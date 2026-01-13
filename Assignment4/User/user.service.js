const fs = require('fs');
const path = require('path');
const dataPath = path.join(__dirname, 'data.json');
const users = JSON.parse(fs.readFileSync(dataPath,'utf8'));

const addUser = (req, res) => {
  let { name, age, email, city } = req.body;
  let existUser = users.find(user => user.email == email);
  if (!name || !age || !email || !city) {
    res.json({ message: "all fileds are required" });
  } else {
    if (existUser) {
      res.json({ message: "user is already exists" });
    } else {
      const id = users.length + 1;
      users.push({ id, name, age, email, city });
      fs.writeFileSync(dataPath, JSON.stringify(users));
      res.json({ message: "user is added successfully", users });
    }
  }
};

const updateUser = (req,res)=>{
  let {id} = req.params;
  let newUser = req.body;
  let existUser = users.find(user => user.id == id);
  if (existUser) { 
    if (newUser) { 
      if (newUser.name != existUser.name) { 
        existUser.name = newUser.name;
        fs.writeFileSync(dataPath,JSON.stringify(users));
        res.json({message:"userName is Updated Successfully", users});
      } else { 
        res.json({message:"No data changes to apply"});
      }
    } else { 
      res.json({message:"you didn't send data to change"});
    }
  } else { 
    res.json({message:"user not found"});
  }
}

const deleteUser = (req,res)=>{
  let {id} = req.params;
  let userIndex = users.findIndex(user => user.id == id);
  if (userIndex != -1) { 
    users.splice(userIndex,1);
    fs.writeFileSync(dataPath,JSON.stringify(users));
    res.json({message:"user is deleted successfully" , users});
  } else { 
    res.json({message:"user not found"});
  }
}

const getUserByName = (req,res)=>{
  let userName = req.query.name;
  let filteredUsers = users.filter(user => user.name == userName);
  if(userName) { 
    if (filteredUsers.length != 0) { 
      res.json({message:`users with name ${userName} is`, filteredUsers});
    } else { 
      res.json({message:"no user found"});
    }
  } else { 
    res.json({message:"no filter to apply", users});
  }
}

const getAllUsers = (req,res)=>{
  if(users.length != 0) { 
    res.json({users});
  } else { 
    res.json({message:"no users available"});
  }
}

const filterUserAge = (req,res)=>{
  let minimumAge = req.query.age;
  let ageFilter = users.filter(user => user.age >= minimumAge);
  if(minimumAge) { 
    if (ageFilter.length != 0) { 
      res.json({message:"filter is applied successfully",ageFilter});
    } else { 
      res.json({message:"no user found"});
    }
  } else { 
    res.json({message:"no filter to apply",users});
  }
}

const getUserById = (req,res)=> { 
  let {id} = req.params;
  let user = users.find(user => user.id == id);
  if (user) { 
    res.json({user});
  } else { 
    res.json({message:"user not found"});
  }
}


module.exports =  {
    addUser,
    updateUser,
    deleteUser,
    getUserByName,
    getAllUsers,
    filterUserAge,
    getUserById
}