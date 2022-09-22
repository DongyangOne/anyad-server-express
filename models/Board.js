module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define(
    "Board",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        comment: "PK",
      },
      title: {
        type: DataTypes.STRING(255),
        comment: "제목",
      },
      content: {
        type: DataTypes.TEXT,
        comment: "내용",
      },
      price: {
        type: DataTypes.INTEGER,
        comment: "가격",
      },
      image: {
        type: DataTypes.STRING(255),
        comment: "IMG PATH + NAME",
      },
    },
    {
      charset: "utf8", // 한국어 설정
      collate: "utf8_general_ci", // 한국어 설정
      tableName: "tbl_board", // 테이블 이름
      timestamps: true, // createAt & updateAt 활성화
      paranoid: false, // timestamps 가 활성화 되어야 사용 가능 > deleteAt 옵션 on
    }
  )
  Board.associate = (models) => {
    Board.belongsTo(models.User, {
      foreignKey: "user_id",
      sourceKey: "id",
    })
    Board.belongsTo(models.Module, {
      foreignKey: "module_id",
      sourceKey: "id",
    })
  }
  return Board
}
