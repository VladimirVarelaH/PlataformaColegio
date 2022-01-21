import { Sequelize } from 'sequelize';
import sequelize from '../database.js';

class persona extends Sequelize.Model {
  /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
   static associate(models) {
    // define association here
    persona.hasMany(models.origendestino, {
      foreignKey: "rut_emisor",
    })
    persona.hasMany(models.origendestino, {
      foreignKey: "rut_receptor",
    })
    persona.hasMany(models.personaactividad, {
      foreignKey: "rut_creador",
    })
    persona.hasMany(models.personaactividad, {
      foreignKey: "rut_citado",
    })
    persona.hasMany(models.directivo, {
      foreignKey: "rut_directivo",
    })
    persona.hasMany(models.alumno, {
      foreignKey: "rut_alumno",
    })
    persona.hasMany(models.profesorjefe, {
      foreignKey: "rut_profesor_jefe",
    })
    persona.hasMany(models.profesor, {
      foreignKey: "rut_profesor",
    })
    persona.hasMany(models.calificacion, {
      foreignKey: "rut_calificado",
    })
    persona.hasMany(models.apoderado, {
      foreignKey: "rut_apoderado",
    })
    persona.hasMany(models.apoderado, {
      foreignKey: "rut_alumno",
    })
  }
};


persona.init({
  rut: {
    type: Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: false,  
  },
  nombres: Sequelize.DataTypes.STRING,
  ap_paterno: Sequelize.DataTypes.STRING,
  ap_materno: Sequelize.DataTypes.STRING,
  email: Sequelize.DataTypes.STRING,
  contrasenia: Sequelize.DataTypes.STRING
}, {
  sequelize,
  modelName: 'persona',
  tableName: 'personas',
  timestamps: false,
});

export default persona;