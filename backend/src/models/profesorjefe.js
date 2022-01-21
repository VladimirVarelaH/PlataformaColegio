import { Sequelize } from 'sequelize';
import sequelize from '../database.js';

class profesorjefe extends Sequelize.Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    profesorjefe.belongsTo(models.persona, {
      foreignKey: "rut_profesor_jefe",
    })
    profesorjefe.belongsTo(models.curso, {
      foreignKey: "id_curso",
    })
  }
};


profesorjefe.init({
  rut_profesor_jefe: Sequelize.DataTypes.INTEGER,
  id_curso: Sequelize.DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'profesorjefe',
  tableName: 'profesoresjefes',
  timestamps: false,
});

export default profesorjefe;