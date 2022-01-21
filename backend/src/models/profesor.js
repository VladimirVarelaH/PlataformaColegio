import { Sequelize } from 'sequelize';
import sequelize from '../database.js';

class profesor extends Sequelize.Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    profesor.belongsTo(models.persona, {
      foreignKey: "rut_profesor",
    })
    profesor.belongsTo(models.asignatura, {
      foreignKey: "id_asignatura",
    })
  }
};

profesor.init({
  rut_profesor: Sequelize.DataTypes.INTEGER,
  id_asignatura: Sequelize.DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'profesor',
  tableName: 'profesores',
  timestamps: false,
});
export default profesor;