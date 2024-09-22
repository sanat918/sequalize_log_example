const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../connectionToDB');
const user = require('./user');

module.exports = function(sequelize, Sequelize) {
  const order = sequelize.define(
    'order',
    {
      // Model attributes are defined here
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      status: {
        type: DataTypes.ENUM('Pending', 'Shipped', 'Delivered', 'Cancelled'), // Define possible statuses
        allowNull: false,
        defaultValue: 'Pending'
      },
      total: {
        type: DataTypes.DECIMAL(10, 2), // DECIMAL type with up to 10 digits, 2 of which are after the decimal point
        allowNull: false,
      },
      shippingAddress: {
        type: DataTypes.TEXT, // TEXT type for potentially long addresses
        allowNull: false,
      },
      orderDate: {
        type: DataTypes.DATE, // Use DATE or DATETIME based on your SQL dialect
        allowNull: false,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
      timestamps: true, // Adds createdAt and updatedAt fields
      hooks: {
        beforeCreate: (order) => {
          order.shippingAddress = order.shippingAddress.toLowerCase(); // Convert shippingAddress to lowercase before creating
        },
        beforeSave: (order) => {
          order.shippingAddress = order.shippingAddress.toLowerCase(); // Convert shippingAddress to lowercase before saving
        }
      }
    }
  );

  // Uncomment and use this for associations if needed
  // order.associate = function(models) {
  //   order.belongsTo(models.user, {
  //     as: 'userOrder',
  //     foreignKey: 'userId',
  //   });
  // }

  return order; 
}
