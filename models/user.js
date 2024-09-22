const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { saltRound, accessTokenSecret, accessTokenExpiry, refreshTokenSecret, refreshTokenExpiry } = require('../config/utils');

module.exports = function (sequelize, Sequelize) {
  const user = sequelize.define(
    'user',
    {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true // Ensure email is unique
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      role: {
        type: Sequelize.STRING,
        allowNull: true
      },
      refreshToken: {
        type: Sequelize.STRING
      }
    },
    {
      paranoid: true, // Adds deletedAt field
      indexes: [
        {
          name: "idx_User_id",
          fields: ["id"]
        }
      ],
      hooks: {
        beforeSave: async (user) => {
          if (user.changed('password')) {
            // Hash the password only if it has been changed
            const saltRounds = await bcrypt.genSalt(saltRound);
            user.password = await bcrypt.hash(user.password, saltRounds);
          }
          // Normalize fields to lowercase
          user.email = user.email.toLowerCase();
          user.firstName = user.firstName.toLowerCase();
          user.lastName = user.lastName.toLowerCase();
        }
      }
    }
  );

  // user.associate = function (models) {
  //   user.hasMany(models.order, {
  //     as: "userOrder",
  //     foreignKey: "userId",
  //   });
  // };

  // Add instance methods to the model
  user.prototype.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  user.prototype.generateAccessToken = function () {
    return jwt.sign(
      {
        id: this.id,
        email: this.email,
        role: this.role,
      },
      accessTokenSecret,
      {
        expiresIn: accessTokenExpiry || '1h', // Default to 1 hour if not provided
      }
    );
  };

  user.prototype.generateRefreshToken = function () {
    return jwt.sign(
      {
        id: this.id,
      },
      refreshTokenSecret,
      {
        expiresIn: refreshTokenExpiry || '7d', // Default to 7 days if not provided
      }
    );
  };

  return user;
}
