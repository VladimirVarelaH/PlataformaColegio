import { Sequelize } from 'sequelize';

// Inicializar Sequelize para conectarse a la BD
const sequelize = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  port: "5432",
  username: "postgres",
  password: "postgres",
  database: "webschool",
});

// Bloquear el programa hasta establecer la conexión con la DB
(async () => await sequelize.authenticate())();

export default sequelize;