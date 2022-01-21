import { Sequelize } from 'sequelize';
import sequelize from '../database.js';

class cargo extends Sequelize.Model {
  /**
   * Helper method for defining associations.
   * This method is not a part of Sequelize lifecycle.
   * The `models/index` file will call this method automatically.
   */
  static associate(models) {
    // define association here
    cargo.hasMany(models.directivo, {
      foreignKey: "id_cargo",
    })
  }
};
cargo.init({
  cargo_p: Sequelize.DataTypes.STRING
}, {
  sequelize,
  modelName: 'cargo',
  tableName: 'cargos',
  timestamps: false,
});

export default cargo;