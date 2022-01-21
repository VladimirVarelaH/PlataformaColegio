import { Sequelize } from 'sequelize';
import sequelize from '../database.js';

class calificacion extends Sequelize.Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    calificacion.belongsTo(models.persona, {
      foreignKey: "rut_calificado",
    })
    calificacion.belongsTo(models.evaluacion, {
      foreignKey: "id_evaluacion",
    })
  }
};
calificacion.init({
  id_evaluacion: Sequelize.DataTypes.INTEGER,
  rut_alumno: Sequelize.DataTypes.INTEGER,
  nota: Sequelize.DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'calificacion',
  tableName: 'calificaciones',
  timestamps: false,
});
export default calificacion;