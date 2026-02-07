import { MongoClient} from 'mongodb';
import { databaseName, databaseUri } from '../../config/env.service.js';


const client = new MongoClient(databaseUri);

export const db = client.db(databaseName);

export const databaseConnection = async ()=> { 
    await client.connect()
    .then(()=>{
        console.log('database connected successfully');
    }).catch((err)=>{
        console.error('cant connect to database ', err);
    });
}   


