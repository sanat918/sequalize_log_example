const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../connectionToDB');
const category = require('./category'); // Ensure you have this import

module.exports = function(sequelize, Sequelize) {
  const product = sequelize.define(
    'product',
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false, // Corrected from require to allowNull
      },
      price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false, // Corrected from require to allowNull
      },
      stock: {
        type: DataTypes.INTEGER,
        allowNull: false, // Corrected from require to allowNull
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      stripeProductId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      stripePriceId: {
        type: DataTypes.STRING,
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
        beforeCreate: (product) => {
          product.name = product.name.toLowerCase(); // Convert name to lowercase
          product.description = product.description.toLowerCase(); // Convert description to lowercase
        },
        beforeSave: (product) => {
          product.name = product.name.toLowerCase(); // Ensure name is lowercase before saving
          product.description = product.description.toLowerCase(); // Ensure description is lowercase before saving
        }
      }
    }
  );

  product.associate = function(models) {
    product.belongsTo(models.category, {
      as: 'productCategory',
      foreignKey: 'categoryId',
    });
    product.belongsTo(models.user, {
      as: 'userProduct',
      foreignKey: 'userId',
    });
  };

  return product;
};
