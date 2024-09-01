

module.exports=function(sequelize,Sequelize){
const orderitem = sequelize.define(
  'orderitem',
  {
    // Model attributes are defined here
   id:{
     type:Sequelize.INTEGER,
     autoIncrement:true,
     primaryKey:true
   },
    orderId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    productId:{
       type:Sequelize.INTEGER,
        require:true,
    },
    quantity:{
        type:Sequelize.INTEGER,
        require:true
    },
    price:{
        type:Sequelize.INTEGER,
        require:true
    }
  },{
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

orderitem.associate = function (models) {
  orderitem.belongsTo(models.order, {

    as: "orderitemorder",
    
    foreignKey: "orderId",

  });

  orderitem.belongsTo(models.product, {

    as: "orderitemProduct",
    
    foreignKey: "productId",

  });

}


return orderitem;
}

