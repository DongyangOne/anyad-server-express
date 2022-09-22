module.exports = (sequelize, DataTypes) => {
  const Video = sequelize.define(
    'Video',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: 'PK',
      },
      path: {
        type: DataTypes.STRING(255),
        comment: '영상 경로',
      },
    },
    {
      charset: 'utf8', // 한국어 설정
      collate: 'utf8_general_ci', // 한국어 설정
      tableName: 'tbl_video', // 테이블 이름
      timestamps: true, // createAt & updateAt 활성화
      paranoid: false, // timestamps 가 활성화 되어야 사용 가능 > deleteAt 옵션 on
    },
  )
  Video.associate = (models) => {
    Video.belongsTo(models.User, {
      foreignKey: 'user_id',
      sourceKey: 'id',
    })
    Video.belongsTo(models.Access, {
      foreignKey: 'access_id',
      sourceKey: 'id',
    })
  }
  return Video
}
