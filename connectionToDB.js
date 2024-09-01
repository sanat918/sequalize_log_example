const {Sequelize} = require('sequelize');
let {databaseName,databaseUserName,databasePassword,hostName,databasePort,databaseDialect}=require('./config/utils')
// let {models}=require('../models/index')

let sequelize = new Sequelize(databaseName, databaseUserName, databasePassword, {
    host: hostName,
    dialect: databaseDialect ,
    port: databasePort,  // Default port for MySQL
    logging: false // Set to true if you want to log SQL queries
});

// let connectionToDb = async () => {
//     try {
        
//         await sequelize.authenticate();
//         console.log('Connection has been established successfully.');
//         //Models
            
//         const seq=models.sequelize
//          // Sync all models
//           seq.sync().then(function(){console.log("Nice! Database synchronization sucess")}).catch(function(error){
//             console.log("Error while database synchronization",error)
//           })
//         // console.log('Database & tables created or updated successfully.');

//     } catch (error) {
//         console.error('Unable to connect to the database:', error);
//     }
// };

module.exports = { sequelize };
