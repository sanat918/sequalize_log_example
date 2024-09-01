// const { Sequelize, DataTypes } = require('sequelize');
// const {sequelize}=require('../connectionToDB')
const User=require('./user')

module.exports=function(sequelize,Sequelize){
const order = sequelize.define(
    'order',
    {
      // Model attributes are defined here
     id:{
       type:Sequelize.INTEGER,
       autoIncrement:true,
       primaryKey:true
     },
      
      userId:{
          type:Sequelize.STRING,
          allowNull: false,
        
      },
      status:{
        type: Sequelize.ENUM('Pending', 'Shipped', 'Delivered', 'Cancelled'), // Define possible statuses
        allowNull: false,
        defaultValue: 'Pending'
      },
      total: {
        type: Sequelize.DECIMAL(10, 2), // DECIMAL type with up to 10 digits, 2 of which are after the decimal point
        allowNull: false,
      },
      shippingAddress: {
        type: Sequelize.TEXT, // TEXT type for potentially long addresses
        allowNull: false,
      },
      orderDate: {
        type: Sequelize.DATE, // Use DATE or DATETIME based on your SQL dialect
        allowNull: false,
      },
    },
    {
        timestamps: true, // Adds createdAt and updatedAt fields
      }
  );

  


 return order; 
}
  
