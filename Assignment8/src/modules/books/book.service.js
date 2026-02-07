import { db } from "../../database/connection.js"
import { bookModel } from './../../database/models/book.model.js';


const makeIndex = async ()=> { 
    const index = await bookModel.createIndex({title:1});
    if (!index) { 
        return {message:'cant create index'};
    }

    return {message:'index added successfully',index};
}



const addOneBook = async (data)=> { 
    let {title , author , year , genres} = data;
    let bookData = await bookModel.insertOne({title , author , year , genres});
    if (!bookData.acknowledged) { 
        return {message: 'cant add book'}
    }

    return {message: 'book added successfully',bookData};
}


const addManyBooks = async ()=>{
    let booksData = await bookModel.insertMany([
        {
            title:"Future",
            author:"George Orwell",
            year:2020,
            genres:["Science Fiction"]
        },
        {
            title:"To Kill a Mockingbird",
            author:"Harper Lee",
            year:1960,
            genres:["Classic","Fiction"]
        },
        {
            title:"Brace New World",
            author:"Aldous Huxley",
            year:2006,
            genres:["Dystopian","Science Fiction"]
        }
    ]);

    if (!booksData.acknowledged) { 
        return {message: 'cant add Books'};
    }

    return {message:"Books Added successfully", booksData};
};



const updateFutureBook = async ()=> {
    let bookData = await bookModel.findOne({title:"Future"})
    if (!bookData) { 
        return {message: "book not found"};
    }
    let updatedData = await bookModel.updateOne(bookData,{$set:{year:2022}});
    if (updatedData.modifiedCount == 0) { 
        return {message: "cant update book"};
    }
    return {message: "book year released updated successfully",updatedData};
}



const getBraveTitle = async (data)=> { 
    let { title } = data;
    if (!data) { 
        return {message: "please enter the book name"}
    }
    let bookData = await bookModel.findOne({title});
    if (!bookData) { 
        return {message: "book not found"};
    }
    return {message: "book found successfully", bookData};
}




const getBooksFromToYear = async (data)=> {
    let {from , to} = data;
    from = Number(from);
    to = Number(to);
    if (!from || !to) { 
        return {message: "please enter the start year & end year in the query"};
    }
    let booksData = await bookModel.find({
        year:{
            $gte: from,
            $lte: to
        }
    }).toArray();

    if (booksData.length == 0) { 
        return {message: "cant find books in this years"};
    }
    return {message: `books from year ${from} to ${to}` , booksData};
}


const getSpecificGenre = async (data)=>{
    let { genres } = data;
    if (!data) { 
        return {message: "please insert title"};
    }
    let booksData = await bookModel.find({genres}).toArray();
    if (booksData.length == 0) { 
        return {message: "cant find books with this Genre"};
    }

    return {message: "books found successfully", booksData};
} 


const skipTwo = async ()=> { 
    let booksData = await bookModel.find().sort({year:-1}).skip(2).limit(3).toArray();
    if (booksData.length == 0) { 
        return {message: "cant find books"};
    }
    return {message: "books found successfully", booksData};
}


const getYearIntegar = async ()=> { 
    let booksData = await bookModel.find().toArray();
    if (booksData.length == 0) { 
        return {message: "books not found"};
    }
    let filtredBooks = booksData.filter(book => typeof book.year === 'number');
    if (filtredBooks.length == 0) { 
        return {message: "theres no type number year books"};
    }

    return {message: "year integar books ", booksData};
}


const excludeGenres = async ()=> { 
    let booksData = await bookModel.find({genres:{$nin:["Horror","Science Fiction"]}}).toArray();
    if (booksData.length == 0) { 
        return {message: "cant find books"};
    }
    return {message:"filtred books", booksData};
}


const deletePrevYears = async (data)=> {
    let { year } = data;
    year = Number(year);
    if (typeof year != 'number') { 
        return {message: "year must be a number"};
    }
    let deletedData = await bookModel.deleteMany({ year: { $lte: year  } });
    if (deletedData.deletedCount == 0) { 
        return {message: "no books available for this scoope years"};
    }
    return {message: "data deleted successfully", deletedData};
}



const aggregateOne = async ()=>{
    let booksData = await bookModel.aggregate([
        {
            $match:{
                year:{ $gt: 2000}
            }
        },
        {
            $sort: { 
                year:-1
            }
        }
    ]).toArray();
    
    if (booksData.length == 0) { 
        return {message: "books not found"};
    }

    return {message: "aggregated data", booksData};
}

const aggregateTwo = async ()=>{
    let booksData = await bookModel.aggregate([
        {
            $project:{
                _id:0,
                genres:0
            }
        },
        {
            $match:{
                year:{ $gt: 2000}
            }
        }
    ]).toArray();

    if (booksData.length == 0) { 
        return {message: "books not found"};
    }

    return {message: "aggregated data", booksData};
}

const aggregateThree = async ()=>{

    let booksData = await bookModel.aggregate([
        {
            $project:{ 
                title:1,
                genres:1,
                _id:0
            }
            
        }
        ,
        {
            $unwind:"$genres"
        }
    ]).toArray();

    if (booksData.length == 0) { 
        return {message: "books not found"};
    }

    return {message: "aggregated data", booksData};
}




export { makeIndex , addOneBook , addManyBooks , updateFutureBook , getBraveTitle , getBooksFromToYear , getSpecificGenre , skipTwo , getYearIntegar , excludeGenres , deletePrevYears , aggregateOne , aggregateTwo , aggregateThree };