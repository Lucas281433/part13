const { DataTypes } = require("sequelize");

module.exports = {
  up: async ({ context: queryInteerface }) => {
    await queryInteerface.createTable("readinglists", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "users", key: "id" },
      },
      blog_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: { model: "blogs", key: "id" },
      },
      read: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    });
  },

  down: async ({ context: queryInteerface }) => {
    await queryInteerface.dropTable("readinglists");
  },
};
