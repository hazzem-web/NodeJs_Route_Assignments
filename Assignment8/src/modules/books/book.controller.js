import { Router } from "express";
import { addManyBooks, addOneBook, aggregateOne, aggregateThree, aggregateTwo, deletePrevYears, excludeGenres, getBooksFromToYear, getBraveTitle , getSpecificGenre, getYearIntegar, makeIndex, skipTwo, updateFutureBook } from "./book.service.js";

const router = Router();

router.post('/index', async(req,res)=>{
    let index = await makeIndex();
    res.json(index);
})



router.post('/add-one-book', async(req,res)=>{
    let bookData = await addOneBook(req.body);
    res.json(bookData);
})


router.post('/add-many-books', async(req,res)=>{
    let booksData = await addManyBooks(req.body);
    res.json(booksData);
})


router.patch('/update-future-book', async(req,res)=> { 
    let updatedData = await updateFutureBook();
    res.json(updatedData);
})


router.get('/get-brave-book', async(req,res)=> { 
    let bookData = await getBraveTitle(req.query);
    res.json(bookData);
})


router.get('/get-books-year', async(req,res)=>{
    let booksData = await getBooksFromToYear(req.query);
    res.json(booksData);
})


router.get('/get-genres', async(req,res)=> { 
    let booksData = await getSpecificGenre(req.query);
    res.json(booksData);
})

router.get('/skip-limit', async(req,res)=> { 
    let booksData = await skipTwo();
    res.json(booksData); 
})


router.get('/year-integar', async(req,res)=> { 
    let booksData = await getYearIntegar();
    res.json(booksData);
})


router.get('/exclude-genres', async(req,res)=> { 
    let booksData = await excludeGenres();
    res.json(booksData);
})


router.delete('/delete-prev-years', async(req,res)=> {
    let deletedData = await deletePrevYears(req.query);
    res.json(deletedData);
})


router.get('/aggregate1', async(req,res)=>{
    let aggregatedData = await aggregateOne();
    res.json(aggregatedData);
})


router.get('/aggregate2', async(req,res)=>{
    let aggregatedData = await aggregateTwo();
    res.json(aggregatedData);
})


router.get('/aggregate3', async(req,res)=>{
    let aggregatedData = await aggregateThree();
    res.json(aggregatedData);
})




export default router;