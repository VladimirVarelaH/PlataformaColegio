import { Sequelize } from 'sequelize';
import sequelize from '../database.js';

class actividad extends Sequelize.Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    actividad.hasMany(models.personaactividad, {
      foreignKey: "id_actividad",
    })
  }
};
actividad.init({
  fecha: Sequelize.DataTypes.DATEONLY,
  descripcion: Sequelize.DataTypes.STRING
}, {
  sequelize,
  modelName: 'actividad',
  tableName: 'actividades',
  timestamps: false,
});

export default actividad;