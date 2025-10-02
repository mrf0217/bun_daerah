// src/models/apiLogModel.js
export default (sequelize, DataTypes) => {
  const ApiLog = sequelize.define('ApiLog', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    username: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    waktu: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    endpoint: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    payload: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'log_api_200509',
    timestamps: false
  });

  return ApiLog;
};
