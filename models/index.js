// const fs = require('fs');
// const path = require('path');
// const { sequelize } = require('../connectionToDB');
// const  Sequelize  = require('sequelize');

// const db = {};
// const modelsPath = path.join(__dirname);



// // Import models
// fs.readdirSync(modelsPath)
//   .filter(file => file.indexOf('.') !== 0 && file !== 'index.js')
//   .forEach(file => {
//     const model = require(path.join(modelsPath, file));
//     db[model.name] = model;
//   });

// // Set up associations
// Object.keys(db).forEach(modelName => {
//   if (db[modelName].associate) {
//     db[modelName].associate(db);
//   }
// });

// db.sequelize=sequelize
// db.Sequelize=Sequelize

// // Export all models
// module.exports = db


"use strict";

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
const { sequelize } = require('../connectionToDB');

var db = {};


// Read all model files in the current directory
fs.readdirSync(__dirname).filter(file => {
  return (file.indexOf(".") !== 0) && (file !== "index.js");
}).forEach(file => {
        const modelDef = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
        const modelName = modelDef.name;
        db[modelName] = modelDef;

    });

 

Object.keys(db).forEach(function(modelName) {
    if ("associate" in db[modelName]) {
        db[modelName].associate(db);
    }
});

 

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
