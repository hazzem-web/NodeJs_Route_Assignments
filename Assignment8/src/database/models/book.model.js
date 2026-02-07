import { db } from '../connection.js';

await db.createCollection('books',{
    validator:{
        title: { $type: "string" , $ne:""}
    }
})


export const bookModel = db.collection('books');

