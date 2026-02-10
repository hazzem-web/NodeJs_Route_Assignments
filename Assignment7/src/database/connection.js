import { Sequelize } from 'sequelize';
import { databaseDialect, databaseHost, databaseName, databasePassword, databaseUser } from '../../config/env.service.js';

export const sequelize = new Sequelize(databaseName , databaseUser , databasePassword,{
    host:databaseHost,
    dialect:databaseDialect
});


export const databaseConnection = async ()=> { 
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully');
    } catch (error) {
        console.error('unable to connect to database: ',error);       
    }
}


export const databaseSync = async ()=> {
    try {
        const { userModel } = await import('./models/user.model.js');
        const { postModel } = await import('./models/post.model.js');
        const { commentModel } = await import('./models/comment.model.js');
        const { relation } = await import('./models/relation.js');
        await sequelize.sync();
    } catch (error) {
        console.error('unable to sync database: ',error);
    }
}