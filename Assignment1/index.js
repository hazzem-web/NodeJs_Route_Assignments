// =============== Assignment 1 Solution =============== 

// Q1 

/*
stringToNumberConverter = ()=>{
    let str = "123";
    let num = Number(str);
    num += 7; 
    console.log(num);
}

stringToNumberConverter()
*/

//=======================================================

// Q2

/*
const falsyCheck = (number)=>{
    if (number == false) { 
        return "invalid";
    }
    else {
        return "valid";
    }
} 
console.log( falsyCheck(0) );
console.log( falsyCheck(1) );
*/

//=======================================================

//Q3

/*
const print_odd = ()=>{
    for(let i = 0; i < 10; i++) { 
    if (i%2 == 0) { 
        continue
    }
    else { 
        console.log(i);
    }
}
}

print_odd();
*/

//=======================================================

//Q4 

/*

const getEven = (arr)=>{
    const evenOnly =(num)=>{
        if (num%2 == 0) { 
            return num
        }
        else { 
            return false;
        }
    }
    let filterd = arr.filter(evenOnly);
    return filterd;
}

const arr = [1,2,3,4,5]

console.log( getEven(arr) )

*/

//=======================================================

//Q5 
/*
const spreed2Arrays = ()=>{
    arr1 = [1,2,3];
    arr2 = [4,5,6];
    arr3 = [...arr1 , ...arr2];
    return arr3;
}

console.log(spreed2Arrays());
*/

//=======================================================

//Q6
/*
const getWeekDays = (day)=> {
    switch (day) {
        case 1:
            return "Sunday"
            // محطتش break عشان الكود بيوقف بعد ال return
        case 2:
            return "Monday"
        case 3: 
            return "Tuesday"
        case 4:
            return "Wednesday"    
        case 5:
            return "Thursday"
        case 6:
            return "Friday"
        case 7:
            return "Saturday"                                    
        default:
            break;
    }
}

console.log( weekDays(2) );
*/

//=======================================================

//Q7

/*

const getStringsLength= (arr)=>{
    let stringsLength=[]
    for (let i = 0; i < arr.length; i++) { 
        elementLength = arr[i].length
        stringsLength.push(elementLength)
    }
    return stringsLength;
}

myarr = ["a","ab","abc","abcde"]

console.log( getStringsLength(myarr) )

*/


//=======================================================

//Q8

/*

const DivisableChecker = (num)=> {
    const DivisableBy_3 =()=>{
        if(num%3 == 0) { 
            return true
        }
        else { 
            return false
        }
    }
    const DivisableBy_5 =()=> {
        if(num%5 == 0) { 
            return true
        }
        else { 
            return false
        }
        
    }

    if ( DivisableBy_3() && DivisableBy_5()) {
        console.log("Divisable By Both")
    }
    else if (!DivisableBy_3() && !DivisableBy_5() && typeof num === "number"){ 
        console.log("Non Divisable By Both")
    }
    else if (DivisableBy_3()){ 
        console.log("Divisable By 3")
    }
    else if (DivisableBy_5()){ 
        console.log("Divisable By 5")
    }
    else{
        console.log("Unknown Error")
    }
}

DivisableChecker(3)
DivisableChecker(5)
DivisableChecker(15)
DivisableChecker(17)
DivisableChecker('gpkmew')
//الموضوع كبر مني شوية بس اتحدي يكون حد مهندلها بالشكل دا
*/

//=======================================================

//Q9

/*
const squareOfNumber=(num)=>{
    if (typeof num !== "number") { 
        return "Invalid Input"

    }     
    else { 
        if (num === 0) { 
            return 0
        }    
        else if (num === 1) { 
            return 1
        }
        else { 
            return (num ** 2)
        }
    }
}

console.log( squareOfNumber(0) );
console.log( squareOfNumber(1) );
console.log( squareOfNumber(5) );
console.log( squareOfNumber("fdwf") );

*/

//=======================================================

// Q10

/*
const DestructionFunction = (obj)=>{
    const {name ,age} = obj
    return `${name} is ${age} years old`
}

const person = { 
    name:"Hazzem",
    age:20
}

console.log( DestructionFunction(person) )
*/

//=======================================================

// Q11



function getSum() {
    let sum = 0;
    const paramLength = getSum.arguments
    console.log(paramLength)
    const paramsValues = Object.values(paramLength)
    for (let i = 0; i < paramsValues.length; i++) { 
        sum+= paramsValues[i];
    }
    console.log(paramsValues)
    return sum;
}

console.log(getSum(1,2,3,4,5)) 

// هنا الموضوع كان قايم علي التجربة عشان لقيت جوا ال function propertyاسمها arguments وعرفت اوصل منها لل parameters



//=======================================================

//Q12


//=======================================================

//q13

/*
const findMaxElement = (arr)=>{
    let max = arr[0]
    for (let i = 0; i < arr.length; i++) {     
 
        if (arr[i] > max) { 
            max = arr[i]
        }    
    }
    return max;
}

let arr = [10,20,30,40,50,100]

console.log( findMaxElement(arr) );
*/

//=======================================================

//Q14

/*
const getObjectKeys = (obj)=>{
    const Keys = Object.keys(obj)
    return(Keys)

}

const Person = {
    name: "Hazzem",
    age:20,
    city:"Alex",
    status:"Single"
}

console.log( getObjectKeys(Person) );
*/

//=======================================================

//Q15
/*

const splitString = (String)=>{
    let Words = String.split(" ")
    return Words
}

let myString = "Hello Every One My Name Is Hazzem And I Have 20 Years Old"
console.log( splitString(myString) )
*/
