import { Sequelize } from 'sequelize';
import sequelize from '../database.js';

class asignatura extends Sequelize.Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    asignatura.belongsTo(models.curso, {
      foreignKey: "id_curso",
    })
    asignatura.hasMany(models.profesor, {
      foreignKey: "rut_profesor",
    })
    asignatura.hasMany(models.evaluacion, {
      foreignKey: "id_asignatura",
    })
    asignatura.hasMany(models.curso, {
      foreignKey: "id_asignatura",
    })
  }
};
asignatura.init({
  id_curso: Sequelize.DataTypes.INTEGER,
  nombre: Sequelize.DataTypes.STRING
}, {
  sequelize,
  modelName: 'asignatura',
  tableName: 'asignaturas',
  timestamps: false,
});
export default asignatura;