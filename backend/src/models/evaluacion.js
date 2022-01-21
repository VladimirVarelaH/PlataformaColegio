import { Sequelize } from 'sequelize';
import sequelize from '../database.js';

class evaluacion extends Sequelize.Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    evaluacion.belongsTo(models.asignatura, {
      foreignKey: "id_asignatura",
    })
    evaluacion.hasMany(models.calificacion, {
      foreignKey: "id_evaluacion",
    })
  }
};
evaluacion.init({
  id_asignatura: Sequelize.DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'evaluacion',
  tableName: 'evaluaciones',
  timestamps: false,
});
export default evaluacion;