'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('origendestinos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      rut_emisor: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "personas",
          key: "rut",
          as: "rut_emisor",
        }
      },
      rut_receptor: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "personas",
          key: "rut",
          as: "rut_receptor",
        }
      },
      id_mensaje: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: "mensajes",
          key: "id",
          as: "id_mensaje",
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('origendestinos');
  }
};