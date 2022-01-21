'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('clases', {
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
      },
      dia: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      hora_inicio: {
        allowNull: false,
        type: Sequelize.STRING
      },
      hora_termino: {
        allowNull: false,
        type: Sequelize.STRING
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('clases');
  }
};