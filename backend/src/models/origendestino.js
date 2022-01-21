import { Sequelize } from 'sequelize';
import sequelize from '../database.js';

class origendestino extends Sequelize.Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    origendestino.belongsTo(models.persona, {
      foreignKey: "rut_emisor",
    })
    origendestino.belongsTo(models.persona, {
      foreignKey: "rut_receptor",
    })
    origendestino.belongsTo(models.mensaje, {
      foreignKey: "id_mensaje",
    })
  }
};


origendestino.init({
  rut_emisor: Sequelize.DataTypes.INTEGER,
  rut_receptor: Sequelize.DataTypes.INTEGER,
  id_mensaje: Sequelize.DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'origendestino',
  tableName: 'origendestinos',
  timestamps: true,
  createdAt: true,
  // Este campo no esta en la bd
  updatedAt: false,
});

export default origendestino;