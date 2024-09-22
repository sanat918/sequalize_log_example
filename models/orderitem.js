module.exports = function(sequelize, Sequelize) {
  const orderitem = sequelize.define(
    'orderitem',
    {
      // Model attributes are defined here
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      orderId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      productId: {
        type: Sequelize.INTEGER,
        allowNull: false, // Changed require to allowNull for clarity
      },
      quantity: {
        type: Sequelize.INTEGER,
        allowNull: false, // Changed require to allowNull for clarity
      },
      price: {
        type: Sequelize.DECIMAL(10, 2), // Use DECIMAL for price for precision
        allowNull: false, // Changed require to allowNull for clarity
      }
    },
    {
      timestamps: true, // Adds createdAt and updatedAt fields
      hooks: {
        beforeCreate: (orderitem) => {
          // If you had fields that needed to be lowercased, you would do it here
        },
        beforeSave: (orderitem) => {
          // If you had fields that needed to be lowercased, you would do it here
        }
      }
    }
  );

  // Uncomment and use this for associations if needed
  // orderitem.associate = function(models) {
  //   orderitem.belongsTo(models.order, {
  //     as: "orderitemorder",
  //     foreignKey: "orderId",
  //   });
  //   orderitem.belongsTo(models.product, {
  //     as: "orderitemProduct",
  //     foreignKey: "productId",
  //   });
  // }

  return orderitem;
}
