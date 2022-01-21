'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('profesoresjefes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rut_profesor_jefe: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "personas",
          key: "rut",
          as: "rut_profesor_jefe",
        }
      },
      id_curso: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "cursos",
          key: "id",
          as: "id_curso",
        }
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('profesoresjefes');
  }
};