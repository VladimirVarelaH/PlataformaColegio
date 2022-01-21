import { Sequelize } from 'sequelize';
import sequelize from '../database.js';

class alumno extends Sequelize.Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    alumno.belongsTo(models.persona, {
      foreignKey: "rut_alumno",
    })
    alumno.belongsTo(models.curso, {
      foreignKey: "id_curso",
    })
  }
};


alumno.init({
  rut_alumno: Sequelize.DataTypes.INTEGER,
  id_curso: Sequelize.DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'alumno',
  tableName: 'alumnos',
  timestamps: false,
});

export default alumno;