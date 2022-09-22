module.exports = (sequelize, DataTypes) => {
  const Access = sequelize.define(
    'Access',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: 'PK',
      },
    },
    {
      charset: 'utf8', // 한국어 설정
      collate: 'utf8_general_ci', // 한국어 설정
      tableName: 'tbl_access', // 테이블 이름
      timestamps: true, // createAt & updateAt 활성화
      paranoid: false, // timestamps 가 활성화 되어야 사용 가능 > deleteAt 옵션 on
    },
  )
  Access.associate = (models) => {
    Access.belongsTo(models.User, {
      foreignKey: 'user_id',
      sourceKey: 'id',
    })
    Access.belongsTo(models.Module, {
      foreignKey: 'module_id',
      sourceKey: 'id',
    })
    Access.hasMany(models.Video, { foreignKey: 'access_id', sourceKey: 'id' })
  }
  return Access
}
