// src/models/userModel.js
export default (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    username: { type: DataTypes.STRING, unique: true, allowNull: false },
    password: { type: DataTypes.STRING, allowNull: false },
    tokenVersion: { type: DataTypes.INTEGER, defaultValue: 0 }
  }, {
    timestamps: false,
    tableName: 'user'
  });

  return user;
};