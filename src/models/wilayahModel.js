// src/models/wilayahModel.js
export default  (sequelize, DataTypes) => {
  const Provinsi = sequelize.define('Provinsi', {
    wilayah: { type: DataTypes.INTEGER, primaryKey: true },  // column name in DB
    nama_provinsi: { type: DataTypes.STRING, allowNull: false }
  }, {
    tableName: 'provinsi',
    timestamps: false
  });

  const Kabupaten = sequelize.define('Kabupaten', {
    wilayah: { type: DataTypes.INTEGER, primaryKey: true },  // column name in DB
    nama_kabupaten: { type: DataTypes.STRING, allowNull: false },
    provinsi_wilayah: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: 'kabupaten',
    timestamps: false
  });

  // Relationships
  Provinsi.hasMany(Kabupaten, { foreignKey: 'provinsi_wilayah' });
  Kabupaten.belongsTo(Provinsi, { foreignKey: 'provinsi_wilayah' });

  return { Provinsi, Kabupaten };
};
