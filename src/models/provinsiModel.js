export default (sequelize, DataTypes) => {
  const Provinsi = sequelize.define('Provinsi', {
    wilayah: { type: DataTypes.INTEGER, primaryKey: true },
    nama_provinsi: { type: DataTypes.STRING, allowNull: false }
  }, {
    tableName: 'provinsi',
    timestamps: false
  });
  return Provinsi;
};
