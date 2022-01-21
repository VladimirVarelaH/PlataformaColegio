'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('evaluaciones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_asignatura: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "asignaturas",
          key: "id",
          as: "id_asignatura",
        }
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('evaluaciones');
  }
};