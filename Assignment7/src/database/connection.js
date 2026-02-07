import { Sequelize } from 'sequelize';
import { databaseDialect, databaseHost, databaseName, databasePassword, databaseUser } from '../../config/env.service';

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
        await sequelize.sync({alter:true , force: true});
    } catch (error) {
        console.error('unable to sync database: ',error);
    }
}