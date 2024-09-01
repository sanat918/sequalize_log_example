const { Sequelize, DataTypes } = require('sequelize');
const {sequelize}=require('../connectionToDB')
const {saltRound}=require('../config/utils')
const rrder=require('./order')
const category =require('./category')


module.exports=function(sequelize,Sequelize){
const product = sequelize.define(
  'product',
  {
    // Model attributes are defined here
   id:{
     type:DataTypes.INTEGER,
     autoIncrement:true,
     primaryKey:true
   },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description:{
       type:DataTypes.STRING,
        require:true,
    },
    price:{
        type:DataTypes.DECIMAL(10, 2),
        require:true
    },
    stock:{
        type:DataTypes.INTEGER,
        require:true
    },
    categotyId:{
        type:DataTypes.INTEGER,
       allowNull:false
    }
  },{
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

product.associate = function (models) {
  
  product.belongsTo(models.order, {

    as: "productCategory",
    
    foreignKey: "categotyId",

  });

}

return product;
}

