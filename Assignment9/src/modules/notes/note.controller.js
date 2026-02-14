import { Router } from 'express';
import { aggregateNote, createNote, deleteNote , deleteUserNotes, getNote, getUserNotes, paginateNotes, replaceNote, updateAllTitles, updateNote } from './note.service.js';

const router = Router();

router.post('/add-note', async(req,res)=>{
    let noteData = await createNote(req.headers,req.body);
    res.json(noteData);
})


router.patch('/update-note', async(req,res)=>{
    let updatedNote = await updateNote(req.query,req.headers,req.body);
    res.json(updatedNote);
})


router.put('/replace-note', async(req,res)=>{
    let puttedNote = await replaceNote(req.query,req.headers,req.body);
    res.json(puttedNote);
})


router.patch('/update-all', async(req,res)=>{
    let updatedData = await updateAllTitles(req.headers,req.body);
    res.json(updatedData);

})


router.delete('/delete-note', async(req,res)=>{
    let deletedNote = await deleteNote(req.query,req.headers);
    res.json(deletedNote);
})

router.get('/paginate-sort', async(req,res)=>{
    let paginatedNotes = await paginateNotes(req.query,req.headers);
    res.json(paginatedNotes);
})


router.get('/get-note', async(req,res)=>{
    let noteData = await getNote(req.query,req.headers);
    res.json(noteData);
})


router.get('/user-notes', async(req,res)=>{
    let userNotes = await getUserNotes(req.headers);
    res.json(userNotes);
})


router.get('/aggregate', async(req,res)=>{
    let aggregatedData = await aggregateNote(req.query,req.headers);
    res.json(aggregatedData);
})


router.delete('/delete-user-notes', async(req,res)=>{
    let deletedNotes = await deleteUserNotes(req.headers);
    res.json(deletedNotes);
})


export default router;