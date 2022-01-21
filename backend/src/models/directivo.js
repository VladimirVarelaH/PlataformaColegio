import { Sequelize } from 'sequelize';
import sequelize from '../database.js';

class directivo extends Sequelize.Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    directivo.belongsTo(models.persona, {
      foreignKey: "rut_directivo",
    })
    directivo.belongsTo(models.cargo, {
      foreignKey: "id_cargo",
    })
  }
};


directivo.init({
  rut_directivo: Sequelize.DataTypes.INTEGER,
  id_cargo: Sequelize.DataTypes.INTEGER
}, {
  sequelize,
  modelName: 'directivo',
  tablename: 'directivos',
  timestamps: false,
});

export default directivo;
