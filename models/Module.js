module.exports = (sequelize, DataTypes) => {
  const Module = sequelize.define(
    'Module',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: 'PK',
      },
      name: {
        type: DataTypes.STRING(255),
        comment: '모듈 이름',
      },
    },
    {
      charset: 'utf8', // 한국어 설정
      collate: 'utf8_general_ci', // 한국어 설정
      tableName: 'tbl_module', // 테이블 이름
      timestamps: true, // createAt & updateAt 활성화
      paranoid: false, // timestamps 가 활성화 되어야 사용 가능 > deleteAt 옵션 on
    },
  )
  Module.associate = (models) => {
    Module.belongsTo(models.User, {
      foreignKey: 'user_id',
      sourceKey: 'id',
    })
    Module.hasMany(models.Access, { foreignKey: 'module_id', sourceKey: 'id' })
    Module.hasMany(models.Board, { foreignKey: 'module_id', sourceKey: 'id' })
  }
  return Module
}
