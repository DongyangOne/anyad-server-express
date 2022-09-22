module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: 'PK',
      },
      email: {
        type: DataTypes.STRING(255),
        comment: '이메일',
        unique: true,
      },
      pw: {
        type: DataTypes.STRING(255),
        comment: '비밀번호',
      },
      name: {
        type: DataTypes.STRING(255),
        comment: '이름',
      },
    },
    {
      charset: 'utf8', // 한국어 설정
      collate: 'utf8_general_ci', // 한국어 설정
      tableName: 'tbl_user', // 테이블 이름
      timestamps: true, // createAt & updateAt 활성화
      paranoid: false, // timestamps 가 활성화 되어야 사용 가능 > deleteAt 옵션 on
    },
  )
  User.associate = (models) => {
    User.hasMany(models.Module, { foreignKey: 'user_id', sourceKey: 'id' })
    User.hasMany(models.Access, { foreignKey: 'user_id', sourceKey: 'id' })
    User.hasMany(models.Board, { foreignKey: 'user_id', sourceKey: 'id' })
  }

  return User
}
