import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('wilayah', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
  logging: false
});

export default sequelize;