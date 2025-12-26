//                         =================== Assignment 2 ===================

const fs = require('fs');
const path = require('path');
const myPath = 'C:/Users/Hazzem/Desktop/Node.js_Route/Node_Session6/Assignment2/index.js';
const {EventEmitter} = require('events');
const event = new EventEmitter();
const os = require('os');

// Q1

// func1 = ()=> { 
//     console.log("File: ",myPath);
//     console.log("Dir: ",path.dirname(myPath));
// }
// func1();





// Q2

// func2 = (filePath)=> { 
//     filePath = myPath;
//     let fileName = path.basename(filePath);
//     return fileName;
// }
// console.log("fileName: ",func2());






// Q3

// func3 = (obj)=> {
//     const {dir , name , ext} = obj;
//     let formattedPath = path.format({dir,name,ext});
//     return formattedPath;
// }

// const myObj = {
//     dir:"\\folder",
//     name:"app",
//     ext:".js"
// }
// console.log("formattedPath: ",func3(myObj))





// Q4

// const func4 = (filePath)=> { 
//     let ext = path.extname(filePath);
//     return ext;
// }

// let randomPath = '/hazzem/programming/study.pdf' 
// console.log("fileExtension: ",func4(randomPath))





// Q5


// const func5 = (filePath)=> { 
//     const {name , ext} = path.parse(filePath)
//     console.log(`name: ${name} , ext ${ext}`)
// }

// const pathToParse = '/home/app/main.js'

// func5(pathToParse);



// Q6

// func6 = (filePath)=>{
//     const check = path.isAbsolute(filePath);
//     return check;
// }

// console.log("isAbsolute: ",func6(myPath));







// Q7


// func7 = (...seg)=> { 
//     const joined = path.join(...seg);
//     return joined;
// }

// console.log(func7("src","componentes","app.js"));




//Q8

// const func8 = (filePath)=>{
//     const absoluted = path.resolve(filePath);
//     console.log(absoluted);
//     return absoluted;
// }

// const relativePath = "./index.js";

// func8(relativePath);






//Q9

// const func9 = (path1 , path2)=> { 
//     const merged = path.join(path1,path2);
//     console.log(merged);
//     return merged;
// }

// const p1 = './user/home';
// const p2 = '/hazzem/projects';
// func9(p1 , p2);





//Q10


// const deleteFileAsync = (file)=> { 
//     const myFile = fs.rm(file,((err,data)=>{
//         if (err) { 
//             console.log(err);
//         } else { 
//             console.log("file deleted successfully");
//         }
//     }))
//     return myFile;
// }
// const myFile = 'data.json';
// deleteFileAsync(myFile);







// Q11

// const createFolderSync = (path)=>{
//     const myFile = 'C:/Users/Hazzem/Desktop/Node.js_Route/Node_Session6/Assignment2';
//     fs.mkdirSync(newFile,false,myFile,((err , data)=>{
//         if(err) { 
//             console.log(err);
//         }
//         else { 
//             console.log("Success");
//         }
//     }));
// }
// const newFile = './newfolder';
// createFolderSync(newFile);





// Q12

// const startEvent = ()=>{
//     event.on('start',(msg)=>{
//         console.log(msg)
//     })
//     event.emit('start',"Welcome event triggered!");
// }
// startEvent();




// Q13

// const loginEvent = ()=>{
//     event.on('login',(name)=>{
//         console.log(`user Logged In: ${name}`);
//     })
//     event.emit('login',"Hazzem");
// }

// loginEvent();




// Q14


// const readFileS = ()=> { 
//     const data = fs.readFileSync('data.json','utf8')
//     console.log("the file Content: ",data);
// }

// readFileS();




// Q15

// const updateData = ()=> { 
//     const file = fs.readFileSync('data.json','utf8');
//     const paresdData = JSON.parse(file);
//     paresdData.push({name:"Hazzzzzzem",age:20,status:"pushed"});
//     const stringData = JSON.stringify(paresdData);
//     const writeData = fs.writeFile('data.json',stringData,'utf8',((err)=>{
//         if (err) { 
//             console.log(err);
//         }else { 
//             console.log("data updated successfully");
//         }
//     }))
//     return writeData;
// }

// updateData();





//Q16


// const checkExist = (filePath)=> { 
//     const exist = 'C:/Users/Hazzem/Desktop/Node.js_Route/Node_Session6/Assignment2/index.js';
//     if (filePath == exist) { 
//         console.log("this directory is already exists");
//     } else { 
//         console.log("directory is not created before");
//     }
// }
// const newPath = '/hazzem/new';
// checkExist(myPath);
// checkExist(newPath);






//Q17

// const getOsSpecification = ()=> { 
//     const platform = os.platform();
//     const arch = os.arch();
//     console.log(`platform: ${platform} , Arch: ${arch}`)
// }
// getOsSpecification();