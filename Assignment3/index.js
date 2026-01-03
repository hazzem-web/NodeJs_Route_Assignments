const http = require('http');
const fs = require('fs');
const users = JSON.parse(fs.readFileSync('./data.json','utf8'));

const server = http.createServer((req,res)=>{
    const {url , method} = req;
    if (url == '/add-user' && method == 'POST') { 
        let userData;
        req.on('data',(chunk)=>{
            console.log(chunk);
            userData = JSON.parse(chunk);
        })  
        req.on('end',()=>{
            if (!userData.id || !userData.name || !userData.age || !userData.email || !userData.city) { 
                res.write("all fields are required");
                console.log(userData);
                res.end();
                return;
            }
            else { 
                let existUser = users.find((user => user.email == userData.email))
                if (existUser) { 
                    res.write("this user is already exists");
                    res.end();
                    return;
                }
                else { 
                    users.push(userData);
                    fs.writeFileSync('./data.json',JSON.stringify(users));
                    res.write(JSON.stringify(users));
                    res.end();
                    return;
                }
            }
        })
    }
    else if (url == '/update-user' && method == 'PATCH') { 
        let id;
        let JSONData;
        req.on('data',(chunk)=>{
            JSONData = JSON.parse(chunk);
            console.log(JSONData);
            id = JSONData.id;
        })
        req.on('end',()=>{
            let userData = users.find(user => user.id == id);
            console.log(userData);
            if(userData) {
                userData.name = JSONData.name;
                fs.writeFileSync('./data.json',JSON.stringify(users)); // store changes to the JSON File
                res.write(JSON.stringify(userData));
                res.end();
                return;
            }
            else { 
                res.write("user not found");
                res.end();
                return;
            }
        })
    }
    else if (url == '/delete-user' && method == 'DELETE') { 
        let id;
        req.on('data',(chunk)=> { 
            console.log(chunk);
            let JSONData = JSON.parse(chunk);
            console.log(JSONData);
            id = JSONData.id;
            // console.log(id); 
        })
        req.on('end',()=>{
            console.log(id,"from on end");
            let userIndex = users.findIndex(user => user.id == id);
            console.log(userIndex);
            if(userIndex != -1) { 
                users.splice(userIndex,1);
                // console.log(users);
                fs.writeFileSync('./data.json',JSON.stringify(users)); //save changes to the JSON File
                res.write("user deleted successfully");
                res.end();
                return;
            }
            else { 
                res.write("user not found");
                res.end();
                return;
            }
        })
    }
    else if (url == '/get-users' && method == 'GET') { 
        const stringData = JSON.stringify(users);
        res.write(stringData);
        res.end();
    }
    else if (url == '/get-user-by-id' && method == 'POST') { 
        let id;
        req.on('data',(chunk)=>{
            console.log(chunk);
            let JSONData = JSON.parse(chunk);
            console.log(JSONData);
            id = JSONData.id;
            console.log(id);
        })
        req.on('end',()=>{
            console.log(`${id} from on end`);
            let userData = users.find(user => user.id == id);
            if (userData) { 
                console.log(userData);
                let finalData = JSON.stringify(userData);
                res.write(finalData);
                res.end();
                return;
            }
            else { 
                res.write("user not found");
                res.end();
                return;
            }
        })
    }
})
server.listen(3037,()=>{
    console.log("server is running on port 3037");
})