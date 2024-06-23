const { Model, DataTypes } = require("sequelize");

const { sequelize } = require("../utils/db");

class Login extends Model {}

Model.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    token: {
      type: DataTypes.STRING(255),
    },
    userId: {
      type: DataTypes.INTEGER,
      references: { model: "users", key: "id" },
    },
  },
  {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: "logins",
  }
);

module.exports = Login;
