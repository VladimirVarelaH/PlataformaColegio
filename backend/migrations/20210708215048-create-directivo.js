'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('directivos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rut_directivo: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "personas",
          key: "rut",
          as: "rut_directivo",
        }
      },
      id_cargo: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "cargos",
          key: "id",
          as: "id_cargo",
        }
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('directivos');
  }
};