const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInterface }) => {
    await queryInterface.createTable("logins", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      token: {
        type: DataTypes.STRING(255),
      },
      user_id: {
        type: DataTypes.INTEGER,
        references: { model: 'users', key: 'id' }
      }
    });
  },

  down: async ({ context: queryInterface }) => {
    await queryInterface.dropTable("logins");
  },
};
