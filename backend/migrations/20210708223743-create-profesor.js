'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('profesores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rut_profesor: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "personas",
          key: "rut",
          as: "rut_profesor"
        }
      },
      id_asignatura: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "asignaturas",
          key: "id",
          as: "id_asignatura",
        }
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('profesores');
  }
};