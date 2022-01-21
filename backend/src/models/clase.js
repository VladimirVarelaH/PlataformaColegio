import { Sequelize } from 'sequelize';
import sequelize from '../database.js';

class clase extends Sequelize.Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    clase.belongsTo(models.asignatura, {
      foreignKey: "id_asignatura",
    })
  }
};
clase.init({
  id_asignatura: Sequelize.DataTypes.INTEGER,
  fecha: Sequelize.DataTypes.DATEONLY,
  hora_inicio: Sequelize.DataTypes.STRING,
  hora_termino: Sequelize.DataTypes.STRING
}, {
  sequelize,
  modelName: 'clase',
  tableName: 'clases',
  timestamps: false,
});
export default clase;
