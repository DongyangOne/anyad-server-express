const models = require("../../models"),
  { Op } = require("sequelize")

exports.getBoardList = async (req, res) => {
  try {
    const data = await models.Board.findAll()
    data ? res.json({ result: true, data: data }) : res.json({ result: false })
  } catch (err) {
    console.log(err)
  }
}

exports.getBoard = async (req, res) => {
  console.log(1)
  const { id } = req.params
  try {
    const data = await models.Board.findOne({ where: { id: id } })
    data ? res.json({ result: true, data: data }) : res.json({ result: false })
  } catch (err) {
    console.log(err)
  }
}

exports.searchBoard = async (req, res) => {
  const { keyword } = req.query
  console.log(keyword)
  try {
    const data = await models.Board.findAll({
      where: {
        title: {
          [Op.substring]: keyword,
        },
      },
    })
    data ? res.json({ result: true, data: data }) : res.json({ result: false })
  } catch (err) {
    console.log(err)
  }
}

exports.newBoard = async (req, res) => {
  const { id } = req.body.user,
    { title, text, price } = req.body,
    { filename } = req.file,
    { id: mId } = req.params
  try {
    await models.Board.create({
      title: title,
      content: text,
      price: price,
      user_id: id,
      module_id: mId,
      image: filename,
    })
    res.json({ result: true })
  } catch (err) {
    console.log(err)
  }
}
