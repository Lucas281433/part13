const { Model, DataTypes } = require("sequelize");
const { sequelize } = require('../utils/db') 

class Blog extends Model {}
Blog.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    author: {
      type: DataTypes.TEXT,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'You have to enter a url'
        }
      }
    },
    title: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'You have to enter a Title'
        }
      }
    },
    year: {
      type: DataTypes.INTEGER,
      validate: {
        isInt: {
          msg: 'The value must be an integer'
        },
        min: {
          args: [1991],
          msg: 'The year must be at least 1991'
        },
        max: {
          args: [new Date().getFullYear()],
          msg: 'The year must be at most the current year'
        }
      }
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: true,
    modelName: "blog",
  }
);

module.exports = Blog;
