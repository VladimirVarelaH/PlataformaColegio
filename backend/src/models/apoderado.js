import { Sequelize } from 'sequelize';
import sequelize from '../database.js';

class apoderado extends Sequelize.Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    apoderado.belongsTo(models.persona, {
      foreignKey: "rut_alumno",
    })
    apoderado.belongsTo(models.persona, {
      foreignKey: "rut_apoderado",
    })
  }
};


apoderado.init({
  rut_apoderado: Sequelize.DataTypes.INTEGER,
  rut_alumno: Sequelize.DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'apoderado',
  tableName: 'apoderados',
  timestamps: false,
});

export default apoderado;
