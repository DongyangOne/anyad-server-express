const { Op } = require("sequelize")
const models = require("../../models")

exports.getAccessList = async (req, res) => {
  const { id } = req.body.user
  try {
    const data = await models.Access.findAll({ where: { user_id: id } })
    res.json({ result: true, data: data })
  } catch (err) {
    console.log(err)
  }
}

exports.getAccess = async (req, res) => {
  const { id } = req.params
  try {
    const data = await models.Access.findAll({ where: { id: id } })
    res.json({ result: true, data: data })
  } catch (err) {
    console.log(err)
  }
}

exports.buyAccess = async (req, res) => {
  const { id: mId } = req.params
  // const { id: uId } = req.body.user
  // console.log(mId, uId)
  try {
    // const module = await models.Module.findOne({ where: { id: mId } })
    const access = await models.Access.findAll({
      where: {
        module_id: mId,
        user_id: {
          [Op.ne]: 2,
        },
      },
    })
    console.log(access)
    await models.Access.update({ user_id: 1 }, { where: { id: access[0].id } })
    res.json({ result: true })
  } catch (err) {
    console.log(err)
  }
}

// 거래 부분
// 게시글에서 구매 Btn Click
// access.user_id === module.user_id가 아닌 access return
