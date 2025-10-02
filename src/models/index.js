// src/models/index.js
import 'dotenv/config';
import { Sequelize, DataTypes } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_NAME || 'wilayah',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || '',
  {
    host: process.env.DB_HOST || 'localhost',
    dialect: process.env.DB_DIALECT || 'mysql',
    logging: false
  }
);

import userModel from './userModels.js';
import provinsiModel from './provinsiModel.js';
import kabupatenModel from './kabupatenModel.js';
import apiLogModel from './apiLogModel.js';
import commentModel from './commentModel.js';

const User = userModel(sequelize, DataTypes);
const Provinsi = provinsiModel(sequelize, DataTypes);
const Kabupaten = kabupatenModel(sequelize, DataTypes);
const ApiLog = apiLogModel(sequelize, DataTypes);
const Comment = commentModel(sequelize, DataTypes);

// Associations
Kabupaten.belongsTo(Provinsi, { foreignKey: 'provinsi_wilayah', targetKey: 'wilayah' });
Provinsi.hasMany(Kabupaten, { foreignKey: 'provinsi_wilayah', sourceKey: 'wilayah' });

export { sequelize, User, Provinsi, Kabupaten, ApiLog, Comment };