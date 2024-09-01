
module.exports=function(sequelize,Sequelize){
const category = sequelize.define(
  'category',
  {
    // Model attributes are defined here
   id:{
     type:Sequelize.INTEGER,
     autoIncrement:true,
     primaryKey:true
   },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
    }

  },{
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);
return category;
}
