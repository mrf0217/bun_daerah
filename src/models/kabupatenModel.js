export default (sequelize, DataTypes) => {
  const Kabupaten = sequelize.define('Kabupaten', {
    wilayah: { type: DataTypes.INTEGER, primaryKey: true },
    nama_kabupaten: { type: DataTypes.STRING, allowNull: false },
    provinsi_wilayah: { type: DataTypes.INTEGER, allowNull: false }
  }, {
    tableName: 'kabupaten',
    timestamps: false
  });
  return Kabupaten;
};
