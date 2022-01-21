'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('calificaciones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      id_evaluacion: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "evaluaciones",
          key: "id",
          as: "id_evaluacion",
        }
      },
      rut_calificado: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "personas",
          key: "rut",
          as: "rut_calificado",
        }
      },
      nota: {
        allowNull: false,
        type: Sequelize.INTEGER
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('calificaciones');
  }
};