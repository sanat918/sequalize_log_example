const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { saltRound, accessTokenSecret, accessTokenExpiry, refreshTokenSecret, refreshTokenExpiry } = require('../config/utils');

module.exports = function (sequelize, Sequelize) {
  const User = sequelize.define(
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
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      role: {
        type: Sequelize.STRING,
        allowNull: false
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
        }
      }
    }
  );

  User.associate = function (models) {
    User.hasMany(models.order, {
      as: "userOrder",
      foreignKey: "userId",
    });
  };

  // Add instance methods to the model
  User.prototype.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

  User.prototype.generateAccessToken = function () {
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

  User.prototype.generateRefreshToken = function () {
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

  return User;
}
