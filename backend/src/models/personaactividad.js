import { Sequelize } from 'sequelize';
import sequelize from '../database.js';

class personaactividad extends Sequelize.Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    personaactividad.belongsTo(models.persona, {
      foreignKey: "rut_creador",
    })
    personaactividad.belongsTo(models.persona, {
      foreignKey: "rut_citado",
    })
    personaactividad.belongsTo(models.actividad, {
      foreignKey: "id_actividad",
    })
  }
};
personaactividad.init({
  rut_creador: Sequelize.DataTypes.INTEGER,
  rut_citado: Sequelize.DataTypes.INTEGER,
  id_actividad: Sequelize.DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'personaactividad',
  tableName: 'personaactividades',
  timestamps: false,
});
export default personaactividad;