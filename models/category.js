module.exports = function(sequelize, Sequelize) {
  const category = sequelize.define(
    'category',
    {
      // Model attributes are defined here
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    },
    {
      timestamps: true, // Adds createdAt and updatedAt fields
      hooks: {
        beforeCreate: (category) => {
          category.name = category.name.toLowerCase(); // Convert name to lowercase before creating
        },
        beforeSave: (category) => {
          category.name = category.name.toLowerCase(); // Convert name to lowercase before saving
        }
      }
    }
  );

  return category;
}
