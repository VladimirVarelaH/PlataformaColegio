import { Sequelize } from 'sequelize';
import sequelize from '../database.js';


class mensaje extends Sequelize.Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    mensaje.hasMany(models.origendestino, {
      foreignKey: "id_mensaje",
    })
  }
};


mensaje.init({
  asunto: Sequelize.DataTypes.STRING,
  cuerpo: Sequelize.DataTypes.STRING
}, {
  sequelize,
  modelName: 'mensaje',
  tableName: 'mensajes',
  timestamps: false,
});

export default mensaje;