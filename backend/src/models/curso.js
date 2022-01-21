import { Sequelize } from 'sequelize';
import sequelize from '../database.js';

class curso extends Sequelize.Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    curso.hasMany(models.alumno, {
      foreignKey: "id_curso",
    })
    curso.hasMany(models.profesorjefe, {
      foreignKey: "id_curso",
    })
    curso.hasMany(models.asignatura, {
      foreignKey: "id_curso",
    })
  }
};
curso.init({
  nombre: Sequelize.DataTypes.STRING
}, {
  sequelize,
  modelName: 'curso',
  tableName: 'cursos',
  timestamps: false,
});

export default curso;